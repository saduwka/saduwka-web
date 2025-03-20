import React from 'react'
import TradesChart from '../../components/features/Trades/components/TradesChart/TradesChart'
import ExchangeRate from '../../components/features/ExchangeRate/components/ExchangeRateItem/ExchangeRate'
import Slider from '../../components/features/Slider/components/Slider/Slider'

const Home = () => {
  return (
    <>
      <TradesChart size='medium'/>
      <Slider />
      <ExchangeRate />
    </>
  )
}

export default Home