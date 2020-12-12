
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const CountryDetails = ({country}) =>{
const [weather,setWeatherData] = useState('');
    useEffect(() => {
        console.log('effect')
        axios
          .get(`http://api.weatherstack.com/current?access_key=`+process.env.REACT_APP_API_KEY+`&query= `+country.name)
          .then(res => {
            console.log(res.data)
            setWeatherData(res.data.current)
          })
      }, [])


    return (
      <div>
        <h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>languages</h3>
        <ul>
          {country.languages.map(language=>
            <li key={language.name}>{language.name}</li>
          )}
        </ul>
        <img src={country.flag} alt="flag"/>
          <h3>Weather in {country.capital}</h3>
          {weather!=="" ?
          <div>
              <p><strong>temperature: </strong>{weather.temperature} Celsius</p>
                <img src={weather.weather_icons[0]} alt="weather_icon"/>
                <p><strong>wind: </strong>{weather.wind_speed}mph direction {weather.wind_dir}</p>
          </div>
          
          :
          null
          }
          
      </div>
    )
  }

  export default CountryDetails;