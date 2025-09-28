import React, { useState, useEffect } from 'react';
import { getAllReleases, addRelease, updateRelease, deleteRelease } from '../services/releaseService';
import { useAuth } from '../contexts/AuthContext';
import ReleaseForm from './ReleaseForm';
import './AdminPanel.css';

const AdminPanel = () => {
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRelease, setEditingRelease] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const { logout, currentUser } = useAuth();

  useEffect(() => {
    fetchReleases();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchReleases = async () => {
    try {
      const data = await getAllReleases();
      setReleases(data);
    } catch (error) {
      showMessage('Error fetching releases', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleAddRelease = async (releaseData, albumArtFile) => {
    try {
      await addRelease(releaseData, albumArtFile);
      showMessage('Release added successfully!', 'success');
      setShowForm(false);
      fetchReleases();
    } catch (error) {
      showMessage('Error adding release', 'error');
    }
  };

  const handleUpdateRelease = async (releaseData, albumArtFile) => {
    try {
      await updateRelease(editingRelease.id, releaseData, albumArtFile);
      showMessage('Release updated successfully!', 'success');
      setEditingRelease(null);
      setShowForm(false);
      fetchReleases();
    } catch (error) {
      showMessage('Error updating release', 'error');
    }
  };

  const handleDeleteRelease = async (releaseId) => {
    if (window.confirm('Are you sure you want to delete this release?')) {
      try {
        await deleteRelease(releaseId);
        showMessage('Release deleted successfully!', 'success');
        fetchReleases();
      } catch (error) {
        showMessage('Error deleting release', 'error');
      }
    }
  };

  const handleEditRelease = (release) => {
    setEditingRelease(release);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingRelease(null);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const releaseDate = date.toDate ? date.toDate() : new Date(date);
    return releaseDate.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="admin-panel">
        <div className="admin-panel__loading">
          <div className="loading-spinner"></div>
          <p>Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel__container">
        <div className="admin-panel__header">
          <div className="admin-panel__header-top">
            <div>
              <h1 className="admin-panel__title">Admin Panel</h1>
              <p className="admin-panel__subtitle">Manage ZARNDER's releases</p>
              <p className="admin-panel__user">Logged in as: {currentUser?.email}</p>
            </div>
            <button
              onClick={logout}
              className="admin-panel__logout-btn"
            >
              Logout
            </button>
          </div>
          
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="admin-panel__add-btn"
            >
              + Add New Release
            </button>
          )}
        </div>

        {message.text && (
          <div className={`admin-panel__message admin-panel__message--${message.type}`}>
            {message.text}
          </div>
        )}

        {showForm && (
          <div className="admin-panel__form-container">
            <ReleaseForm
              release={editingRelease}
              onSubmit={editingRelease ? handleUpdateRelease : handleAddRelease}
              onCancel={handleCancelForm}
            />
          </div>
        )}

        <div className="admin-panel__releases">
          <h2 className="admin-panel__section-title">
            All Releases ({releases.length})
          </h2>
          
          {releases.length === 0 ? (
            <div className="admin-panel__empty">
              <p>No releases yet. Add your first release to get started!</p>
            </div>
          ) : (
            <div className="admin-panel__releases-grid">
              {releases.map((release) => (
                <div key={release.id} className="admin-panel__release-card">
                  <div className="admin-panel__release-image">
                    {release.albumArt ? (
                      <img src={release.albumArt} alt={release.title} />
                    ) : (
                      <div className="admin-panel__release-placeholder">🎵</div>
                    )}
                  </div>
                  
                  <div className="admin-panel__release-info">
                    <h3 className="admin-panel__release-title">{release.title}</h3>
                    <p className="admin-panel__release-date">{formatDate(release.releaseDate)}</p>
                    {release.featured && (
                      <span className="admin-panel__featured-badge">Featured</span>
                    )}
                  </div>
                  
                  <div className="admin-panel__release-actions">
                    <button
                      onClick={() => handleEditRelease(release)}
                      className="admin-panel__edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteRelease(release.id)}
                      className="admin-panel__delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
