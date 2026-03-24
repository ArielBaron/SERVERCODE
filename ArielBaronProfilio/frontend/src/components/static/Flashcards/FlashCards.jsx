import React from 'react';
import './FlashCards.css';

const FlashCards = () => {
  return (
    <div className="flashcards-page">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/ArielBaron/Train-for-Test-using-traning-cards"
      >
        <img src="/github.png" alt="github repo" />
      </a>

      <h1>Welcome to Train for Test using Flashcards</h1>

      <h2>What is this project?</h2>
      <p>
        The "Train for Test using Flashcards" project provides a platform where users can create, edit, and use flashcards
        to enhance their learning and retention. It is implemented using HTML, JavaScript, and CSS to provide a responsive and
        interactive interface.
      </p>

      <h2>How It Works</h2>
      <p>
        The flashcards application allows users to input data, practice their knowledge, and track progress.
        Here's a basic workflow:
      </p>
      <ul>
        <li>The application reads user-provided flashcard data (questions and answers).</li>
        <li>Flashcards are displayed one at a time, allowing users to guess the answer before revealing it.</li>
        <li>Users can mark their responses as correct or incorrect, and their performance is tracked.</li>
      </ul>

      <div id="vid-div">
        <h1>A video demo:</h1>
        <video controls>
          <source src="/FlashCardsPracVid.mp4" type="video/mp4" />
        </video>
      </div>

      <h2>How to Input Data</h2>
      <p>To create your own flashcards, follow these steps:</p>
      <ol>
        <li>
          Prepare key and pair values like so:
          <br />
          <code>
            branch: ענף,<br />
            calculate: לחשב,<br />
            coin: מטבע,<br />
          </code>
        </li>
        <li>Enter through text:</li>
        <li>Enter a .json or .txt file</li>
      </ol>

      <h2>Key Features</h2>
      <ul>
        <li>Create custom flashcards for any topic or subject.</li>
        <li>Practice using an intuitive interface to test your knowledge.</li>
        <li>Save and reuse flashcards for ongoing study.</li>
        <li>Track your progress to identify strengths and weaknesses.</li>
      </ul>

      <h2>How to Get Started</h2>
      <ol>
        <li>
          Visit the GitHub repository:{' '}
          <a
            href="https://github.com/ArielBaron/Train-for-Test-using-traning-cards"
            target="_blank"
            rel="noopener noreferrer"
          >
            Train for Test using Flashcards
          </a>
        </li>
        <li>
          Try it live:{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://arielbaron.github.io/Train-for-Test-using-traning-cards/"
          >
            arielbaron.github.io/Train-for-Test-using-traning-cards
          </a>
        </li>
      </ol>
    </div>
  );
};

export default FlashCards;
