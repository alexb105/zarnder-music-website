import React from 'react';
import ReleaseCard from './ReleaseCard';
import './HeroSection.css';

const HeroSection = ({ release }) => {
  if (!release) {
    return (
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">ZARNDER</h1>
            <p className="hero-subtitle">Electronic Music Producer</p>
            <p className="hero-description">
              Welcome to the official website. Stay tuned for the latest releases and updates.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">ZARNDER</h1>
          <p className="hero-subtitle">Latest Release</p>
          <div className="hero-release">
            <ReleaseCard release={release} isHero={true} />
          </div>
        </div>
        <div className="hero-background">
          {release.albumArt && (
            <img 
              src={release.albumArt} 
              alt={release.title}
              className="hero-bg-image"
            />
          )}
          <div className="hero-overlay"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
