import React, { useState } from 'react';
import ReleaseCard from './ReleaseCard';
import './AllReleases.css';

const AllReleases = ({ releases }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  if (!releases || releases.length === 0) {
    return (
      <section className="all-releases">
        <div className="all-releases__container">
          <div className="all-releases__header">
            <h2 className="all-releases__title">All Releases</h2>
            <p className="all-releases__subtitle">
              No releases available yet. Check back soon for new music!
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Filter and sort releases
  const filteredAndSortedReleases = releases
    .filter(release => 
      release.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (release.description && release.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const dateA = a.releaseDate?.toDate ? a.releaseDate.toDate() : new Date(a.releaseDate);
      const dateB = b.releaseDate?.toDate ? b.releaseDate.toDate() : new Date(b.releaseDate);
      
      if (sortBy === 'newest') {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

  return (
    <section className="all-releases">
      <div className="all-releases__container">
        <div className="all-releases__header">
          <h2 className="all-releases__title">All Releases</h2>
          <p className="all-releases__subtitle">
            Complete discography of ZARNDER's musical journey
          </p>
          
          <div className="all-releases__controls">
            <div className="all-releases__search">
              <input
                type="text"
                placeholder="Search releases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="all-releases__search-input"
              />
            </div>
            
            <div className="all-releases__sort">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="all-releases__sort-select"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="all-releases__stats">
          <p className="all-releases__count">
            {filteredAndSortedReleases.length} of {releases.length} releases
          </p>
        </div>
        
        <div className="all-releases__grid">
          {filteredAndSortedReleases.map((release) => (
            <div key={release.id} className="all-releases__item">
              <ReleaseCard release={release} />
            </div>
          ))}
        </div>
        
        {filteredAndSortedReleases.length === 0 && searchTerm && (
          <div className="all-releases__no-results">
            <p>No releases found matching "{searchTerm}"</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="all-releases__clear-search"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllReleases;
