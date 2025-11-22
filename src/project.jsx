export default function Project() {
  return (
    <div className="projects-container">
      <h1>My Projects</h1>

      <div className="project-section">
        <img src="/bugGame.png" alt="Project 1" />
        <div className="project-description">
          <h2>Bug Smash</h2>
          <p>Simple mini game with timer.</p>
        </div>
      </div>

      <div className="project-section">
        <img src="/scheduleInfo.png" alt="Project 2/1" />
        <img src="/scheduleResult.png" alt="Project 2/1" />

        <div className="project-description">
          <h2>Calendar</h2>
          <p>Calendar with customizable features.</p>
        </div>
      </div>

      <div className="project-section">
        <img src="/table.png" alt="Project 3" />
        <div className="project-description">
          <h2>Dynamic Table</h2>
          <p>Adjustable dynamic table.</p>
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
          height: auto;
          border-radius: 8px;
          margin-bottom: 20px;
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