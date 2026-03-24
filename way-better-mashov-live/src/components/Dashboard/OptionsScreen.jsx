import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationButton from './NavigationButton';

const OptionsScreen = () => {
  const navigate = useNavigate();

  const buttons = [
    {
      id: 'Grade-T-Btn',
      label: 'לוח ציונים',
      color: 'rgb(96, 168, 115)',
      path: '/dashboard/grades'
    },

    {
      id: 'T-T-Btn',
      label: 'מערכת שעות',
      color: 'red',
      path: '/dashboard/timetable'
    },
    {
      id: 'B-Btn',
      label: 'הערות התנהגות',
      color: 'rgb(168, 74, 149)',
      path: '/dashboard/behavior'
    }
  ];

  return (
    <div id="Options-Screen">
      <h1>Hello, you're in the system. Please pick your desired page:</h1>
      
      <div className="buttons-container">
        {buttons.map((button) => (
          <NavigationButton
            key={button.id}
            id={button.id}
            label={button.label}
            color={button.color}
            onClick={() => navigate(button.path)}
          />
        ))}
      </div>
    </div>
  );
};

export default OptionsScreen;