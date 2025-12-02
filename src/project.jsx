export default function Project() {
  return (
    <div className="projects-container">
      <h1>My Projects</h1>

      <div className="project-section">
        <img src="/bugGame.png" alt="Bug Smash Game" />
        <div className="project-description">
          <h2>Bug Smash</h2>
          <p>Simple mini game with timer built with C# Windows Forms.</p>
        </div>
      </div>

      <div className="project-section">
        <img src="/scheduleInfo.png" alt="Calendar Info" />
        <img src="/scheduleResult.png" alt="Calendar Result" />
        <div className="project-description">
          <h2>Calendar Application</h2>
          <p>Calendar with customizable features for scheduling and time management.</p>
        </div>
      </div>

      <div className="project-section">
        <img src="/table.png" alt="Dynamic Table" />
        <div className="project-description">
          <h2>Dynamic Table</h2>
          <p>Adjustable dynamic table with sorting and filtering capabilities.</p>
        </div>
      </div>

      <style>{`
        .projects-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .projects-container h1 {
          font-size: 2.5em;
          margin-bottom: 40px;
          color: #333;
          text-align: center;
        }

        .project-section {
          margin-bottom: 50px;
          padding-bottom: 40px;
          border-bottom: 2px solid #e0e0e0;
        }

        .project-section:last-child {
          border-bottom: none;
        }

        .project-section img {
          width: 100%;
          max-width: 800px;
          height: auto;
          border-radius: 8px;
          margin-bottom: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .project-description {
          margin-top: 20px;
        }

        .project-description h2 {
          font-size: 1.8em;
          color: #333;
          margin-bottom: 15px;
        }

        .project-description p {
          font-size: 1.1em;
          color: #666;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .projects-container h1 {
            font-size: 2em;
          }

          .project-description h2 {
            font-size: 1.5em;
          }
        }
      `}</style>
    </div>
  );
}