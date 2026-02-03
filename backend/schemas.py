from pydantic import BaseModel, Field

class LoanRequest(BaseModel):
    monto: float = Field(..., gt=0, description= "Monto del préstamo")
    tasa_anual: float = Field(..., gt=0, description= "Tasa de interés anual (%)")
    plazo_meses: int = Field(..., gt=0, description= "Plazo en meses")

class AmortizationRow(BaseModel):
    mes: int
    cuota: float
    interes: float
    capital: float
    saldo: float