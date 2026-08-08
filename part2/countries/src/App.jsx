import { useState } from 'react'
import axios from 'axios'

const Countries = ({countries}) => {
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
            </div>
          )
        }
        return (
          countries.map(country => <p key={country.name.common}>{country.name.common}</p>) 
        )
        
}

function App() {
  const [countries, setCountries] = useState([])
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
    }
  }

  return (
    <div>
      <p>find countries<input onChange={handleChange}></input></p>
      <Countries countries={countries}/>
    </div>
  )
}

export default App
