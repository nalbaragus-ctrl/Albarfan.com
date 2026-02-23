import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProjectDetail.css';
import projectsData from '../data/Projects.json';
import projectDetailsData from '../data/ProjectDetails.json';
import MediaGallery from './MediaGallery';

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [projectDetails, setProjectDetails] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const numId = parseInt(id);
    const foundProject = projectsData.projects.find(p => p.id === numId);
    setProject(foundProject);
    const details = projectDetailsData[String(numId)] || {};
    setProjectDetails(details);
  }, [id]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setActiveImage(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  if (!project) {
    return <div className="loading">Loading…</div>;
  }

  const baseUrl = 'https://photos.albarfan.com';

  const galleryImages = projectDetails?.gallery
    ? {
        hero: `${baseUrl}/${projectDetails.gallery.folder}/${projectDetails.gallery.images.hero}`,
        services: `${baseUrl}/${projectDetails.gallery.folder}/${projectDetails.gallery.images.services}`,
        contact: `${baseUrl}/${projectDetails.gallery.folder}/${projectDetails.gallery.images.contact}`,
        footer: `${baseUrl}/${projectDetails.gallery.folder}/${projectDetails.gallery.images.footer}`,
      }
    : null;

  return (
    <div className="project-detail">
      <div className="back-link-wrap">
        <a href="/projects" className="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back to Projects
        </a>
      </div>

      
      {project.id === 1 ? (
        <>
          {projectDetails?.showDisclaimer && (
            <div className="disclaimer-wrap">
              <div className="disclaimer">
                <span className="disclaimer-icon">⚠️</span>
                <p>{projectDetails.disclaimerText}</p>
              </div>
            </div>
          )}

          <div className="project-header">
            <span className="project-eyebrow">{project.category} · {project.year}</span>
            <h1>{project.title}</h1>
            <p className="project-role">{project.role || 'Project'}</p>
          </div>

          {galleryImages && (
            <div className="exact-gallery">
              <div className="gallery-row">
                <div className="gallery-item hero-item" onClick={() => setActiveImage(galleryImages.hero)}>
                  <img 
                    src={galleryImages.hero} 
                    alt="Hero section"
                    className="gallery-image"
                    loading="lazy"
                  />
                  <div className="image-caption">
                    <span>Hero Section • 800×400</span>
                    <span className="caption-hover">Click to enlarge</span>
                  </div>
                </div>
              </div>

              <div className="gallery-row two-col">
                <div className="gallery-item services-item" onClick={() => setActiveImage(galleryImages.services)}>
                  <img 
                    src={galleryImages.services} 
                    alt="Services section"
                    className="gallery-image"
                    loading="lazy"
                  />
                  <div className="image-caption">
                    <span>Services • 400×300</span>
                    <span className="caption-hover">Click to enlarge</span>
                  </div>
                </div>
                
                <div className="gallery-item contact-item" onClick={() => setActiveImage(galleryImages.contact)}>
                  <img 
                    src={galleryImages.contact} 
                    alt="Contact form"
                    className="gallery-image"
                    loading="lazy"
                  />
                  <div className="image-caption">
                    <span>Contact Form • 400×350</span>
                    <span className="caption-hover">Click to enlarge</span>
                  </div>
                </div>
              </div>

              <div className="gallery-row">
                <div className="gallery-item footer-item" onClick={() => setActiveImage(galleryImages.footer)}>
                  <img 
                    src={galleryImages.footer} 
                    alt="Footer section"
                    className="gallery-image"
                    loading="lazy"
                  />
                  <div className="image-caption">
                    <span>Footer • 800×250</span>
                    <span className="caption-hover">Click to enlarge</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeImage && (
            <div className="image-modal" onClick={() => setActiveImage(null)}>
              <button className="close-modal" aria-label="Close">&times;</button>
              <img src={activeImage} alt="Enlarged view" className="modal-image" />
              <p className="modal-caption">Press Esc or click anywhere to close</p>
            </div>
          )}

          {projectDetails?.description && (
            <div className="project-section">
              <h3>Project Overview</h3>
              <p>{projectDetails.description}</p>
            </div>
          )}

          {projectDetails?.features && projectDetails.features.length > 0 && (
            <div className="project-section">
              <h3>Features</h3>
              <ul className="features-list">
                {projectDetails.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          {project.technologies && (
            <div className="project-section">
              <h3>Skills</h3>
              <div className="skills-tags">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="skill-tag">{tech}</span>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        
        <>
         
          {project.id === 2 && projectDetails?.media && (
            <>
              <div className="project-header">
                <span className="project-eyebrow">{project.category} · {project.year}</span>
                <h1>{project.title}</h1>
                <p className="project-role">{project.role || 'Project'}</p>
              </div>

              <MediaGallery media={projectDetails.media} baseUrl={baseUrl} />

              {projectDetails?.description && (
                <div className="project-section">
                  <h3>Project Overview</h3>
                  <p>{projectDetails.description}</p>
                </div>
              )}

              {projectDetails?.features && projectDetails.features.length > 0 && (
                <div className="project-section">
                  <h3>Features</h3>
                  <ul className="features-list">
                    {projectDetails.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.technologies && (
                <div className="project-section">
                  <h3>Skills</h3>
                  <div className="skills-tags">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="skill-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

         
          {project.id === 3 && projectDetails?.media && (
            <>
              <div className="project-header">
                <span className="project-eyebrow">{project.category} · {project.year}</span>
                <h1>{project.title}</h1>
                <p className="project-role">{project.role || 'Project'}</p>
              </div>

              <MediaGallery media={projectDetails.media} baseUrl={baseUrl} />

              {projectDetails?.description && (
                <div className="project-section">
                  <h3>Project Overview</h3>
                  <p>{projectDetails.description}</p>
                </div>
              )}

              {projectDetails?.features && projectDetails.features.length > 0 && (
                <div className="project-section">
                  <h3>Features</h3>
                  <ul className="features-list">
                    {projectDetails.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.technologies && (
                <div className="project-section">
                  <h3>Skills</h3>
                  <div className="skills-tags">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="skill-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {project.id === 4 && (
            <>
              <div className="project-header">
                <span className="project-eyebrow">{project.category} · {project.year}</span>
                <h1>{project.title}</h1>
                <p className="project-role">{project.role || 'Project'}</p>
              </div>

              {projectDetails?.techStack && (
                <div className="project-section">
                  <h3>Tech Stack</h3>
                  <div className="tech-stack-grid">
                    {projectDetails.techStack.map((tech, i) => (
                      <div key={i} className="tech-stack-item">
                        <img 
                          src={`${baseUrl}/${tech.logo}`} 
                          alt={tech.name}
                          className="tech-logo"
                        />
                        <span className="tech-name">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              
              {projectDetails?.architecture && (
                <div className="project-section">
                  <h3>Architecture</h3>
                  <div className="architecture-diagram">
                    <div className="arch-row">
                      <div className="arch-box frontend">React App</div>
                      <div className="arch-arrow">→</div>
                      <div className="arch-box domain">albarfan.com</div>
                      <div className="arch-arrow">→</div>
                      <div className="arch-box browser">Browser</div>
                    </div>
                    <div className="arch-row">
                      <div className="arch-box storage">R2 Storage</div>
                      <div className="arch-arrow">↔</div>
                      <div className="arch-box cloudflare">Cloudflare DNS</div>
                    </div>
                    <div className="arch-note">
                      <span className="arch-badge">SSL</span> Secured by Cloudflare
                    </div>
                  </div>
                </div>
              )}

              
              {projectDetails?.description && (
                <div className="project-section">
                  <h3>Project Overview</h3>
                  <p>{projectDetails.description}</p>
                </div>
              )}

              
              {projectDetails?.features && projectDetails.features.length > 0 && (
                <div className="project-section">
                  <h3>Features</h3>
                  <ul className="features-list">
                    {projectDetails.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              
              {project.technologies && (
                <div className="project-section">
                  <h3>Skills</h3>
                  <div className="skills-tags">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="skill-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ProjectDetail;