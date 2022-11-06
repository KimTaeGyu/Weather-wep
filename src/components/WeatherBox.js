import React from 'react'

const WeatherBox = ({weather}) => {
  return (
    <div className='weather-box'>
        <h1>{weather?.name}</h1>
        <h2>{weather?.main.temp}</h2>
        <h2>{weather?.weather[0].description}</h2>
    </div>
  )
}

export default WeatherBox