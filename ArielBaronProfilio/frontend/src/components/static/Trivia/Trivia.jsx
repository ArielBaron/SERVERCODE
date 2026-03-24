import React, { useState } from 'react';
import './Trivia.css';

const questions = [
  {
    text: "1. What programming langs do I use:",
    options: [
      "PYTHON Java HTML JS",
      "JS HTML CSS PYTHON Node.js MongosseDB Express Puppter React SQL",
      "HTML Scala Java HTML JS CSS",
      "Hebrew Russian Romanian",
    ],
    correctIndex: 1,
  },
  {
    text: "2. Where do I live:",
    options: ["Rehovot", "Tel Aviv", "Moscow", "Berlin"],
    correctIndex: 0,
  },
  {
    text: "3. What's my first project:",
    options: ["BetterMashovLive", "FlashCards", "Calc", "TicTacToe"],
    correctIndex: 2,
  },
  {
    text: "4. What's my rating on chess.com:",
    options: [
      "between 1100 to 1600",
      "between 500 to 1000",
      "100",
      "between 2000 to 3000",
    ],
    correctIndex: 0,
  },
  {
    text: "5. Where do I study:",
    options: ["Ort", "Katzir", "de Shalit", "madaim"],
    correctIndex: 1,
  },
  {
    text: "6. What's my gmail:",
    options: [
      "arielbaron@gmail.com",
      "TheArielOfTheBaronOfTheGreatPlaceForTheFuture@gmail.com",
      "aarieelbbar80@gmail.com",
      "arielbar80@gmail.com",
    ],
    correctIndex: 3,
  },
  {
    text: "7. How many GitHub repos do I currently have:",
    options: ["3-5 repos", "1000+ repos", "18 - 50 repos", "5 - 8 repos"],
    correctIndex: 2,
  },
  {
    text: "8. In what grade am I:",
    options: ["10th grade", "11th grade", "2nd grade", "9th grade"],
    correctIndex: 1,
  },
  {
    text: "9. What two things do I study in school:",
    options: [
      "Websites and functional programming",
      "Databases and backend",
      "Math and literature",
      "Websites and object-oriented programming (Java)",
    ],
    correctIndex: 3,
  },
  {
    text: "10. What's my biggest project out of the four on this site (by number of files):",
    options: ["BetterMashovLive", "FlashCards", "Calc", "TicTacToe"],
    correctIndex: 0,
  },
];

export default function Trivia() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (qIdx, value) => {
    const updated = [...answers];
    updated[qIdx] = parseInt(value);
    setAnswers(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers(Array(questions.length).fill(null));
    setSubmitted(false);
  };

  const score = answers.reduce(
    (acc, val, i) => val === questions[i].correctIndex ? acc + 1 : acc,
    0
  );

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((q, i) => (
        <div key={i}>
          <h1>{q.text}</h1>
          {q.options.map((option, j) => (
            <div key={j}>
              <input
                required
                type="radio"
                name={`q${i}`}
                value={j}
                checked={answers[i] === j}
                onChange={(e) => handleChange(i, e.target.value)}
              />
              <label>{option}</label>
            </div>
          ))}
          {submitted && (
            <div style={{ color: answers[i] === q.correctIndex ? 'green' : 'red' }}>
              {answers[i] === q.correctIndex ? '✅ Correct' : '❌ Incorrect'}
            </div>
          )}
        </div>
      ))}

      <div className="result-box">
        <h2 className="result-title">
          {submitted ? (
            <>
              Your Grade: <span className="result-score">{score}</span> / 10
            </>
          ) : (
            'Here Will be your Result'
          )}
        </h2>
        <p className="result-message">
          {submitted &&
            (score < 10
              ? 'Excellent effort! Review your mistakes and aim for perfection next time.'
              : 'Great job! you got every question correct.')}
        </p>
      </div>

      <input type="submit" value="Submit" />
      <input type="button" value="Reset" onClick={handleReset} />
    </form>
  );
}
