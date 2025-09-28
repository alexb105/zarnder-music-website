import React, { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import FeaturedReleases from './FeaturedReleases';
import AllReleases from './AllReleases';
import { getMostRecentRelease, getFeaturedReleases, getAllReleases } from '../services/releaseService';
import './HomePage.css';

const HomePage = () => {
  const [mostRecentRelease, setMostRecentRelease] = useState(null);
  const [featuredReleases, setFeaturedReleases] = useState([]);
  const [allReleases, setAllReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recent, featured, all] = await Promise.all([
          getMostRecentRelease(),
          getFeaturedReleases(),
          getAllReleases()
        ]);
        
        setMostRecentRelease(recent);
        setFeaturedReleases(featured);
        setAllReleases(all);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading ZARNDER's music...</p>
      </div>
    );
  }

  return (
    <div className="homepage">
      <HeroSection release={mostRecentRelease} />
      <FeaturedReleases releases={featuredReleases} />
      <AllReleases releases={allReleases} />
    </div>
  );
};

export default HomePage;
