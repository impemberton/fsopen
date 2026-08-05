import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({setFilter}) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>filter: <input onChange={handleFilterChange} /></div>
  )
}

const PersonForm = ({newName, newNumber, persons, setNewName, setNewNumber, setPersons}) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).indexOf(newName) === -1) {
      setPersons(persons.concat({name: newName, number: newNumber}))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>name: <input onChange={handleNameChange}/></div>
      <div>number: <input onChange={handleNumberChange}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  
  )
}

const Persons = ({persons, filter}) => {
  return (
        persons.map(person => { 
          if (person.name.toLowerCase().includes(filter.toLowerCase())) {
            return (<p key={person.name}>{person.name} {person.number}</p>)
          }})
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />
      <h2>Add Contact</h2>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber}
        persons={persons} 
        setNewName={setNewName} 
        setNewNumber={setNewNumber} 
        setPersons={setPersons} 
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App
