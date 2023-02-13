import React from 'react'
import { Line } from 'react-chartjs-2'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  scales
);

function LineChart ({symbolData}) {
  const data = {
    // labels: Array(20).join().split(',').map(function(a){return this.i++},{i:1}),
    labels: Array.from({length: 30}, (_, i) => 30-i),
    datasets: [
      {
        label: symbolData.symbol,
        data: symbolData.timeSeries.slice(0,30),
        borderColor: ['rgba(255, 206, 86, 0.2)'],
        backgroundColor: ['rgba(255, 206, 86, 0.2)'],
        pointBackgroundColor: 'rgba(255, 206, 86, 0.2)',
        pointBorderColor: 'rgba(255, 206, 86, 0.2)'
      },
    ]
  }

  const options = {
    responsive: true,
    plugins:{
      legend:false,
   
    title: {
      display: true,
      text: symbolData.symbol,
    },

    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          min: 0,
          stepSize: 1,
          callback: function(value) {
            return `${value}`
          }
        }
      }]
    }

    },
  
   
  
  }


  return <Line data={data} 
  options={options}
   />
}

export default LineChart
