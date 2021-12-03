import base64
from datetime import datetime
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


class CompanyItem(BaseModel):
    name: str
    address: str


class OilPipeItem(BaseModel):
    name: str
    lat: float
    lon: float


class AccidentItem(BaseModel):
    date: datetime
    area: float
    image_id: int
    oil_pipe_id: int
    company_id: int
    lat: float
    lon: float


@app.post("/create/company")
async def create_company(company: CompanyItem, session: Session = Depends(get_db)):
    comp = Company(name=company.name, address=company.address)
    session.add(comp)
    session.commit()
    return {'id': comp.id}


@app.post("/create/oil_pipe")
async def create_oil_pipe(oil_pipe_item: OilPipeItem, session: Session = Depends(get_db)):
    oil_pipe = OilPipe(name=oil_pipe_item.name,
                       lat=oil_pipe_item.lat, lon=oil_pipe_item.lon)
    session.add(oil_pipe)
    session.commit()
    return {'id': oil_pipe.id}


@app.post('/upload/image')
def clf_image(file: bytes = File(...), session: Session = Depends(get_db)):
    if 'data' not in os.listdir('./'):
        os.mkdir('data')
    path = 'data/image.jpg'
    with open(path, 'wb') as out_file:
        out_file.write(file)
    clf_tag = round(predict_pic(path))  # >=0.5 - нефтеразлив

    with open(path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
    img_db = Image(base64_img=encoded_string, clf_tag=clf_tag)
    session.add(img_db)
    session.commit()
    return {'id': img_db.id, 'predict': clf_tag}


@app.post('/create/accident/')
def create_accident(accident_item: AccidentItem, session: Session = Depends(get_db)):
    accident = Accident(date=accident_item.date,
                        area=accident_item.area,
                        image_id=accident_item.image_id,
                        oil_pipe_id=accident_item.oil_pipe_id,
                        company_id=accident_item.oil_pipe_id,
                        lat=accident_item.lat,
                        lon=accident_item.lon
                        )
    session.add(accident)
    session.commit()
    df = find_nearest_objects_df(accident_item.lat, accident_item.lon)
    for row in df.to_dict('records'):
        obj = ImportantObject(name=row['name'], distance=row['dist'], accident_id=accident.id)
        session.add(obj)
    session.commit()
    return {'id': accident.id, 'len_of_df': len(df), 'obj': obj.id}


@app.get('/get/accident/{id}')
def get_accident(id: int, session: Session = Depends(get_db)):
    acc = session.query(Accident).filter_by(id=id).first()
    return acc.to_dict()


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
def get_all(session: Session = Depends(get_db)):
    """
    Возвращает список всех инцидентов для отрисовки на фронте
    """
    return Accident.get_all(session)
