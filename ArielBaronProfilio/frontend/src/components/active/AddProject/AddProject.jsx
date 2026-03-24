import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import './AddProject.css';

export default function AddProject() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: user?.user_email || '',
    progLang: '',
    projName: '',
    description: '',
    region: '',
    contributors: 1,
    diffcultyRange: 1,
    wantDesign: false,
    wantServerHosting: false,
    wantMarketing: false,
    wantCodeCleanup: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!user) {
      setError('You must be logged in to add a project');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/projects/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer "+localStorage.getItem("token") },
        body: JSON.stringify({
          ...form,
          wantDesign: form.wantDesign ? 1 : 0,
          wantServerHosting: form.wantServerHosting ? 1 : 0,
          wantMarketing: form.wantMarketing ? 1 : 0,
          wantCodeCleanup: form.wantCodeCleanup ? 1 : 0,
          contributors: Number(form.contributors),
          diffcultyRange: Number(form.diffcultyRange)
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data);

      navigate('/'); // go back to projects page on success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-project-container">
      <h1>Add New Project</h1>
      {error && <p className="error">{error}</p>}
      <form className="add-project-form" onSubmit={handleSubmit}>
        {/* email field is disabled */}
        <input type="email" name="email" value={user?.user_email || ''} disabled />

        <input type="text" name="progLang" placeholder="Programming Language" value={form.progLang} onChange={handleChange} required />
        <input type="text" name="projName" placeholder="Project Name" value={form.projName} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input type="text" name="region" placeholder="Region" value={form.region} onChange={handleChange} required />
        <input type="number" name="contributors" placeholder="Contributors" value={form.contributors} onChange={handleChange} min="1" />
        <input type="number" name="diffcultyRange" placeholder="Difficulty (1-5)" value={form.diffcultyRange} onChange={handleChange} min="1" max="5" />
        
        <div className="checkbox-group">
          <label><input type="checkbox" name="wantDesign" checked={form.wantDesign} onChange={handleChange} /> Design</label>
          <label><input type="checkbox" name="wantServerHosting" checked={form.wantServerHosting} onChange={handleChange} /> Hosting</label>
          <label><input type="checkbox" name="wantMarketing" checked={form.wantMarketing} onChange={handleChange} /> Marketing</label>
          <label><input type="checkbox" name="wantCodeCleanup" checked={form.wantCodeCleanup} onChange={handleChange} /> Cleanup</label>
        </div>

        <button type="submit" disabled={loading || !user}>{loading ? 'Adding...' : 'Add Project'}</button>
      </form>
    </div>
  );
}
