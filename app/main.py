import base64
import json
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from load_data_overpass import find_nearest_objects_df
from worker import celery
from starlette.responses import FileResponse
import os
from predict import predict_pic


app = FastAPI()


class Item(BaseModel):
    name: str


@app.get("/hello/")
async def hello():
    return {'ok': 'ok'}


@app.post("/task_hello_world/")
async def create_item(item: Item):
    task_name = "hello.task"
    task = celery.send_task(task_name, args=[item.name])
    return dict(id=task.id, url='localhost:5000/check_task/{}'.format(task.id))


@app.get("/check_task/{id}")
def check_task(id: str):
    task = celery.AsyncResult(id)
    if task.state == 'SUCCESS':
        response = {
            'status': task.state,
            'result': task.result,
            'task_id': id
        }
    elif task.state == 'FAILURE':
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


class Coords(BaseModel):
    lat: float
    lon: float


@app.post("/download/")
def download_data(coords: Coords):
    task_name = "download_satellite"
    task = celery.send_task(task_name, args=[coords.lat, coords.lon])
    return dict(id=task.id)


@app.get("/check_download/{id}")
def check_download(id: str):
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
    task = celery.AsyncResult(id)
    filename = task.result
    path = os.path.join('satellite_data', filename)
    return FileResponse(path,
                        media_type='application/octet-stream',
                        filename='image.jpg')


@app.get("/download_coord/")
def download_coord(coord: Coords):
    filename = f'{coord.lat}-{coord.lon}.jpg'
    path = os.path.join('satellite_data', filename)
    if filename not in os.listdir('satellite_data'):
        raise HTTPException(status_code=404, detail="Data now found")
    return FileResponse(path,
                        media_type='application/octet-stream',
                        filename='image.jpg')


@app.get("/predict/{id}")
def predict(id: str):
    task = celery.AsyncResult(id)
    filename = task.result
    path = os.path.join('satellite_data', filename)
    res = predict_pic(path)
    return {'predict': res}


@app.post("/predict/")
def predict_coord(coord: Coords):
    filename = f'{coord.lat}-{coord.lon}.jpg'
    path = os.path.join('satellite_data', filename)
    res = predict_pic(path)
    return {'predict': res}


@app.post("/nearest_objects/")
def get_nearest_objects(coord: Coords):
    df = find_nearest_objects_df(coord.lat, coord.lon)
    return df.to_dict('records')


@app.get("/all/")
def get_all():
    from datetime import datetime
    with open("satellite_data/58.0-61.0.jpg", "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
    example = {
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
    return [example]
