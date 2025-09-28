import React from 'react';
import ReleaseCard from './ReleaseCard';
import './FeaturedReleases.css';

const FeaturedReleases = ({ releases }) => {
  if (!releases || releases.length === 0) {
    return null;
  }

  return (
    <section className="featured-releases">
      <div className="featured-releases__container">
        <div className="featured-releases__header">
          <h2 className="featured-releases__title">Featured Releases</h2>
          <p className="featured-releases__subtitle">
            Handpicked tracks that showcase ZARNDER's signature sound
          </p>
        </div>
        
        <div className="featured-releases__grid">
          {releases.map((release) => (
            <div key={release.id} className="featured-releases__item">
              <ReleaseCard release={release} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedReleases;
