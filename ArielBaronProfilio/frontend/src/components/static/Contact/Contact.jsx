import React from 'react';
import './Contact.css'; // optional: move the CSS styles here

export default function Contact() {
  const handleSendEmail = () => {
    window.open(
      'https://mail.google.com/mail/?view=cm&fs=1&to=arielbar80@gmail.com&su=Hello&body=Hi%20Ariel!%20Looking%20forward%20to%20hearing%20from%20you!',
      '_blank'
    );
  };

  return (
    <div>
      <h1>Contact info:</h1>
      <p>
        For coding stuff contact me at my{' '}
        <a href="https://github.com/ArielBaron" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <br />
        For personal messages contact me at my Gmail: (arielbar80@gmail.com)
      </p>
      <button onClick={handleSendEmail}>Send Email From Gmail</button>
      <br />
      <a href="/Register">Register</a>
      <br />
      <a href="/AddItem">Add your project</a>

      <h1>"Social media":</h1>

      <div className="img-album">
        <a href="https://lichess.org/@/arielbargmailcom" target="_blank" rel="noopener noreferrer">
          <img src="/lichess.svg" alt="lichess" className="img-item" />
        </a>

        <a 
          href="https://www.youtube.com/channel/UCHYDuGbBe7ag407IhRq0Sog"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/youtube.png" alt="youtube" className="img-item" />
        </a>

        <a href="https://www.chess.com/member/gmapksjfohgu" target="_blank" rel="noopener noreferrer">
          <img src="/chesscom.png" alt="chess.com" className="img-item" />
        </a>

        <a
          href="https://www.chess.org.il/Players/Player.aspx?Id=206245"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/ischess.png" alt="ischess" className="img-item" />
        </a>
      </div>
    </div>
  );
}
