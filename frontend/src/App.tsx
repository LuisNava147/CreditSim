import { use, useState } from 'react'

import './App.css'
import { AmortizationRow, type LoanFormData } from './entities'

function App() {
  const [result, setResult] = useState<AmortizationRow[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSimulate = async (formData: LoanFormData) => {
    setLoading(true)
    setError(null)
    setResult([])
  }

}
