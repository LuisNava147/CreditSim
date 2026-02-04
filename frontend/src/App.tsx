import { useState } from 'react'

import './App.css'
import type { AmortizationRow, LoanFormData } from './entities'
import { API_URL } from './constants'
import CreditForm from './_components/CreditForm'
import ResultTable from './_components/ResultTable'

function App() {
  const [result, setResult] = useState<AmortizationRow[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSimulate = async (formData: LoanFormData) => {
    setLoading(true)
    setError(null)
    setResult([])
  
 
  try{
    const response = await fetch(`${API_URL}/simulate`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData)
    })
    
    if(!response.ok) throw new Error('Error en el servidor')

    const data: AmortizationRow[] = await response.json()
    setResult(data)
  }catch(err){
    setError("Error al conectar con el servidor")
  }finally{
    setLoading(false)
  }
}

//Borra la tabla si el usuario toca el formulario
const handleFormChange = () => {
  if(result.length > 0){
    //setResult hace que se borre la tabla vieja
    setResult([])
  }
}
  return(
    <>
    <div className='container'>
      <h1>CreditSim</h1>
      <p>Simulador profesional</p>
    </div>
    <CreditForm onSubmit={handleSimulate} loading={loading} onFieldsChange={handleFormChange}/>
    {error && <p className='error'>{error}</p>}
    <ResultTable data={result}/>
    </>
  )
    
}

export default App
