import React from 'react';

const FactBox = ({ fact }) => {
  return (
    <div className="fact-box">
      <p>{fact.text}</p>
    </div>
  );
};

export default FactBox;
