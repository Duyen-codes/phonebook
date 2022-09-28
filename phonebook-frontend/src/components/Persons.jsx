import React from "react";
import Person from "./Person";

const Persons = (props) => {
  const { personsToShow, handleRemove, handleSaveEdited } = props;

  return (
    <ul>
      {personsToShow.map((person, index) => (
        <Person
          key={index}
          person={person}
          handleSaveEdited={handleSaveEdited}
          handleRemove={handleRemove}
        />
      ))}
    </ul>
  );
};

export default Persons;
