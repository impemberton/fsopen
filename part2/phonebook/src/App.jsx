import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  
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
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter: <input onChange={handleFilterChange} /></div>
      <h2>Add Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>name: <input onChange={handleNameChange}/></div>
        <div>number: <input onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person => { 
          if (person.name.toLowerCase().includes(filter.toLowerCase())) {
            return (<p key={person.name}>{person.name} {person.number}</p>)
          }
        }) 
      }
    </div>
  )
}

export default App
