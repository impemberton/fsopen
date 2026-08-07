import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const Filter = ({setFilter}) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>filter: <input onChange={handleFilterChange} /></div>
  )
}

const PersonForm = ({newName, newNumber, persons, setNewName, setNewNumber, setPersons, setErrorMessage}) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    setErrorMessage(`Added ${newName}`)
    setTimeout(() => setErrorMessage(null), 5000)
    if (persons.map(person => person.name).indexOf(newName) === -1) {
      personService
        .create(newPerson)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
    } else {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const oldPerson = persons.filter(person => person.name === newName)[0]
        personService
          .update(oldPerson.id, newPerson)
          .then(returnedPerson => {
            const personsCopy = persons.filter(person => person.name !== newName)
            setPersons([...personsCopy, returnedPerson])
          })
      }
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

const Persons = ({persons, setPersons, filter}) => {
  const handleDelete = (id) => {
    personService
      .remove(id)
      .then(returnedPerson => setPersons(persons.filter(person => person.id !== returnedPerson.id)))
  }
    
  return (
        persons.map(person => { 
          if (person.name.toLowerCase().includes(filter.toLowerCase())) {
            return (<p key={person.name}>{person.name} {person.number}<button onClick={() => handleDelete(person.id)}>delete</button></p>)
          }})
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    personService
      .getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
  }, [])
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter setFilter={setFilter} />
      <h2>Add Contact</h2>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber}
        persons={persons} 
        setNewName={setNewName} 
        setNewNumber={setNewNumber} 
        setPersons={setPersons} 
        setErrorMessage={setErrorMessage}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} filter={filter}/>
    </div>
  )
}

export default App
