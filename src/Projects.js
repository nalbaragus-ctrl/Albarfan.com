import React, { useState, useEffect } from 'react';
import './Projects.css';
import projectsData from './data/Projects.json';

const baseUrl = "https://photos.albarfan.com";

function Projects() {
  const [projects, setProjects]                 = useState([]);
  const [categories, setCategories]             = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    setProjects(projectsData.projects);
    setCategories(projectsData.categories);
    setFilteredProjects(projectsData.projects);
  }, []);

  
  const filterProjects = (category) => {
    setSelectedCategory(category);
    if (category === 'All Projects') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(p => p.category.includes(category))
      );
    }
  };

 
  const getLiveCount = (categoryName) => {
    if (categoryName === 'All Projects') return projects.length;
    return projects.filter(p => p.category.includes(categoryName)).length;
  };

  const countByStatus = (status) =>
    projects.filter(p => p.status === status).length;

  return (
    <div className="projects-page">

      
      <header className="projects-header">
        <a href="/" className="back-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back
        </a>

        <div className="header-content">
          <span className="header-eyebrow">Selected Work</span>
          <h1>My Projects</h1>
          <p className="subtitle">
            A collection of work across web development, community leadership,
            and student advocacy — built and led from the ground up.
          </p>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{projects.length}</div>
              <div className="stat-label">Total Projects</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{countByStatus('Completed')}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{countByStatus('Ongoing')}</div>
              <div className="stat-label">Ongoing</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{projectsData.technologies?.length || 0}</div>
              <div className="stat-label">Technologies</div>
            </div>
          </div>
        </div>
      </header>

     
      <div className="filter-bar">
        <div className="container">
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.name ? 'active' : ''}`}
                onClick={() => filterProjects(category.name)}
              >
                {category.name}
                <span className="category-count">
                  {getLiveCount(category.name)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      
      <main className="projects-main">
        <div className="container">

          <div className="section-header">
            <span className="section-eyebrow">{selectedCategory}</span>
            <span className="project-count">{filteredProjects.length} projects</span>
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project, i) => (
              <div
                key={project.id}
                className="project-card"
                data-category={project.category}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                
                <div className="project-image-container">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image"
                      loading="lazy"
                    />
                  ) : (
                    <div className={`project-image-placeholder type-${project.type}`}>
                      <span className="placeholder-icon">
                        {project.type === 'tech' ? '💻' : '🤝'}
                      </span>
                      <span className="placeholder-category">{project.category}</span>
                    </div>
                  )}

                  <div className="project-overlay">
                    <a
                      href={`/project/${project.id}`}
                      className="view-details-btn"
                      rel="noopener noreferrer"
                    >
                      View Project
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </a>
                  </div>
                </div>

               
                <div className="project-content">

                  <div className="project-badges">
                    <span className={`status-badge status-${project.status.toLowerCase()}`}>
                      {project.status}
                    </span>
                    <span className={`type-badge ${project.type === 'tech' ? 'tech-type' : 'nontech-type'}`}>
                      {project.type === 'tech' ? '💻 Tech' : '🤝 NonTech'}
                    </span>
                    <span className="year-badge">{project.year}</span>
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-role-label">{project.role}</p>
                  <p className="project-description">{project.description}</p>

                  {project.features && (
                    <ul className="features-list">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  )}

                  {project.technologies && (
                    <div className="tech-stack">
                      <div className="tech-tags">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="project-links">
                    <a
                      href={`/project/${project.id}`}
                      className="project-link more-link"
                      rel="noopener noreferrer"
                    >
                     
                      {project.type === 'tech' ? 'Click to View Details' : 'Click to View Project'}
                    </a>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="no-results">
              <p className="no-results-icon">◎</p>
              <h3>No projects found</h3>
              <p>Try selecting a different category.</p>
            </div>
          )}

        </div>
      </main>

      
      <footer className="projects-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <h3>Naufal Albar Agus</h3>
              <p>Digital Marketer · Tech Enthusiast · {projects.length} projects</p>
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

export default Projects;