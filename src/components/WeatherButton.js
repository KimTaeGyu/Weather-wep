import { Button } from 'react-bootstrap'
import React from 'react'

const WeatherButton = ({cities , setCity}) => {
    console.log("city?",cities)
  return (
    <div>
        <Button variant="warning">Current Location</Button>
        
        {cities.map((item)=>(
        <Button variant="warning" className='weather-button' onClick={()=>setCity(item)}>{item}</Button>))}
    </div>
  )
}

export default WeatherButton