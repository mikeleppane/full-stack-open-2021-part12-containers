import React from "react";

const PersonForm = ({
  onSubmitHandler,
  name,
  handleNewPersonChange,
  number,
  handleNewNumberChange,
}) => {
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div>
          name: <input value={name} onChange={handleNewPersonChange} />
        </div>
        <div>
          number: <input value={number} onChange={handleNewNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
