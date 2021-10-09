import React, { useEffect, useState } from "react";
import ShowPersons from "./components/ShowPersons";
import PhonebookFilter from "./components/PhonebookFilter";
import PersonForm from "./components/PersonForm";
import personService from "./services/personService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({ type: "", message: "" });

  useEffect(() => {
    personService
      .getAll()
      .then((allPersons) => {
        setPersons(allPersons);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const isNameAndNumberFilled = newName && newNumber;

    if (isNameAndNumberFilled) {
      const newPerson = { name: newName, number: newNumber };
      const personInDB = persons.find((person) => person.name === newName);
      const shouldUpdateExistingPerson =
        personInDB && newNumber !== personInDB.number;
      if (shouldUpdateExistingPerson) {
        if (
          window.confirm(
            `${personInDB.name} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          const changePerson = { ...personInDB, number: newNumber };
          personService
            .update(personInDB.id, changePerson)
            .then((returnedPerson) => {
              setNotification({
                type: "success",
                message: `Changed ${changePerson.name} number`,
              });
              setTimeout(() => {
                setNotification({
                  type: null,
                  message: null,
                });
              }, 5000);
              setPersons(
                persons.map((person) =>
                  personInDB.id !== person.id ? person : returnedPerson
                )
              );
            })
            .catch((error) => {
              setNotification({
                type: "error",
                message: `The person ${changePerson.name} was already deleted from server`,
              });
              setTimeout(() => {
                setNotification({
                  type: null,
                  message: null,
                });
              }, 5000);
              console.log(error);
            });
        }
      }
      if (!personInDB) {
        personService
          .create(newPerson)
          .then((returnedPerson) => {
            setNotification({
              type: "success",
              message: `Added ${newPerson.name}`,
            });
            setTimeout(() => {
              setNotification({
                type: null,
                message: null,
              });
            }, 5000);
            setPersons(persons.concat(returnedPerson));
          })
          .catch((error) => {
            setNotification({
              type: "error",
              message: String(error.response.data.error),
            });
            setTimeout(() => {
              setNotification({
                type: null,
                message: null,
              });
            }, 5000);
          });
      }
    } else {
      window.alert("Please fill both fields for name and number.");
    }
    setNewName("");
    setNewNumber("");
  };

  const removePerson = (person) => {
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setNotification({
            type: "success",
            message: `Deleted ${person.name}`,
          });
          setTimeout(() => {
            setNotification({
              type: null,
              message: null,
            });
          }, 5000);
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleNewPersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <PhonebookFilter name={filter} onNewFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmitHandler={addPerson}
        name={newName}
        handleNewPersonChange={handleNewPersonChange}
        number={newNumber}
        handleNewNumberChange={handleNewNumberChange}
      />
      <h3>Numbers</h3>
      <ShowPersons
        persons={persons}
        filter={filter}
        onDeleteHandler={removePerson}
      />
    </div>
  );
};

export default App;
