export default function Services() {
  const servicesData = [
    {
      title: "SQL & Database Management",
      icon: "🗄️",
      description: "Database design, query optimization, and data management using SQL. Experience with relational databases and data integrity."
    },
    {
      title: "General Programming",
      icon: "💻",
      description: "Proficient in multiple programming languages with strong problem-solving skills. Focus on writing clean, maintainable code."
    },
    {
      title: "App Development",
      icon: "📱",
      description: "Building responsive web and mobile applications. Experience with modern frameworks and user-centered design principles."
    }
  ];

  return (
    <div className="services-container">
      <h1>Services</h1>
      <p className="section-intro">Skills and expertise I can offer</p>

      <div className="services-grid">
        {servicesData.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

      <style>{`
        .services-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .services-container h1 {
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

        .services-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 25px;
          justify-content: center;
        }

        .service-card {
          background: white;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          padding: 30px;
          flex: 1 1 250px;
          max-width: 300px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .service-icon {
          font-size: 3em;
          margin-bottom: 15px;
        }

        .service-card h2 {
          font-size: 1.3em;
          color: #333;
          margin-bottom: 15px;
        }

        .service-card p {
          font-size: 1em;
          color: #666;
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 768px) {
          .services-container h1 {
            font-size: 2em;
          }

          .service-card {
            flex: 1 1 100%;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}