# Реализованная функциональность

- Модель бинарной классификации (есть нефтеразлив на снимке или нет)
- Сегментационная модель площади нефтеразлива на снимке со спутника
- Интеграция с NASA API для выгрузки данных со спутников в реальном времени (реализовано при помощи Celery + Redis)
- Интеграция с Open Street Map для поиска ближайших рек, озер и поселений

# Особенность проекта в следующем

- Прогнозирование общей площади нефтеразлива на несколько лет вперед
- Отслеживание динамики нефтеразлива
- Организован структурированный реестр данных нефтеразливов
- Оценка стоимости ликвидации нефтеразлива
- Генерация отчета в формате excel, pdf

# Стек

- Docker, Docker compose
- Python, FastApi, Overpy
- Celery, Redis
- HTML, CSS, TypeScript, JavaScript, React
- Mobx
- PostgreSQL
- Git, Github
- Pytorch, Catalyst

# Нейросетевые модели

- В качестве модели классификации была выбрана ResNet-18, так как она обладает высокой скоростью инференса(200мс на выделенном сервере) и решает задачу с необходимой (99% на отложенной выборке) точностью. В дальнейшем данная модель может быть заменена на более тяжелую, при условии увеличения кол-ва доступных ресурсов и разрешения входных изображений.

- В качестве модели для сегментации была выбрана UNet++, так как она обладает высокой скоростью инференса(200мс на выделенном сервере) и позволяет оценивать площадь разлива.

# Установка 
- `docker-compose up`

# Демо

Демо доступно по адресу

- http://37.46.128.70:5000/docs - Swagger
- http://37.46.128.70:3000/ - Frontend


# Структура

- data/images - данные со спутников
- data/reestr - данные в экселях

# Разработчики
Имя| Роль | Контакт |
--- | --- | ---  
Ковалев Святослав | Fullstack | https://t.me/Svkov42 
--- | --- | ---  
Суржиков Александр | Data Scientist | https://t.me/mansasha
--- | --- | ---  
Савельева Олеся | Product manager | https://t.me/OlesyaIT
--- | --- | ---  
Зыков Михаил | UI/Motion designer | https://t.me/MikelPlus 
