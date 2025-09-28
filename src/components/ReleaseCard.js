import React from 'react';
import './ReleaseCard.css';

const ReleaseCard = ({ release, isHero = false }) => {
  if (!release) return null;

  const formatDate = (date) => {
    if (!date) return '';
    const releaseDate = date.toDate ? date.toDate() : new Date(date);
    return releaseDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const streamingPlatforms = [
    { name: 'Spotify', icon: '🎵', color: '#1DB954' },
    { name: 'Apple Music', icon: '🍎', color: '#FA243C' },
    { name: 'YouTube Music', icon: '📺', color: '#FF0000' },
    { name: 'SoundCloud', icon: '☁️', color: '#FF3300' },
    { name: 'Bandcamp', icon: '🎪', color: '#629AA0' },
    { name: 'Amazon Music', icon: '📦', color: '#FF9900' }
  ];

  return (
    <div className={`release-card ${isHero ? 'release-card--hero' : ''}`}>
      <div className="release-card__image-container">
        {release.albumArt ? (
          <img 
            src={release.albumArt} 
            alt={release.title}
            className="release-card__image"
          />
        ) : (
          <div className="release-card__placeholder">
            <span>🎵</span>
          </div>
        )}
        {release.featured && !isHero && (
          <div className="release-card__featured-badge">
            ⭐ Featured
          </div>
        )}
      </div>
      
      <div className="release-card__content">
        <h3 className="release-card__title">{release.title}</h3>
        <p className="release-card__artist">ZARNDER</p>
        <p className="release-card__date">{formatDate(release.releaseDate)}</p>
        
        {release.description && (
          <p className="release-card__description">{release.description}</p>
        )}
        
        <div className="release-card__links">
          {streamingPlatforms.map((platform) => {
            const link = release.streamingLinks?.[platform.name.toLowerCase().replace(' ', '')];
            if (!link) return null;
            
            return (
              <a
                key={platform.name}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="release-card__link"
                style={{ '--platform-color': platform.color }}
                title={`Listen on ${platform.name}`}
              >
                <span className="release-card__link-icon">{platform.icon}</span>
                <span className="release-card__link-text">{platform.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReleaseCard;
