export default function About() {
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      justifyContent: 'center',
      minHeight: '80vh'
    }}>
      <div style={{
        display: 'flex',
        gap: '40px',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '100%'
      }}>
        <div style={{
          flex: '0 0 300px',
          textAlign: 'center'
        }}>
          <img 
            src="PXL_20241208_033658075.MP.jpg" 
            alt="Profile"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>
        
        <div style={{
          flex: '1',
          minWidth: '300px',
          maxWidth: '600px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '2.5em',
            marginBottom: '10px',
            color: '#333'
          }}>About Me</h1>
          
          <h2 style={{
            fontSize: '1.8em',
            color: '#666',
            marginBottom: '20px'
          }}>Naomi Murai</h2>
          
          <p style={{
            fontSize: '1.2em',
            color: '#555',
            lineHeight: '1.6',
            marginBottom: '20px'
          }}>
            Hi! I'm a student at Centennial College studying Health Informatics Technology.
          </p>
          
          <div>
            <h3 style={{
              fontSize: '1.3em',
              color: '#444',
              marginTop: '25px',
              marginBottom: '10px'
            }}>Background</h3>
            <p style={{
              color: '#666',
              lineHeight: '1.6',
              marginBottom: '10px'
            }}>
              I Have no background in programming but I am eager to learn and grow in this field.
            </p>
          </div>

          <div style={{ marginTop: '30px' }}>
            <a 
              href="/SampleResume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: '#646cff',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '5px',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              View My Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}