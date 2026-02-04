from fastapi import FastAPI, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

import models, schemas, services 
from database import engine, get_db

#crear tablas en la BD automáticamente al iniciar
models.Base.metadata.create_all(bind= engine)

app = FastAPI(title="CreditSim")

#lista de origenes para permitir conexiones
origins = [
    "http://localhost:5173",
    "https://creditsim-bg96.onrender.com",
    "*"
]

#configuración de CORS para permitir la conexión con React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials= True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/simulate", response_model=list[schemas.AmortizationRow])
async def simulate_loan(
    request:schemas.LoanRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    #1. Guardar la simulación en BD (persistencia)
    db_simulation = models.SimulationLog(
        monto= request.monto,
        tasa_anual= request.tasa_anual,
        plazo_meses= request.plazo_meses
    )
    db.add(db_simulation)
    db.commit()
    db.refresh(db_simulation)

    #2. Enviar la auditoria en segundo plano pero sin bloquear la respuesta
    background_tasks.add_task(services.mock_risk_audit, db_simulation.id)

    #3. Calcular tabla
    tabla = services.calcular_amortizacion(
        request.monto,
        request.tasa_anual,
        request.plazo_meses
    )

    return tabla