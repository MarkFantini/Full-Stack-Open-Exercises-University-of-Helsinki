import { useState, useEffect } from 'react'
import phoneService from './services/phones'
import './index.css'

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

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='inclusion'>
      {message}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [message, setMessage] = useState(null)
  const showFiltered = false

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const nameExists = persons.some((person) => person.name === newName)

    if (nameExists) {
      const replace = confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)
      
      const id = persons.find((person) => person.name === newName).id
      
      if (replace) {
        phoneService
          .updatePhone(id, newPerson)
          .then(updatedPhone => {
            setPersons(persons.map(person => person.id === id ? updatedPhone : person))
            setNewName('')
            setNewNumber('')
            setMessage(`Phone ${newName} has been updated`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMessage(`${error}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      phoneService
        .addPhone(newPerson)
        .then(addedPhone => {
          setPersons(persons.concat(addedPhone))
          setNewName('')
          setNewNumber('')
          setMessage(`Phone ${newName} has been added`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })}
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
          setMessage(`Information of ${newName} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
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
      <Notification message={message} />
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