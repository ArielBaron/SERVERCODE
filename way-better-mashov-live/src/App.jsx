import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HorizontalNavbar from './components/HorizontalNavbar/HorizontalNavbar';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import About from './components/About/About';
import Dashboard from './components/Dashboard/Dashboard';
import Logout from './components/Logout/Logout';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Define navbar links depending on login state
  const navTags = isLoggedIn
    ? { Home: '/', Dashboard: '/dashboard', About: '/about', Logout: '/logout' }
    : { Home: '/', About: '/about', Login: '/login' };

  return (
    <Router basename="/mashov"> {/* important for SPA under /mashov */}
      <div>
        <HorizontalNavbar tags={navTags} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
        <footer>
          <p>&copy; Ariel Baron 2024 eduSphere. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
