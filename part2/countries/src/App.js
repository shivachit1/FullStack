
import { useState,useEffect } from 'react';
import axios from 'axios';
import CountryDetails from './components/CountryDetails';

const App = () =>{

  const [countries, setCountries] = useState([]);
  const [search,setSearchName] = useState("");
  const [searchCountries, setSearchCountries] = useState([]);

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        console.log(res.data)
        setCountries(res.data)
      })
  }, [])


  const handleChange = (event) => {
    if (event.target.name === "name") {
      setSearchName(event.target.value);
      if(event.target.value!==""){
        const filter = countries.filter(country=> country.name.toLowerCase().includes(event.target.value))
        setSearchCountries(filter);
      }
     
    } 
  };

  return (
    <div>
        <div>
          find countries <input value={search} placeholder="type country name" name="name" onChange={handleChange}/>

        </div>
        
       <Countries search={search} countries={searchCountries}/>
       
    </div>
  );
}

const Countries= (props)=>{
  if(props.search.length===0){
    return null
  }

  if(props.countries.length>10){
    return <p>Too many matches,specify another filter</p>
  }

  if(props.countries.length===1){
    return <CountryDetails key={props.countries[0].name} country={props.countries[0]}/>
  }
  return(
    <div>
       {props.countries.map(country =>
            <Country key={country.name} country={country}/>
        )}
    </div>
  )
}

const Country= (props)=>{

  const [showDetail,setShowDetail] = useState(false);

  const show= ()=>{
    setShowDetail(!showDetail);
  }
 
  return(
    <div>
      <p>{props.country.name} <button onClick={show}>show</button></p>
      {showDetail ?
      <CountryDetails country={props.country}/>
      :
      null
      }
    </div>
  )
}



export default App;
