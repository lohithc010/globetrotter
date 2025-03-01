import React from 'react';

const OptionButton = ({ option, onSelect, isDisabled }) => {
  return (
    <button 
      className={`button ${isDisabled ? 'disabled' : ''}`} 
      onClick={() => onSelect(option)}
      disabled={isDisabled}
    >
      {option.name}
    </button>
  );
};

export default OptionButton;
