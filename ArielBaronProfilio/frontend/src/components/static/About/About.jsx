import React from 'react';

export default function About(){
  return (
    <div>
      <h2>About This Project</h2>
    
      <p>
        This website serves as my personal portfolio, showcasing my projects,
        skills, and experience in web development. It was built using
        <strong>ASP.NET WebForms</strong>, with styling implemented through
        <strong>CSS</strong> and additional interactivity provided by
        <strong>JavaScript</strong>.
      </p>

      <h3>Purpose</h3>

      <p>
        The main purpose of this portfolio is to provide a centralized platform
        for presenting my technical expertise, sharing my completed projects,
        and offering an accessible way for others to learn more about my work
        and accomplishments. Each project is accompanied by its source code,
        which is hosted on my
        <a
          href="https://github.com/ArielBaron"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub repositories
        </a>
        . You can find links to the corresponding repositories in the respective
        tabs of the site.
      </p>

      <h3>Technologies Used</h3>

      <p>During the development of this site, I utilized the following technologies and tools:</p>

      <ul>
        <li>
          <strong>ASP.NET WebForms:</strong> To structure the web application and
          manage server-side operations.
        </li>
        <li>
          <strong>CSS:</strong> For creating responsive and visually appealing
          layouts.
        </li>
        <li>
          <strong>JavaScript:</strong> To add dynamic functionality and improve
          user experience.
        </li>
        <li>
          <strong>GitHub:</strong> As a version control system and a hosting
          platform for my project repositories.
        </li>
      </ul>

      <h3>Development Process</h3>

      <p>The development process involved several key stages:</p>

      <ol>
        <li>
          <strong>Planning:</strong> Defined the structure of the portfolio and
          identified key features to implement.
        </li>
        <li>
          <strong>Design:</strong> Created the user interface with a focus on
          simplicity and responsiveness.
        </li>
        <li>
          <strong>Integration:</strong> Linked each tab to a specific GitHub
          repository to provide easy access to the source code.
        </li>
      </ol>

      <h3>Features</h3>

      <p>Key features of this portfolio include:</p>

      <ul>
        <li>Separate tabs for each project with direct links to their GitHub repositories.</li>
        <li>A trivia quiz including 10 questions.</li>
      </ul>

      <h3>Conclusion</h3>

      <p>
        This portfolio website not only serves as a professional showcase of my
        work but also reflects my proficiency in using WebForms, CSS, JavaScript,
        and ASP.NET. By linking each project to its respective GitHub repository,
        I aim to maintain transparency and encourage others to explore my code in
        detail.
      </p>
    </div>
  );
};

