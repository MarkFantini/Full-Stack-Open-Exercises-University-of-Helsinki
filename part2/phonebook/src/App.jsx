import { useState } from 'react'

const Person = ({ name, number }) => {
  return (
    <div>{name} {number}</div>
  )
}

const Filter = ({ search }) => {
  return (
    <form>
        <div>
          filter shown with <input />
        </div>
      </form>
  )
}

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const showFiltered = false

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

  const nameFilter = (event) => {
    setFilteredName(event.target.value)
  }

  const filteredPersons = showFiltered
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filteredName.toLowerCase()))

  return (
    <div>

      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input value={filteredName} onChange={nameFilter} />
        </div>
      </form>

      <h2>Add a new phone</h2>

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

      
      <h2>Numbers</h2>
        {filteredPersons.map(person => 
          <Person key={person.name} name={person.name} number={person.number} />
        )}
    </div>
  )
}

export default App