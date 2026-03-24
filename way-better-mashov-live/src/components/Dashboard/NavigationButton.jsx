import React from 'react';

const NavigationButton = ({ id, label, color, onClick }) => {
  return (
    <button
      id={id}
      className="s-btn"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default NavigationButton;