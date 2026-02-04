import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { LoanFormData } from '../entities';

interface Props {
    onSubmit: (data: LoanFormData) => void
    loading:boolean
    onFieldsChange: () => void
}

export default function CreditForm({onSubmit, loading, onFieldsChange}:Props){
    const [formData, setFormData]= useState<LoanFormData>(()=> {
        const savedData = localStorage.getItem('creditSim_data')
        return savedData ? JSON.parse(savedData) : {
            monto: 0,
            tasa_anual: 0,
            plazo_meses: 0
        }
    })

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        const newVal = parseFloat(e.target.value)
        // Actualizamos el estado local
        const updatedData = {
            ...formData,
            [e.target.name]: isNaN(newVal) ? 0 : newVal
        }
        setFormData(updatedData)

        //PERSISTENCIA: Guardamos inmediatamente en localStorage
        localStorage.setItem('creditSim_data', JSON.stringify(updatedData))
        //LIMPIEZA: Avisamos al padre que borre la tabla porque los datos cambiaron
        onFieldsChange()
    }

    

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return(
        <div className='card'>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Monto del Préstamo ($)</label>
                    <input type='number' name='monto' value={formData.monto || ""} onChange={handleChange} required/>
                </div>
                <div className='form-group'>
                    <label>Tasa Anual (%)</label>
                    <input type='number' step='0.1' name='tasa_anual' value={formData.tasa_anual || ""} onChange={handleChange} required/>
                </div>

                <div className='form-group'>
                    <label>Plazo (Meses)</label>
                    <input type='number' name='plazo_meses' value={formData.plazo_meses || ""} onChange={handleChange} required/>
                </div>

                <button type='submit' disabled={loading}>
                    {loading ? "Calculando..." : "Simular Crédito"}
                </button>
            </form>
        </div>
    )
}