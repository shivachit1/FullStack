import React, { useState,useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearchName] = useState("");

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  
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
      name: newName,
      number: newNumber,
    };

    if (persons.filter((e) => e.name === newPerson.name).length > 0) {
      alert(`${newPerson.name} is already added to the phonebook.`);
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter name="searchName" search={search} handleChange={handleChange} />

      <h4>Add a note</h4>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleChange={handleChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} search={search} />
      
    </div>
  );
};

export default App;
