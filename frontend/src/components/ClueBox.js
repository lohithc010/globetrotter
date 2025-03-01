import React from 'react';

const ClueBox = ({ clues }) => {
  return (
    <div className="mb-20">
      <h2 className="subheading">Clues:</h2>
      {clues.map((clue) => (
        <div key={clue.id} className="clue-box">
          <p>{clue.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ClueBox;
