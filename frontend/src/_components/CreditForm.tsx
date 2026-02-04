import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { LoanFormData } from '../entities';

interface Props {
    onSubmit: (data: LoanFormData) => void
    loading:boolean
}

export default function CreditForm({onSubmit, loading}:Props){
    const [formData, setFormData]= useState<LoanFormData>({
        monto: 0,
        tasa_anual: 0,
        plazo_meses: 0
    })

    const handleChange = ((e : ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: parseFloat(e.target.value) || 0
        })
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return(
        <div className='card'>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Monto del Préstamo ($)</label>
                    <input type='number' name='monto' onChange={handleChange} required/>
                </div>
                <div className='form-group'>
                    <label>Tasa Anual (%)</label>
                    <input type='number' step='0.1' name='tasa_anual' onChange={handleChange} required/>
                </div>

                <div className='form-group'>
                    <label>Plazo (Meses)</label>
                    <input type='number' name='plazo_meses' onChange={handleChange} required/>
                </div>

                <button type='submit' disabled={loading}>
                    {loading ? "Calculando..." : "Simular Crédito"}
                </button>
            </form>
        </div>
    )
}