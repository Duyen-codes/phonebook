import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";
import ContactsIcon from "@mui/icons-material/Contacts";
import { Typography } from "@mui/material";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);

  // getAll request
  useEffect(() => {
    personService.getAll().then((initialState) => setPersons(initialState));
  }, []);
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value);
  };

  // post request
  const addPerson = (event) => {
    event.preventDefault();
    const foundPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (foundPerson) {
      const confirm = window.confirm(
        `${foundPerson.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirm) {
        const changedPerson = { ...foundPerson, number: newNumber };

        personService
          .update(foundPerson.id, changedPerson)
          .then((returnedObject) => {
            setPersons(
              persons.map((person) =>
                person.id !== foundPerson.id ? person : returnedObject
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setMessage({
              content: `Information of '${foundPerson.name}' has already been removed from server`,
              type: "error",
            });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setPersons(
              persons.filter((person) => person.id !== foundPerson.id)
            );
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(personObject)
        .then((returnedObject) => {
          setPersons(persons.concat(returnedObject));
          setNewName("");
          setNewNumber("");
          setMessage({
            content: `Added ${returnedObject.name}`,
            type: "info",
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setMessage({
            content: error.response.data.error,
            type: "error",
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
  };

  const handleRemove = (id) => {
    const person = persons.find((person) => person.id === id);
    // axios
    //   .delete(`http://localhost:3001/persons/${id}`, person)
    //   .then((response) =>
    //     setPersons(persons.filter((person) => person.id !== id))
    //   );

    const confirm = window.confirm(
      `Are you sure you want to delete ${person.name} ?`
    );

    if (confirm) {
      personService.remove(id, person).then((returnedObject) => {
        setPersons(persons.filter((person) => person.id !== id));
        setMessage({
          content: `Successfully deleted ${returnedObject.name}`,
          type: "info",
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
    return;
  };

  const handleSaveEdited = (id, newPersonObject) => {
    console.log("id", id);
    console.log("newPersonObject", newPersonObject);
    console.log("handleEdit clicked");
    personService
      .update(id, newPersonObject)
      .then((updatedPerson) => {
        console.log("updatedPerson", updatedPerson);
        setPersons(
          persons.map((person) => (person.id !== id ? person : updatedPerson))
        );
        setMessage({
          content: `Successfully edited ${updatedPerson.name}`,
          type: "info",
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setMessage({
          content: "Edit failed",
          type: "error",
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const personsToShow =
    search.length > 0
      ? persons.filter(
          (person) =>
            person.name.toLowerCase().includes(search.toLowerCase()) ||
            person.number.includes(search)
        )
      : persons;

  return (
    <div className="App">
      <Typography variant="h2" mb={5}>
        <ContactsIcon color="primary" fontSize="large" />
        Phonebook
      </Typography>
      <Notification message={message} />
      <Filter search={search} handleSearch={handleSearch} />

      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handlePhoneChange={handlePhoneChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        handleRemove={handleRemove}
        handleSaveEdited={handleSaveEdited}
      />
    </div>
  );
}

export default App;
