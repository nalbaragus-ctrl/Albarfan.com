import React, { useEffect, useRef } from 'react';
import './WorkExperience.css';
import workexperienceData  from './data/WorkExperience.json';

const baseUrl = "https://photos.albarfan.com";

function WorkExperience() {
  const itemsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    itemsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const experiences = workexperienceData.experiences;

  return (
    <div className="we-page">

      <header className="we-header">
        <a href="/" className="we-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </a>

        <div className="we-header-body">
          <span className="we-eyebrow">Career History</span>
          <h1 className="we-title">Work Experience</h1>
          <p className="we-subtitle">
            From retail floors to worldwide E-commerce stages — a journey through
            sales, marketing, and the slow pull toward building things.
          </p>

          <div className="we-stats">
            <div className="we-stat">
              <span className="we-stat-num">{experiences.length}</span>
              <span className="we-stat-label">Roles</span>
            </div>
            <div className="we-stat">
              <span className="we-stat-num">5+</span>
              <span className="we-stat-label">Years</span>
            </div>
            <div className="we-stat">
              <span className="we-stat-num">3</span>
              <span className="we-stat-label">Industries</span>
            </div>
          </div>
        </div>
      </header>

      <main className="we-main">
        <div className="we-timeline">

          <div className="we-spine" />

          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              className="we-item reveal"
              ref={(el) => (itemsRef.current[i] = el)}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="we-dot" />

              <div className="we-year">{exp.year}</div>

              <div className="we-card">
                <div className="we-card-header">
                  <div>
                    <h2 className="we-role">{exp.title}</h2>
                    <div className="we-company">
                      <span className="we-company-name">{exp.company}</span>
                      <span className="we-type-badge">{exp.type}</span>
                    </div>
                  </div>
                </div>

                <p className="we-desc">{exp.description}</p>

                {exp.highlights.length > 0 && (
                  <ul className="we-highlights">
                    {exp.highlights.map((h, hi) => (
                      <li key={hi}>{h}</li>
                    ))}
                  </ul>
                )}

                <a href={`/work/${exp.id}`} className="work-details-link">
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

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

export default WorkExperience;