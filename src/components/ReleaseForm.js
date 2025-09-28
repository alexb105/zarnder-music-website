import React, { useState, useEffect } from 'react';
import './ReleaseForm.css';

const ReleaseForm = ({ release, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    releaseDate: '',
    featured: false,
    streamingLinks: {
      spotify: '',
      applemusic: '',
      youtubemusic: '',
      soundcloud: '',
      bandcamp: '',
      amazonmusic: ''
    }
  });
  const [albumArtFile, setAlbumArtFile] = useState(null);
  const [albumArtPreview, setAlbumArtPreview] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (release) {
      const releaseDate = release.releaseDate?.toDate ? 
        release.releaseDate.toDate() : 
        new Date(release.releaseDate);
      
      setFormData({
        title: release.title || '',
        description: release.description || '',
        releaseDate: releaseDate.toISOString().split('T')[0],
        featured: release.featured || false,
        streamingLinks: {
          spotify: release.streamingLinks?.spotify || '',
          applemusic: release.streamingLinks?.applemusic || '',
          youtubemusic: release.streamingLinks?.youtubemusic || '',
          soundcloud: release.streamingLinks?.soundcloud || '',
          bandcamp: release.streamingLinks?.bandcamp || '',
          amazonmusic: release.streamingLinks?.amazonmusic || ''
        }
      });
      setAlbumArtPreview(release.albumArt || '');
    }
  }, [release]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleStreamingLinkChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      streamingLinks: {
        ...prev.streamingLinks,
        [platform]: value
      }
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAlbumArtFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setAlbumArtPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const submitData = {
        ...formData,
        releaseDate: new Date(formData.releaseDate)
      };
      await onSubmit(submitData, albumArtFile);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const streamingPlatforms = [
    { key: 'spotify', name: 'Spotify', placeholder: 'https://open.spotify.com/...' },
    { key: 'applemusic', name: 'Apple Music', placeholder: 'https://music.apple.com/...' },
    { key: 'youtubemusic', name: 'YouTube Music', placeholder: 'https://music.youtube.com/...' },
    { key: 'soundcloud', name: 'SoundCloud', placeholder: 'https://soundcloud.com/...' },
    { key: 'bandcamp', name: 'Bandcamp', placeholder: 'https://yourname.bandcamp.com/...' },
    { key: 'amazonmusic', name: 'Amazon Music', placeholder: 'https://music.amazon.com/...' }
  ];

  return (
    <form onSubmit={handleSubmit} className="release-form">
      <div className="release-form__header">
        <h3 className="release-form__title">
          {release ? 'Edit Release' : 'Add New Release'}
        </h3>
      </div>

      <div className="release-form__grid">
        <div className="release-form__left">
          <div className="release-form__group">
            <label className="release-form__label">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="release-form__input"
              required
              placeholder="Enter release title"
            />
          </div>

          <div className="release-form__group">
            <label className="release-form__label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="release-form__textarea"
              rows="4"
              placeholder="Enter release description"
            />
          </div>

          <div className="release-form__group">
            <label className="release-form__label">Release Date *</label>
            <input
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleInputChange}
              className="release-form__input"
              required
            />
          </div>

          <div className="release-form__group">
            <label className="release-form__checkbox-label">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="release-form__checkbox"
              />
              <span className="release-form__checkbox-text">Featured Release</span>
            </label>
          </div>
        </div>

        <div className="release-form__right">
          <div className="release-form__group">
            <label className="release-form__label">Album Art</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="release-form__file-input"
            />
            {albumArtPreview && (
              <div className="release-form__image-preview">
                <img src={albumArtPreview} alt="Album art preview" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="release-form__streaming-section">
        <h4 className="release-form__section-title">Streaming Platform Links</h4>
        <div className="release-form__streaming-grid">
          {streamingPlatforms.map((platform) => (
            <div key={platform.key} className="release-form__group">
              <label className="release-form__label">{platform.name}</label>
              <input
                type="url"
                value={formData.streamingLinks[platform.key]}
                onChange={(e) => handleStreamingLinkChange(platform.key, e.target.value)}
                className="release-form__input"
                placeholder={platform.placeholder}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="release-form__actions">
        <button
          type="button"
          onClick={onCancel}
          className="release-form__cancel-btn"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="release-form__submit-btn"
          disabled={loading}
        >
          {loading ? 'Saving...' : (release ? 'Update Release' : 'Add Release')}
        </button>
      </div>
    </form>
  );
};

export default ReleaseForm;
