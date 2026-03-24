import React from 'react';
import './Home.css'; // styles are moved into a CSS file

const Home = () => {
  return (
    <div className="profile-container">
      <div className="profile-picture">
        <img src="/PersonalPicture.png" alt="Your Profile Picture" />
      </div>
      <div className="profile-details">
        <h1>Ariel Baron</h1>
        <p><strong>About Me:</strong></p>
        <p>
          I am a passionate developer skilled in a variety of programming languages and
          technologies. I enjoy building web applications and solving challenging problems.
          I am located in Rehovot, Israel. Here’s more about me:
        </p>

        <h2>Technical Skills</h2>
        <p>I have hands-on experience with the following technologies:</p>
        <ul>
          <li><strong>Frontend:</strong> HTML, CSS, JavaScript, React</li>
          <li><strong>Backend:</strong> Node.js, Express</li>
          <li><strong>Databases:</strong> Mongoose, MongoDB</li>
          <li><strong>Other Languages:</strong> Python, Java</li>
        </ul>

        <h2>Hobbies and Interests</h2>
        <p>
          In addition to coding, I am an avid chess player. I compete in in-person chess
          tournaments and love strategizing both on and off the board.
        </p>
        <p>
          You can view my chess profile for detailed statistics and achievements: <br></br>&nbsp;
          <a
            href="https://www.chess.org.il/Players/Player.aspx?Id=206245"
            target="_blank"
            rel="noopener noreferrer"
          >
            My Chess Profile
          </a>
        </p>
      </div>
    </div>
  );
};

export default Home;
