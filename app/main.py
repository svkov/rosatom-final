import json
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
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


@app.get("/predict/")
def predict():
    path_to_model = 'models/best_loss_rn18.st'
    path_to_image = 'satellite_data/58.0-61.0.jpg'
    res = predict_pic(path_to_model, path_to_image)
    return {'predict': res}
