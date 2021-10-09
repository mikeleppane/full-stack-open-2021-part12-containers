import React from "react";

const PhonebookFilter = ({ name, onNewFilterChange }) => {
  return (
    <div>
      <form>
        <div>
          filter shown with: <input value={name} onChange={onNewFilterChange} />
        </div>
      </form>
    </div>
  );
};

export default PhonebookFilter;
