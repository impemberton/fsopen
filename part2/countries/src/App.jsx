import { useState } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_API

const Countries = ({countries, setCountries, weather}) => {
        const handleShow = (country) => {
          setCountries([country])
        }

        if(countries.length > 10) {
          return (<p>Too many matches, specify another filter</p>)
        }
        if(countries.length === 0) {
          return (<p>No countries found</p>)
        }
        if(countries.length === 1) {
          const country = countries[0]
          return (
            <div>
              <h1>{country.name.common}</h1>
              <p>Capital {country.capital[0]}</p>
              <p>Area {country.area}m^2</p>
              <h2>Languages</h2>
              <ul>
                {Object.values(country.languages).map(name => <li key={name}>{name}</li>)}
              </ul>
              <img src={country.flags.png} alt={country.flags.alt}/>
              {
                weather ?
                  (<>
                  <h2>Weather in {country.capital[0]}</h2>
                  <p>Temperature {weather.main.temp} Celcius</p>
                  <img src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`}/>
                  <p>Wind {weather.wind.speed} m/s</p></>)
                : null
              }
            </div>
          )
        }
        return (
          countries.map(country => <p key={country.name.common}>{country.name.common}<button onClick={() => handleShow(country)}>Show</button></p>) 
        )
        
}

function App() {
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState(null)
  const handleChange = event => {
    if ( event.target.value.length <= 0 ) {
      setCountries([])
    } 
    else {
      axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then(response => {
          const exactFiltered = response.data.filter(country => country.name.common.toLowerCase() === event.target.value.toLowerCase())
          if (exactFiltered.length === 1) {
            setCountries(exactFiltered)
          } else {
            setCountries(response.data.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
          }
        })
      if (countries.length === 1) {
        console.log("getting weather")
        axios
          .get(
              `https://api.openweathermap.org/data/2.5/weather?q=${countries[0].capital[0]}&units=metric&appid=${api_key}`
              )
          .then(response => {setWeather(response.data)})
      } 
    }
  }

  return (
    <div>
      <p>find countries<input onChange={handleChange}></input></p>
      <Countries countries={countries} setCountries={setCountries} weather={weather}/>
    </div>
  )
}

export default App
