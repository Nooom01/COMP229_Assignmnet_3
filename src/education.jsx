export default function Education() {
  const educationData = [
    {
      school: "Centennial College",
      period: "2025 - Present",
      degree: "Health Informatics Technology",
      description: "Currently pursuing studies in Health Informatics Technology, focusing on healthcare data management and technology solutions."
    },
    {
      school: "International Christian University",
      period: "2016 - 2022",
      degree: "Bachelor's Degree",
      description: "Completed undergraduate studies with a focus on interdisciplinary learning and global perspectives."
    },
    {
      school: "Gyeongnam International Foreign School",
      period: "2011 - 2016",
      degree: "High School Diploma",
      description: "Completed secondary education in an international environment with a diverse curriculum."
    }
  ];

  return (
    <div className="education-container">
      <h1>Education</h1>
      <p className="section-intro">My academic journey and qualifications</p>

      {educationData.map((item, index) => (
        <div key={index} className="education-card">
          <div className="education-header">
            <h2>{item.school}</h2>
            <span className="period">{item.period}</span>
          </div>
          <h3 className="degree">{item.degree}</h3>
          <p className="description">{item.description}</p>
        </div>
      ))}

      <style>{`
        .education-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .education-container h1 {
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

        .education-card {
          background: white;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          padding: 30px;
          margin-bottom: 25px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .education-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .education-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 10px;
        }

        .education-header h2 {
          font-size: 1.5em;
          color: #333;
          margin: 0;
        }

        .period {
          background: #646cff;
          color: white;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.9em;
          font-weight: 500;
        }

        .degree {
          font-size: 1.2em;
          color: #646cff;
          margin: 10px 0;
        }

        .description {
          font-size: 1.1em;
          color: #666;
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 768px) {
          .education-container h1 {
            font-size: 2em;
          }

          .education-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .education-header h2 {
            font-size: 1.3em;
          }

          .education-card {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}