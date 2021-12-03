from time import sleep
import traceback

from celery import current_task  # noqa
from celery import states
from celery.exceptions import Ignore  # noqa
import requests

from worker import celery
import os


@celery.task(name='hello.task', bind=True)
def hello_world(self, name):
    try:
        if name == 'error':
            k = 1 / 0  # noqa
        for i in range(60):
            sleep(1)
            self.update_state(state='PROGRESS', meta={'done': i, 'total': 60})
        return {"result": "hello {}".format(str(name))}
    except Exception as ex:
        self.update_state(
            state=states.FAILURE,
            meta={
                'exc_type': type(ex).__name__,
                'exc_message': traceback.format_exc().split('\n')
            })
        raise ex


@celery.task(name='download_satellite', bind=True)
def download_satellite(self, lat, lon):
    api_key = 'shxWJfVbBrWHcz7nLYA2FqLtn3dk8qiaTgOzb377'
    date = '2021-09-01'
    dim = 0.5
    url = f'https://api.nasa.gov/planetary/earth/imagery?api_key={api_key}'
    url += f'&lat={lat}&lon={lon}&date={date}&dim={dim}'
    self.update_state(state='PROGRESS', meta={'done': 0, 'total': 100})
    response = requests.get(url, stream=True)
    cwd = os.getcwd()
    dir_name = 'satellite_data'
    if dir_name not in os.listdir(cwd):
        os.makedirs(dir_name)
    filename = f'{lat}-{lon}.jpg'
    path = os.path.join(cwd, 'satellite_data', filename)
    if response.status_code == 200:
        with open(path, 'wb') as f:
            for i, chunk in enumerate(response.iter_content(1024)):
                f.write(chunk)
                self.update_state(state='PROGRESS', meta={
                                  'done': i + 1, 'total': 100})
        return filename
    if response.status_code == 404:
        self.update_state(
            state=states.FAILURE,
            meta={
                'exc_type': 'Not found',
                'exc_message': 'Data not found'
            })
    self.update_state(
        state=states.FAILURE,
        meta={
            'exc_type': f'Unknown {response.status_code}',
            'exc_message': response.content
        }
    )
