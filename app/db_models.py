from db import Base
from sqlalchemy import Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship


class Coords(Base):
    __tablename__ = 'coords'

    id = Column(Integer, primary_key=True, index=True)
    lat = Column(Float, nullable=False)
    lon = Column(Float, nullable=False)
