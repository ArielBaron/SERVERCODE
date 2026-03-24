import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageLayout = ({ title, children }) => {
  const navigate = useNavigate();

  return (
    <div className="page-content">
      <button onClick={() => navigate('/dashboard')} className="back-btn">
        ← Back to Options
      </button>
      <h2 className="page-title">{title}</h2>
      <div className="content-box">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;