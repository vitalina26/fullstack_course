import { useState, useEffect } from 'react'
import axios from 'axios'
const FindCountries = ({newFilter,handleFilterChange}) => (<div>
  find countries <input value={newFilter} onChange={handleFilterChange} />
</div>);
const Country = ({ }) => (<></>);
const Countries = ({ countries}) => {
  if (countries.length == 1) {
    return(<>
      <h1>{ countries[0].name.official}</h1>
    </>)
  } else {
    return (<>{countries.map((country)=>(<div>country.name.official</div>)) }</>)
  }
};
function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [newFilter, setNewFilter] = useState('');

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    const tempArr = countries.filter((country) => { country.name.official.includes(newFilter) })
    if (tempArr.length > 10) {
      setFilteredCountries(['Too many matches,specify another filter']);

    }
    if (tempArr.length == 1 ) { 
      
    } else {
      setFilteredCountries(tempArr);
    }
  };
  const showCountry = (event) => {
    event.preventDefault();
    
  };
  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v2/all?fields=name,capital,languages,flags')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  
  useEffect(hook, []);
  return (
    <div>
      <FindCountries newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Countries countries={filteredCountries}/>
    </div>
  );
}

export default App;
