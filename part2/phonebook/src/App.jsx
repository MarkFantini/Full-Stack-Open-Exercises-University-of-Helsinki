import { useState } from 'react'

const Person = ({ name }) => {
  return (
    <div>{name}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const object = {
      name: newName,
    }

    const nameExists = persons.some((person) => person.name === newName)

    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(object))
    setNewName('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>

      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <div>debug: {newName}</div>
      
      <h2>Numbers</h2>
        {persons.map(person => 
          <Person key={person.name} name={person.name} />
        )}
    </div>
  )
}

export default App