import React from "react";
import Button from "./Button";

const filterPersons = (persons, filter) => {
  return persons
    .filter(
      (person) =>
        person.name.toLowerCase().includes(filter.toLowerCase()) ||
        person.number.toLowerCase().includes(filter.toLowerCase())
    )
    .map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    ));
};

const ShowPersons = ({ persons, filter, onDeleteHandler }) => {
  return (
    <div>
      {filter ? (
        <div>{filterPersons(persons, filter)}</div>
      ) : (
        <div>
          {persons.map((person) => (
            <div key={person.name}>
              <p>
                {person.name} {person.number}
                <Button
                  text={"delete"}
                  onButtonClick={() => onDeleteHandler(person)}
                />
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowPersons;
