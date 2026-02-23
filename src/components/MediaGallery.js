import React, { useState, useEffect, useRef } from 'react';
import './MediaGallery.css';

function MediaGallery({ media, baseUrl }) {
  const [activeItem, setActiveItem] = useState(null);
  const videoRefs = useRef([]);

  
  console.log('MediaGallery received:', { media, baseUrl });

  if (!media || !media.items || media.items.length === 0) {
    return (
      <div className="no-media-message">
        <p>No media available for this project.</p>
      </div>
    );
  }

  const folder = media.folder;
  const items = media.items;

 
  const photoCount = items.filter(item => item.type === 'photo').length;
  const videoCount = items.filter(item => item.type === 'video').length;

  console.log(`Found ${photoCount} photos and ${videoCount} videos - showing mixed together`);

  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          video.play().catch(e => console.log('Autoplay prevented:', e));
        } else {
          const video = entry.target;
          video.pause();
        }
      });
    }, { threshold: 0.3 });

   
    videoRefs.current.forEach(video => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [items]); 

  return (
    <div className="bakti-desa-gallery">
      


     
      <div className="mixed-grid">
        {items.map((item, index) => {
          if (item.type === 'photo') {
            const imageUrl = `${baseUrl}/${folder}/${item.src}`;
            return (
              <div 
                key={`photo-${index}`}
                className="gallery-item photo-item"
                onClick={() => setActiveItem({...item, type: 'photo', index, url: imageUrl})}
              >
                <img 
                  src={imageUrl}
                  alt={item.caption || `Media ${index + 1}`}
                  loading="lazy"
                  onError={(e) => console.log(`Photo failed to load: ${imageUrl}`)}
                />
                {item.caption && (
                  <div className="item-caption">{item.caption}</div>
                )}
              </div>
            );
          } else {
            const videoUrl = `${baseUrl}/${folder}/${item.src}`;
            return (
              <div 
                key={`video-${index}`}
                className="gallery-item video-item"
                onClick={() => setActiveItem({...item, type: 'video', index, url: videoUrl})}
              >
                <video 
                  ref={el => videoRefs.current[index] = el}
                  src={videoUrl}
                  loop
                  muted
                  playsInline
                  className="gallery-video"
                  onError={(e) => console.log(`Video failed to load: ${videoUrl}`)}
                />
                <div className="video-overlay">
                  <span className="play-icon">▶</span>
                </div>
                {item.caption && (
                  <div className="item-caption">{item.caption}</div>
                )}
              </div>
            );
          }
        })}
      </div>

     
      {activeItem && (
        <div className="fullscreen-modal" onClick={() => setActiveItem(null)}>
          <span className="close-modal">&times;</span>
          
          {activeItem.type === 'photo' ? (
            <img 
              src={activeItem.url}
              alt={activeItem.caption || ''}
              className="modal-image"
            />
          ) : (
            <video 
              src={activeItem.url}
              controls
              autoPlay
              className="modal-video"
            />
          )}
          
          {activeItem.caption && (
            <div className="modal-caption">{activeItem.caption}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default MediaGallery;