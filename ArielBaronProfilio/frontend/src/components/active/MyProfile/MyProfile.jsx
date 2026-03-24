import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext.jsx';

export default function MyProfile() {
  const { user } = useUser();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log(user.email)
  useEffect(() => {
    fetch(`${apiUrl}/projects/`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .finally(() => setLoading(false));
  }, []);

  return (
   <div className="projects-container">
      <h1>Here are your projects:</h1>


      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="projects-grid">
          {projects.map(p => (
            <div key={p.email + p.projName} className="project-card">
              <h2>{p.projName}</h2>
              <p><strong>Language:</strong> {p.progLang}</p>
              <p><strong>Region:</strong> {p.region}</p>
              <p><strong>Description:</strong> {p.description || 'No description'}</p>
              <p><strong>Contributors:</strong> {p.contributors || 'N/A'}</p>
              <p><strong>Preferences:</strong> {[
                p.wantDesign && 'Design',
                p.wantServerHosting && 'Hosting',
                p.wantMarketing && 'Marketing',
                p.wantCodeCleanup && 'Cleanup'
              ].filter(Boolean).join(', ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>  )
}
