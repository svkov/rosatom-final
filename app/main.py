import base64
import json
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, File, UploadFile, Depends
from db import SessionLocal, engine, Base
from load_data_overpass import find_nearest_objects_df
from worker import celery
from starlette.responses import FileResponse
import os
from predict import predict_pic
from sqlalchemy.orm.session import Session
from dotenv import load_dotenv, find_dotenv
from db_models import *

load_dotenv(find_dotenv())


app = FastAPI()
Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/db_test/")
async def generate_incident(session: Session = Depends(get_db)):
    from db_models import Coords
    coord = Coords(lat=50.5, lon=60.5)
    session.add(coord)
    session.commit()
    return session.query(Coords).filter_by(id=coord.id).first()


class Item(BaseModel):
    name: str


class Coords(BaseModel):
    lat: float
    lon: float


@app.post("/download/")
def download_data(coords: Coords):
    """
    Кидает в Celery таску по загрузке изображения со спутника с апи Nasa
    """
    task_name = "download_satellite"
    task = celery.send_task(task_name, args=[coords.lat, coords.lon])
    return dict(id=task.id)


@app.get("/check_download/{id}")
def check_download(id: str):
    """
    Проверка, загрузилась ли картинка из апишки
    """
    task = celery.AsyncResult(id)
    if task.status == 'SUCCESS':
        response = {
            'status': task.state,
            'result': task.result,
            'task_id': id
        }
    elif task.status == 'FAILURE':
        response = json.loads(task.backend.get(
            task.backend.get_key_for_task(task.id)).decode('utf-8'))
        del response['children']
        del response['traceback']
    else:
        response = {
            'status': task.state,
            'result': task.info,
            'task_id': id
        }
    return response


@app.get("/download_picture/{id}")
def download_picture(id: str):
    """
    Отдает снимок со спутника, который уже скачался. Если не скачался - кинет 500.
    """
    task = celery.AsyncResult(id)
    filename = task.result
    path = os.path.join('satellite_data', filename)
    return FileResponse(path,
                        media_type='application/octet-stream',
                        filename='image.jpg')


@app.get("/download_coord/")
def download_coord(coord: Coords):
    """
    Скачивает картинку по координатам, а не по id celery
    """
    filename = f'{coord.lat}-{coord.lon}.jpg'
    path = os.path.join('satellite_data', filename)
    if filename not in os.listdir('satellite_data'):
        raise HTTPException(status_code=404, detail="Data now found")
    return FileResponse(path,
                        media_type='application/octet-stream',
                        filename='image.jpg')


@app.get("/predict/{id}")
def predict(id: str):
    """
    Предсказывает моделью классификации есть ли разлив на снимке со спутника NASA
    """
    task = celery.AsyncResult(id)
    filename = task.result
    path = os.path.join('satellite_data', filename)
    res = predict_pic(path)
    return {'predict': res}


@app.post("/predict/")
def predict_coord(coord: Coords):
    """
    Тоже самое, но по координатам, а не по id
    """
    filename = f'{coord.lat}-{coord.lon}.jpg'
    path = os.path.join('satellite_data', filename)
    res = predict_pic(path)
    return {'predict': res}


@app.post("/nearest_objects/")
def get_nearest_objects(coord: Coords):
    """
    Отдает список ближайших важных объектов к заданным координатам и расстояние в км до них
    """
    df = find_nearest_objects_df(coord.lat, coord.lon)
    return df.to_dict('records')


@app.get("/all/")
def get_all():
    """
    Возвращает список всех инцидентов для отрисовки на фронте
    """
    from datetime import datetime
    with open("satellite_data/58.0-61.0.jpg", "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
    example_1 = {
        'id': '45-88',
        'date': datetime.now(),
        'lat': 50.56789,
        'lon': 60.87654,
        'region': 'ХМАО',
        'area': 800,  # Площадь в кв м
        'company': 'ООО "Лукойл"',
        'factory_address': 'ул. Пушкина, д.128',
        'oil_pipe': {
            'name': 'Трубопровод 54 -77',
            'lat': 50.5678,
            'lon': 60.876
        },
        'nature': {
            'Зверобойник брасчатый': 'Редкий',
            'Подкобыльник рябристый': 'Условно редкий'
        },
        'closest_obj': {
            'р. Ивдель': 17.635551,  # расстояние в км
            'оз. Мундыр': 22.294480
        },
        'photo': [encoded_string, encoded_string]
    }
    example_2 = {
        'id': '45-88',
        'date': datetime(2021, 5, 18),
        'lat': 55.98764,
        'lon': 62.24567,
        'region': 'ХМАО',
        'area': 900,  # Площадь в кв м
        'company': 'ПАО "Газпром нефть"',
        'factory_address': 'ул. Ленина, д.324',
        'oil_pipe': {
            'name': 'Трубопровод 28-99',
            'lat': 50.5678,
            'lon': 60.876
        },
        'nature': {
            'Зверобойник брасчатый': 'Редкий',
            'Подкобыльник рябристый': 'Условно редкий'
        },
        'closest_obj': {
            'р. Ивдель': 17.635551,  # расстояние в км
            'оз. Мундыр': 22.294480
        },
        'photo': [encoded_string, encoded_string]
    }
    return [example_1, example_2]
