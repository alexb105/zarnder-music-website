import React from 'react';
import ReleaseCard from './ReleaseCard';
import './HeroSection.css';
import { heroBackground } from '../assets';

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
        <div className="hero-background">
          <img 
            src={heroBackground} 
            alt="Cosmic Ocean"
            className="hero-bg-image"
          />
          <div className="hero-overlay"></div>
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
          <img 
            src={release.albumArt || heroBackground} 
            alt={release.albumArt ? release.title : "Cosmic Ocean"}
            className="hero-bg-image"
          />
          <div className="hero-overlay"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
