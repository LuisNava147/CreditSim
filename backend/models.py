from sqlalchemy import Column, Integer, Float, DateTime
from datetime import datetime
from database import Base

class SimulationLog(Base):
    __tablename__ = "simulations"

    id:Column(Integer, primary_key= True, index= True)
    monto = Column(Float, nullable= False)
    tasa_anual = Column(Float, nullable= False)
    plazo_meses = Column(Integer, nullable = False)
    fecha_creacion = Column(DateTime, default = datetime.utcnow)
