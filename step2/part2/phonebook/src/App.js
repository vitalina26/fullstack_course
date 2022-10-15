import { useState, useEffect } from 'react'
import personService from './persons.js'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}
const Filter = ({newFilter,handleFilterChange}) => (<div>
  filter shown with: <input value={newFilter} onChange={handleFilterChange} />
</div>);
const PersonForm = ({ handlePersonChange,handleNumberChange, addPerson,newName,newNumber}) => (<form onSubmit={addPerson}>
  <div>
    name: <input value={newName} onChange={handlePersonChange} />
  </div>
  <div>
    <br></br>
  </div>
  <div>
    number: <input value={newNumber} onChange={handleNumberChange} />
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>);
const Persons = ({persons, newFilter,handleDeleteButton}) => (<div>
  {persons.filter(item => item.name.toLowerCase().includes(newFilter)).map((person) => (<h3 key={person.id}> {person.name} {person.number} <button value ={person.id} onClick = {handleDeleteButton}>delete</button></h3>))}
</div>);

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  };
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  };
  const handleDeleteButton = (event) => {
    console.log(event.target.value)
    if (window.confirm(`Do you really want to delete ?`)) {
      personService.remove(event.target.value);
    setPersons(persons.filter(item => (item.id != event.target.value)))
    }
    
  };
  const addPerson = (event) => {
    event.preventDefault();
    const index = persons.findIndex(person => (person.name === newName)); 
    if (index != -1) {
      const indexOfPerson = persons[index].id; console.log(indexOfPerson);
      if(window.confirm(`${newName} is already added to phonebook,replace the old number with a new one?`)){
        personService.update(indexOfPerson, { name:newName, number: newNumber,id: indexOfPerson }).then(response => {
        setPersons(persons.map(n => n.id != indexOfPerson ? n : response.data))
        })
      }
    } else {
    personService.create({ name: newName, number: newNumber })
    .then(response => {
      setPersons(persons.concat(response.data))
    })
      
      
    }
    setNewName('');
    setNewNumber('');
  };
  const hook = () => {
    console.log('effect')
    personService.getAll().then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, []);


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm handlePersonChange = { handlePersonChange} handleNumberChange = {handleNumberChange} addPerson={ addPerson} newName={newName } newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} handleDeleteButton={ handleDeleteButton} />
    </div>
  )
}

export default App