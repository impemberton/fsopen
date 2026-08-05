import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  
  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).indexOf(newName) === -1) {
      setPersons(persons.concat({name: newName}))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }
  
  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (<p key={person.name}>{person.name}</p>))}
    </div>
  )
}

export default App
