import React from 'react';
import './BetterMashovLive.css'; // optional: move styles here

const BetterMashovLive = () => {
  return (
    <div className="better-mashov-page">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/ArielBaron/BetterMashovLive"
      >
        <img src="/github.png" alt="github repo" />
      </a>

      <h1>Grades, Behavior and TimeTable Management System</h1>
      <p>
        This project is a website using{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://npm.io/package/mashov-api"
        >
          mashov api
        </a>{' '}
        that allows users to view and sort student grades and behaviors based on various criteria such as date, grade, subject, and teacher.
        <br />
        <br />
        In addition, it allows you to see your current timetable by the day and by subject for each hour.
        <br />
        <br />
        The system provides a user-friendly interface for managing and displaying grades data.
      </p>

      <h1>How To Run</h1>
      <p>
        All you need to do is simply run <code>Server.js</code> using node.
        <br />
        And in addition, in <code>MashovData.json</code> there are all of the steps to get the info needed for login.
      </p>

      <h1>
        I Now Have a Website – Currently only open by request to me (visit the
        Contact page for more info)
      </h1>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://bettermashovlive.onrender.com"
      >
        https://bettermashovlive.onrender.com
      </a>
            {/*TODO get images*/}
      <h1>Some Screenshots (hover to zoom):</h1>
      <div className="img-album">
        {Array.from({ length: 3 }, (_, i) => (
            <img
              key={i}
              src={`/BetterMashovLive${i + 1}.png`}
              className="img-item"
              alt={`Screenshot ${i + 1}`}
            />
          ))}
      </div>
    </div>
  );
};

export default BetterMashovLive;
