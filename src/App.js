import React from 'react';
import './App.css';

const baseUrl = "https://photos.albarfan.com";
const PHOTO = `${baseUrl}/Hero/albar.PNG`;

function App() {
  return (
    <div className="App">

      <div className="glow glow-top" aria-hidden="true" />
      <div className="glow glow-right" aria-hidden="true" />

      <div className="hero">

        <div className="hero-left">
          <span className="eyebrow">Portfolio</span>
          <h1 className="name">Naufal Albar Agus</h1>
          <p className="job-title">Digital Marketer & Tech Enthusiast</p>
          <p className="description">
            Bridging marketing and programming to build products that make sense for users.
            From live streaming to landing pages, I've learned that the best solutions come 
            from understanding both sides of the story.
          </p>
          <div className="hero-rule" />
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">5+</span>
              <span className="hero-stat-label">Years Experience</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">4</span>
              <span className="hero-stat-label">Projects</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">3</span>
              <span className="hero-stat-label">Industries</span>
            </div>
          </div>
          <div className="buttons-container">
            <a href="/work-experience" className="nav-button">
              <div className="nav-button-top">
              </div>
              <div className="nav-button-bottom">
                <span className="button-text">Experience</span>
              </div>
            </a>
            <a href="/projects" className="nav-button">
              <div className="nav-button-top">
              </div>
              <div className="nav-button-bottom">
                <span className="button-text">Projects</span>
              </div>
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="photo-wrap">
            <img src={PHOTO} alt="Naufal Albar Agus" className="photo-img" />
            <div className="photo-badge">
            </div>
          </div>
        </div>

      </div>

      <footer className="projects-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <h3>Naufal Albar Agus</h3>
              <p>Digital Marketer · Tech Enthusiast</p>
            </div>
            <div className="footer-links">
              <a href="mailto:nalbaragus@gmail.com" className="footer-link">
                <img src={`${baseUrl}/Logos/logos-gmail.svg`} alt="Email" className="footer-icon" />
                <span>Gmail</span>
              </a>
              <a href="https://www.linkedin.com/in/naufal-albar-agus-48a116382/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BKKA4%2FOBgTkSUf7MFAdc29Q%3D%3D" className="footer-link">
                <img src={`${baseUrl}/Logos/logos--linkedin.svg`} alt="LinkedIn" className="footer-icon" />
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/nalbaragus-ctrl" className="footer-link">
                <img src={`${baseUrl}/Logos/logos--github.svg`} alt="GitHub" className="footer-icon" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
          <p className="copyright">
            © {new Date().getFullYear()} Naufal Albar Agus
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;