import './WeatherInformations5Days.css'

export default function WeatherInformations5Days({ weather5Days }) {

  let dailyForecast = {}

  for (let forecast of weather5Days.list) {
    const date = new Date(forecast.dt * 1000).toLocaleDateString()

    if (!dailyForecast[date]) {
      dailyForecast[date] = {
        date: forecast.dt,
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        weather: forecast.weather[0],
      }
    } else {
      dailyForecast[date].temp_min = Math.min(dailyForecast[date].temp_min, forecast.main.temp_min)
      dailyForecast[date].temp_max = Math.max(dailyForecast[date].temp_max, forecast.main.temp_max)
    }
  }

  const next5DaysForecast = Object.values(dailyForecast).slice(1, 6)

  function convertDate(date) {
    const newDate = new Date(date * 1000).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit' })
    return newDate
  }

  return (
    <div className="weather-container">
      <h3>Previsão para os próximos 5 dias</h3>
      <div className="weather-list">
        {next5DaysForecast.map(forecast => (
          <div key={forecast.date} className="weather-item">
            <p className="forecast-day">{convertDate(forecast.date)}</p>
            <img src={`http://openweathermap.org/img/wn/${forecast.weather.icon}.png`} alt="imagem" />
            <p className="forecast-description">{forecast.weather.description}</p>
            <p>{Math.round(forecast.temp_min)}°C min / {Math.round(forecast.temp_max)}°C max</p>
          </div>
        ))}
      </div>
    </div>
  )
}

