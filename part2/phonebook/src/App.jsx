import { useState, useEffect } from 'react'
import phoneService from './services/phones'

const Filter = ({ value, handle }) => {
  return (
    <form>
      <div>
        filter shown with <input value={value} onChange={handle} />
      </div>
    </form>
  )
}

const PersonForm = ({ submit, name, nameHandler, number, numberHandler }) => {
  return (
    <form onSubmit={submit}>
        <div>
          name: <input value={name} onChange={nameHandler} />
        </div>
        <div>
          number: <input value={number} onChange={numberHandler} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({ persons, deleteHandler }) => {
  return (
    persons.map(person => 
      <Person
        key={person.name}
        name={person.name}
        number={person.number}
        id={person.id}
        deleteHandler={deleteHandler}
      />
    )
  )
}

const Person = ({ name, number, id, deleteHandler }) => {
  return (
      <div>
        {name} {number}<button onClick={() => deleteHandler(name, id)}>delete</button>
        </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const showFiltered = false

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const nameExists = persons.some((person) => person.name === newName)

    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    phoneService
      .addPhone(newPerson)
      .then(addedPhone => {
        setPersons(persons.concat(addedPhone))
        setNewName('')
        setNewNumber('')
      })
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

  const deletePerson = (name, id) => {
    if (confirm(`Delete ${name}?`)) {
      phoneService
        .deletePhone(id)
        .then(() => {
          const personsAfterDeletion = persons.filter(person => person.id !== id)
          setPersons(personsAfterDeletion)
        })
        .catch(error => {
          alert(`The person ${name} was already removed from the server`)
          // const personsAfterDeletion = persons.filter(person => person.id !== id)
          setPersons(personsAfterDeletion)
        })
    }
  }

  const filteredPersons = showFiltered
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filteredName.toLowerCase()))

  useEffect (() => {
    console.log('effect')
    phoneService
      .getPhones()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  return (
    <div>

      <h2>Phonebook</h2>
      <Filter value={filteredName} handle={nameFilter} />


      <h2>Add a new phone</h2>
      <PersonForm
        submit={addPerson}
        name={newName}
        nameHandler={handleNewName}
        number={newNumber}
        numberHandler={handleNewNumber}
      />

      
      <h2>Numbers</h2>
      <Persons
        persons={filteredPersons}
        deleteHandler={deletePerson}
      />
    </div>
  )
}

export default App