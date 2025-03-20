import React from 'react'
import { getTrades } from '../../api/GetTrades/GetTrades'
import { useQuery } from '@tanstack/react-query'
import { CategoryScale } from 'chart.js'
import { Chart } from 'chart.js/auto'
import CustomCharts from '../../../../Charts/CustomCharts'

Chart.register(CategoryScale);

const TradesChartMedium = ({size = "medium"}) => {
  const { data: tradesData, isLoading } = useQuery({
    queryKey: ['trades'],
    queryFn: getTrades,
    refetchInterval: 5000
  })

  if (isLoading) return <p>Loading...</p>;
  

  const prices = tradesData.map(item => Number(item.price).toFixed(2));
  const timeStamps = tradesData.map(item => new Date(item.time).toLocaleTimeString());

  console.log(tradesData)
  const chartData = {
    labels: timeStamps,
    datasets: [
      {
        label: 'BTC',
        data: prices,
        borderColor: '#E323FF',
        pointRadius: 0,
        tension: 0.1,
        borderWidth: 3,
        borderRadius: 3,
      }
    ],
  }


  console.log(chartData);
  
return (
  <>
    <div><CustomCharts data={chartData} size={size}/></div> 
  </>
  )
}

export default TradesChartMedium