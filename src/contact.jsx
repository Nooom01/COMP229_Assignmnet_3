export default function Contact() {
  return (
    <div className="contact-container">
      <h1>Contact Me</h1>
      <p className="contact-intro">Feel free to reach out to me!</p>

      <div className="contact-panel">
        <div className="contact-item">
          <strong>Email:</strong>
          <a href="">annur710@example.com</a>
        </div>

        <div className="contact-item">
          <strong>Phone:</strong>
          <span>+1 (123) 456-7890</span>
        </div>

        <div className="contact-item">
          <strong>LinkedIn:</strong>
          <a href="" target="_blank" rel="noopener noreferrer">
            linkedin.com
          </a>
        </div>

        <div className="contact-item">
          <strong>GitHub:</strong>
          <a href="" target="_blank" rel="noopener noreferrer">
            github.com
          </a>
        </div>
      </div>

      <h2 className="form-title">Send me a message!</h2>

      <form className="contact-form">
        <input type="text" placeholder="First Name" required />
        <input type="text" placeholder="Last Name" required />
        <input type="email" placeholder="Email" required />
        <textarea placeholder="Message" rows="5" required></textarea>
        <button type="submit">Submit</button>
      </form>

      <style>{`
        .contact-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .contact-container h1 {
          font-size: 2.5em;
          margin-bottom: 20px;
          color: #333;
        }

        .contact-intro {
          font-size: 1.2em;
          color: #666;
          margin-bottom: 40px;
          text-align: center;
        }

        .contact-panel {
          background: white;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .contact-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 20px 0;
          border-bottom: 1px solid #e0e0e0;
        }

        .contact-item:last-child {
          border-bottom: none;
        }

        .contact-item strong {
          color: #333;
          font-size: 1.1em;
        }

        .contact-item a {
          color: #646cff;
          text-decoration: none;
          transition: color 0.3s;
        }

        .contact-item a:hover {
          color: #535bf2;
          text-decoration: underline;
        }

        .contact-item span {
          color: #666;
        }

        .form-title {
          margin-top: 60px;
          text-align: center;
          font-size: 1.8em;
          color: #333;
          margin-bottom: 20px;
        }

        .contact-form {
          margin-top: 50px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .contact-form input,
        .contact-form textarea {
          padding: 10px;
          font-size: 1em;
          border: 1px solid #ccc;
          font-family: inherit;
        }

        .contact-form textarea {
          resize: vertical;
        }

        .contact-form button {
          padding: 10px;
          font-size: 1em;
          background: #333;
          color: white;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }

        .contact-form button:hover {
          background: #555;
        }

        @media (max-width: 768px) {
          .contact-container h1 {
            font-size: 2em;
          }

          .contact-panel {
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  );
}
