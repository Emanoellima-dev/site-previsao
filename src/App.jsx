import { useState, useRef } from 'react'
import axios from 'axios'
import WeatherInformations from './components/WeatherInformations/WeatherInformations'
import WeatherInformations5Days from './components/WeatherInformations5Days/WeatherInformations5Days'

import './App.css'

function App() {
 const [weather, setWeather] = useState();
 const [weather5Days, setWeather5Days] = useState();
 const inputRef = useRef()

 async function searchCity(){
  const city = inputRef.current.value
  const API_KEY = import.meta.env.VITE_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=pt_br&units=metric`
  const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&lang=pt_br&units=metric` 
 
  const apiInfo  = await axios.get(url)
  const apiInfo5Days = await axios.get(url5Days)
  
  setWeather(apiInfo.data)
  setWeather5Days(apiInfo5Days.data)
 }

  return (
   <div className="container">
    <h1>Previsão Do Tempo</h1>
    <input
     type="text"
     placeholder="Digite O Nome Da Cidade"
     ref={inputRef} 
   />
    <button onClick={searchCity}>Buscar</button>

    {weather && <WeatherInformations weather={weather}/>}
  
    {weather5Days && <WeatherInformations5Days weather5Days={weather5Days}/>}
  </div>
  )
}

export default App;
