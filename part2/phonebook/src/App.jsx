import { useState } from 'react'

const Person = ({ name, number }) => {
  return (
    <div>{name} {number}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567',
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const object = {
      name: newName,
      number: newNumber
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

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>

      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <div>debug: {newName}</div>
      
      <h2>Numbers</h2>
        {persons.map(person => 
          <Person key={person.name} name={person.name} number={person.number} />
        )}
    </div>
  )
}

export default App