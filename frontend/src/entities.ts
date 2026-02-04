
export interface LoanFormData {
    monto: number
    tasa_anual: number
    plazo_meses:number
}

export interface AmortizationRow {
    mes: number
    cuota: number
    interes: number
    capital: number
    saldo: number
}