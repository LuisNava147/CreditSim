import math
import asyncio
import random
import logging

#se crean logs para revisar feedback 
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def calcular_amortizacion(monto:float, tasa_anual: float, plazo:int):
    #se genera la tabla de amortizacion en sistema fránces
    tasa_mensual = (tasa_anual / 100) / 12

    #cálculo de la cuota fija, formula de anualidades
    if tasa_mensual > 0:
        cuota = (monto * tasa_mensual) / (1-math.pow(1 + tasa_mensual, -plazo))
    else:
        cuota = monto / plazo

    tabla = []
    saldo = monto

    for mes in range(1, plazo + 1):
        interes = saldo * tasa_mensual
        capital = cuota - interes
        saldo -= capital

        #ajuste en caso de que sea menor que cero
        if saldo < 0 : saldo = 0

        tabla.append({
            "mes":mes,
            "cuota":cuota,
            "interes":interes,
            "capital":round(capital, 2),
            "saldo": round(saldo, 2)
        })

    return tabla

async def mock_risk_audit(sim_id: int):
    #auditoria de riesgo
    logger.info("auditoria: {sim_id}")

    #respuesta menor a 200
    wait_time = random.uniform(1, 3)
    await asyncio.sleep(wait_time)

    #fallo aleatorio del 10%
    if random.random() < 0.1:
        logger.info("Auditoria rechazada {sim_id}")
    else:
        logger.info("Audiotria aprobada {sim_id} ({wait_time:.2f}s)")