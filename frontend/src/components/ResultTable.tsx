import type { AmortizationRow } from "../entities";


interface Props {
    data: AmortizationRow[]
}

export default function ResultTable({data}:Props){
    if(data.length === 0)return null

    return(
        <div className="table-container">
            <h3>Tabla de Amortización</h3>
            <table>
                <thead>
                    <tr>
                        <th>Mes</th>
                        <th>Cuota</th>
                        <th>Interés</th>
                        <th>Capital</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((fila) => (
                        <tr key={fila.mes}>
                            
                            <td>{fila.mes}</td>
                            <td>${fila.cuota.toFixed(2)}</td>
                            <td>${fila.interes.toFixed(2)}</td>
                            <td>${fila.capital.toFixed(2)}</td>
                            <td>${fila.saldo.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}