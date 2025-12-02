export default function Project() {
  const projectsData = [
    {
      title: "Bug Smash",
      description: "Simple mini game with timer. Test your reflexes by smashing bugs before time runs out!",
      images: ["/bugGame.png"],
      tags: ["JavaScript", "Game Dev", "HTML/CSS"]
    },
    {
      title: "Calendar",
      description: "Calendar with customizable features. Manage your schedule with an intuitive interface and flexible options.",
      images: ["/scheduleInfo.png", "/scheduleResult.png"],
      tags: ["JavaScript", "UI/UX", "Scheduling"]
    },
    {
      title: "Dynamic Table",
      description: "Adjustable dynamic table. Create and modify tables on the fly with full customization support.",
      images: ["/table.png"],
      tags: ["JavaScript", "Data Display", "Interactive"]
    }
  ];

  return (
    <div className="projects-container">
      <h1>My Projects</h1>
      <p className="section-intro">A showcase of my work and personal projects</p>

      <div className="projects-grid">
        {projectsData.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-images">
              {project.images.map((img, imgIndex) => (
                <img key={imgIndex} src={img} alt={`${project.title} screenshot ${imgIndex + 1}`} />
              ))}
            </div>
            <div className="project-content">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .projects-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .projects-container h1 {
          font-size: 2.5em;
          margin-bottom: 10px;
          color: #333;
          text-align: center;
        }

        .section-intro {
          font-size: 1.2em;
          color: #666;
          text-align: center;
          margin-bottom: 40px;
        }

        .projects-grid {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .project-card {
          background: white;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .project-images {
          display: flex;
          gap: 10px;
          padding: 20px;
          background: #f9f9f9;
          overflow-x: auto;
        }

        .project-images img {
          width: 100%;
          max-width: 400px;
          height: auto;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
        }

        .project-content {
          padding: 25px;
        }

        .project-content h2 {
          font-size: 1.5em;
          color: #333;
          margin: 0 0 15px 0;
        }

        .project-content p {
          font-size: 1.1em;
          color: #666;
          line-height: 1.6;
          margin: 0 0 20px 0;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag {
          background: #646cff;
          color: white;
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 0.85em;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .projects-container h1 {
            font-size: 2em;
          }

          .project-images {
            flex-direction: column;
            align-items: center;
          }

          .project-images img {
            max-width: 100%;
          }

          .project-content h2 {
            font-size: 1.3em;
          }

          .project-content {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}