import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './WorkDetail.css';
import workData from '../data/WorkExperience.json';
import workDetailsData from '../data/WorkDetails.json';
import MediaGallery from './MediaGallery';

function WorkDetail() {
  const { id } = useParams();
  const [work, setWork] = useState(null);
  const [workDetails, setWorkDetails] = useState(null);

  useEffect(() => {
    const numId = parseInt(id);
    const foundWork = workData.experiences?.find(w => w.id === numId);
    setWork(foundWork);
    const details = workDetailsData[String(numId)] || {};
    setWorkDetails(details);
  }, [id]);

  if (!work) {
    return <div className="loading">Loading…</div>;
  }

  const baseUrl = 'https://photos.albarfan.com';

  return (
    <div className="work-detail">
      <div className="back-link-wrap">
        <a href="/work-experience" className="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>Back</a>
      </div>

      <div className="work-header">
        <span className="work-year">{work.year}</span>
        <h1>{work.title}</h1>
        <p className="work-company">{work.company}</p>
        <span className="work-type-badge">{work.type}</span>
      </div>

      {workDetails?.media && (
        <MediaGallery media={workDetails.media} baseUrl={baseUrl} />
      )}

      <div className="work-content">
        <div className="work-section">
          <h3>Overview</h3>
          <p>{workDetails.overview}</p>
        </div>

        {work.highlights?.length > 0 && (
          <div className="work-section">
            <h3>Key Achievements</h3>
            <ul className="work-highlights-list">
              {work.highlights.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {workDetails?.achievements && workDetails.achievements.length > 0 && (
          <div className="work-section">
            <h3>Key Metrics</h3>
            <div className="work-metrics-grid">
              {workDetails.achievements.map((item, i) => (
                <div key={i} className="work-metric-card">
                  <span className="work-metric-number">{item.metric}</span>
                  <span className="work-metric-label">{item.label}</span>
                  <p className="work-metric-description">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {workDetails?.skills && workDetails.tools && (
          <div className="work-section">
            <h3>Skills & Tools</h3>
            <div className="work-skills-tools">
              <div className="work-skills">
                <h4>Skills</h4>
                <ul>
                  {workDetails.skills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div className="work-tools">
                <h4>Tools</h4>
                <ul>
                  {workDetails.tools.map((tool, i) => (
                    <li key={i}>{tool}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkDetail;