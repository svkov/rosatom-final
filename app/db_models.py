from sqlalchemy.sql.sqltypes import Date
from db import Base
from sqlalchemy import Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship


class OilPipe(Base):
    __tablename__ = 'oil_pipe'

    id = Column(Integer, primary_key=True)
    lat = Column(Float)
    lon = Column(Float)
    name = Column(String)


class Image(Base):
    __tablename__ = 'image'

    id = Column(Integer, primary_key=True)
    base64_img = Column(String)
    clf_tag = Column(Integer)  # 1 if oil spill, 0 if no
    area = Column(Float)  # in square meters


class Company(Base):
    __tablename__ = 'company'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    address = Column(String)


class Accident(Base):
    __tablename__ = 'accident'

    id = Column(Integer, primary_key=True)
    date = Column(Date)
    lat = Column(Float)
    lon = Column(Float)
    image_id = Column(Integer, ForeignKey('image.id'))
    image = relationship("Image")
    company_id = Column(Integer, ForeignKey('company.id'))
    company = relationship('Company')
    oil_pipe_id = Column(Integer, ForeignKey('oil_pipe.id'))
    oil_pipe = relationship('OilPipe')
    important_objects = relationship(
        'ImportantObject', back_populates='accident')

    def to_dict(self):
        objects = [obj.to_dict() for obj in self.important_objects]
        return {
            'id': self.id,
            'date': self.date,
            'lat': self.lat,
            'lon': self.lon,
            'region': 'ХМАО',
            'area': self.image.area,  # Площадь в кв м
            'company': self.company.name,
            'factory_address': self.company.address,
            'oil_pipe': {
                'name': self.oil_pipe.name,
                'lat': self.oil_pipe.lat,
                'lon': self.oil_pipe.lon
            },
            'nature': {
                'Зверобойник брасчатый': 'Редкий',
                'Подкобыльник рябристый': 'Условно редкий'
            },
            'closest_obj': objects,
            'photo': self.image.base64_img
        }

    @staticmethod
    def get_all(session):
        return [acc.to_dict() for acc in session.query(Accident).all()]

    @staticmethod
    def get_by_id(session, id):
        acc = session.query(Accident).filter_by(id=id).first()
        acc_dict = acc.to_dict()
        return acc_dict


class ImportantObject(Base):
    __tablename__ = 'important_object'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    tag = Column(String)
    distance = Column(Float)
    accident_id = Column(Integer, ForeignKey('accident.id'))
    accident = relationship('Accident', back_populates='important_objects')

    def to_dict(self):
        return {
            'name': self.name,
            'tag': self.tag,
            'distance': self.distance  # расстояние в км
        }
