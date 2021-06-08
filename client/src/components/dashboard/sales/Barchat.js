import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'

export const Barchat = () => {

    const [chartData] = useState({
        labels: ['May', 'June', 'July', 'August', 'September', 'October'],
        datasets: [
            {
                label: 'Sales Report for the past 6 months',
                data: [
                    1000,
                    2300,
                    2100,
                    6000,
                    4000,
                    3000,
                    7000
                ],
                backgroundColor: '#c4c4c4'
            }
        ]
    })
    const options = {
                title: {
                    display: true,
                    text:'Past Six Months'
                },
                legend: {
                    display: true,
                    position: 'right'
             }
        }

    return <>
       <div className="chart">
        <Bar
            data={chartData}
            options={options}
        />
       </div>
    </>
}
export default Barchat