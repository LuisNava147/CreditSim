import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

#se busca la URL de la nube. Sino existe se usa SQLite
SQLALCHEMY_DATABASE = os.getenv("DATABASE_URL","sqlite:///./creditsim.db")

#Correción para render
if SQLALCHEMY_DATABASE.startswith("postgres://"):
    SQLALCHEMY_DATABASE = SQLALCHEMY_DATABASE.replace("postgres://", "postgresql://", 1)

if "sqlite" in SQLALCHEMY_DATABASE:
    engine = create_engine(
    SQLALCHEMY_DATABASE, connect_args={"check_same_thread":False}
)
else:
    #configuración para postgreSQL
    engine = create_engine(SQLALCHEMY_DATABASE)

SessionLocal = sessionmaker(autocommit= False, autoflush= False, bind= engine)

Base = declarative_base()

