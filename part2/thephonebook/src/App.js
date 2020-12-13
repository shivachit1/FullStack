import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/person";
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearchName] = useState("");
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleChange = (event) => {
    if (event.target.name === "name") {
      setNewName(event.target.value);
    } else if (event.target.name === "number") {
      setNewNumber(event.target.value);
    } else if (event.target.name === "searchName") {
      setSearchName(event.target.value);
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    if (persons.filter((e) => e.name.toLowerCase() === newPerson.name.toLowerCase()).length > 0) {
      var result = window.confirm(
        `${newPerson.name} is already added to the phonebook, replace the old number with a new one? `
      );
      if (result) {
        const person = persons.find((n) => n.name.toLowerCase() === newPerson.name.toLowerCase());
        const changedPerson = { ...person, number: newPerson.number };
        personService.update(person.id, changedPerson).then((changedResult) => {
          setPersons(
            persons.map((person) =>
              person.id !== changedPerson.id ? person : changedResult
            )
          );
        
          setMessage(person.name+"'s number is changed.");
        setTimeout(() => {
          setMessage("")
        }, 3000);

          setNewName("");
          setNewNumber("");
        });
      }
    } else {
      //
      setNewName("");
      setNewNumber("");
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMessage("Added "+returnedPerson.name);
        setTimeout(() => {
          setMessage("")
        }, 3000)
      });
    }
  };

  const deletePerson = (value) => {
    var result = window.confirm(`Delete ${value.name}?`);

    if (result) {
      personService.remove(value.id).then(() => {
        setPersons(persons.filter(person=> person.id!==value.id))
      }).catch(error => {
        setErrorMessage(
          `Information of '${value.name}' has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage("");
        }, 5000)
      });;
    }
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errorMessage={errorMessage}/>
      <Filter name="searchName" search={search} handleChange={handleChange} />

      <h4>Add a note</h4>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleChange={handleChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} search={search} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
