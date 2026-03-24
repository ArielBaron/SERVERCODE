import React, { useState } from 'react';
import './App.css';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import About from './components/static/About/About';
import BetterMashovLive from './components/static/BetterMashovLive/BetterMashovLive';
import CalcApp from './components/static/CalcApp/CalcApp';
import FlashCards from './components/static/Flashcards/FlashCards';
import Home from './components/static/Home/Home';
import Trivia from './components/static/Trivia/Trivia';
import Contact from './components/static/Contact/Contact';

import Login from './components/active/Login/Login';
import Register from './components/active/Register/Register';
import Logout from './components/active/Logout/Logout.jsx';

import { useUser } from './context/UserContext.jsx';

import Projects from './components/active/Projects/Projects.jsx';
import AddProject from './components/active/AddProject/AddProject.jsx';
import MyProfile from './components/active/MyProfile/MyProfile.jsx';




const App = () => {
  const { user } = useUser();
  const [mode, setMode] = useState("portfolio"); // "portfolio" | "projects"
  const navigate = useNavigate();

  const handleToggle = () => {
    if (mode === "portfolio") {
      setMode("projects");
      navigate("/projects");
    } else {
      setMode("portfolio");
      navigate("/home");
    }
  };

  return (
    <>
      <nav className="topnav" aria-label="Primary Navigation">
        <a
          href="https://github.com/ArielBaron"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
        >
          <img src="/github.png" alt="GitHub Logo" />
        </a>

        {/* Toggle switch with labels */}
        <div className="mode-switch">
          <span className={mode === "portfolio" ? "active-label" : ""}>
            Portfolio
          </span>
          <label className="switch">
            <input
              type="checkbox"
              checked={mode === "projects"}
              onChange={handleToggle}
            />
            <span className="slider round"></span>
          </label>
          <span className={mode === "projects" ? "active-label" : ""}>
            User-Projects
          </span>
        </div>
        <div>
          {mode === "portfolio" ? (
            <>
              <Link to="/home">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/trivia">Trivia</Link>
            </>
          ) : (
            <>
              <Link to="/projects">1234567891234</Link>
              <Link>12345678912345678</Link>
              {/* More public project routes later */}
            </>
          )}
        </div>

        <div>
          <span>
            Welcome, <u><strong>{user ? user.user_name : 'Guest'}</strong></u>.
          </span>
          {!user && <Link to="/login">Login?</Link>}
          {!user && <Link to="/register">Register</Link>}
          {user && <Link to="/logout">Logout?</Link>}
        </div>
      </nav>

      {mode === "portfolio" && (
        <ul className="leftnav" role="navigation" aria-label="Project Navigation">
          <li>My favorite projects:</li>
          <li><Link to="/calcapp">Calc</Link></li>
          <li><Link to="/bettermashovlive">BetterMahovLive</Link></li>
          <li><Link to="/flashcards">FlashCards</Link></li>
          <li><Link to="/tictactoeinjava">TicTacToe in Java</Link></li>
          <li><Link to="/leaderboards">Best ever Trivia record</Link></li>

          <li>My other projects (unfinished, direct links):</li>
          <li>
            <a href="https://github.com/ArielBaron/leetcodeAnswers" target="_blank" rel="noopener noreferrer">
              LeetCode answers
            </a>
          </li>
          <li>
            <a href="https://github.com/ArielBaron/chess.com-with-keyboard" target="_blank" rel="noopener noreferrer">
              Chess.com keyboard script
            </a>
          </li>
          <li>
            <a href="https://github.com/ArielBaron/MarketPlace" target="_blank" rel="noopener noreferrer">
              MarketPlace (low quality code)
            </a>
          </li>
        </ul>
      )}
      {mode == "projects" && (
        <ul className="leftnav" role="navigation" aria-label="Project Navigation">
          <li>Quick Actions:</li>
          <li><Link to="/projects">Serch for a project</Link></li>
          <></>
          {user ?
            <>
              <li><Link to="/me">Profile and personal projects</Link></li>
              <li><Link to="/add">Add an project</Link></li>
            </> : <></>
            }

        </ul>
      )}


      <main>
        <Routes>
          {/* Portfolio routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/trivia" element={<Trivia />} />
          <Route path="/bettermashovlive" element={<BetterMashovLive />} />
          <Route path="/calcapp" element={<CalcApp />} />
          <Route path="/flashcards" element={<FlashCards />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/logout' element={<Logout />} />

          {/* Public Projects mode */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/add" element={<AddProject />} />
          <Route path='/me' element={<MyProfile />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <footer>
        <p>&copy; 2024 Ariel Baron. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default App;
