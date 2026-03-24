import React from 'react';
import './CalcApp.css'; // make sure to create and include this file

export default function CalcApp(){
  return (
    <div className="calc-app">
      <a target="_blank" rel="noopener noreferrer" href="https://github.com/ArielBaron/Calc">
        <img src="/github.png" alt="github repo" />
      </a>

      <div>
        <h1>Calculator Project (My first project!)</h1>
        <p>
          This project implements a basic calculator using HTML, CSS, and JavaScript.
          The calculator supports standard arithmetic operations, advanced mathematical
          functions, and a responsive user interface.
        </p>

        <h2>This Just in: a working 24 hour based clock!</h2>

        <h2>Features</h2>
        <ul>
          <li>Basic arithmetic operations: addition, subtraction, multiplication, and division.</li>
          <li>Advanced functions: logarithms, trigonometric functions (sin, cos, tan), square root, and power.</li>
          <li>Special constants: π (pi) and e (Euler's number).</li>
          <li>Error handling for invalid expressions.</li>
          <li>Dynamic display of the current system time in the header.</li>
        </ul>

        <h2>How It Works</h2>
        <ol>
          <li>The user clicks buttons to input numbers and operations, which are displayed dynamically in the equation area.</li>
          <li>The <strong>"="</strong> button evaluates the entered expression using JavaScript's <code>eval()</code> function.</li>
          <li>Special symbols (e.g., π and √) are converted into JavaScript-compatible syntax before evaluation.</li>
          <li>Errors during evaluation are caught, and the user is informed with a "Syntax Error" message.</li>
          <li>The <strong>"C"</strong> button clears the equation area for new input.</li>
        </ol>

        <h2>How to Run</h2>
        <ol>
          <li>Download all the project files and save them in the same directory.</li>
          <li>Open the <strong>index.html</strong> file in a web browser.</li>
          <li>Use the on-screen buttons to input equations and calculate results.</li>
        </ol>

        <h2>Example Usage</h2>
        <p>To calculate <strong>sin(π/2)</strong>:</p>
        <ol>
          <li>Click <strong>sin</strong>, then <strong>π</strong>, then <strong>÷</strong>, and finally <strong>2</strong>.</li>
          <li>Press <strong>=</strong> to display the result.</li>
        </ol>

        <h2>Demo:</h2>
        <div className="iframe-container">
          <iframe src="https://arielbaron.github.io/Calc/" title="Calculator Demo" />
        </div>
      </div>
    </div>
  );
};

