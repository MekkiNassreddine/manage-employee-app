import React, { useState } from 'react';
import "./datatable.scss";

const RadioFilter = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <div className="buttonTools">
         <div className='linkTools'>
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={handleOptionChange}
          />
          {option.label}
        </label>
      ))}
    </div>
    </div>
  
  );
};

export default RadioFilter;