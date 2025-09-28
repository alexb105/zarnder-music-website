# ZARNDER Music Website

A modern, responsive music artist website built with React and Firebase, featuring a dynamic release management system.

## Features

- **Hero Section**: Showcases the most recent release with stunning visuals
- **Featured Releases**: Highlights handpicked tracks
- **Complete Discography**: Displays all releases sorted by date with search and filter functionality
- **Admin Panel**: Backend system for managing releases, album art, and streaming platform links
- **Responsive Design**: Optimized for all devices
- **Modern UI**: Dark theme with gradient accents and smooth animations

## Tech Stack

- **Frontend**: React, CSS3
- **Backend**: Firebase (Firestore, Storage, Authentication)
- **Routing**: React Router DOM
- **Styling**: Custom CSS with modern design patterns

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Configuration

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable the following services:
   - **Firestore Database** (for storing release data)
   - **Storage** (for album art uploads)
   - **Authentication** (optional, for admin access)

3. Get your Firebase configuration:
   - Go to Project Settings > General
   - Scroll down to "Your apps" and click "Web app"
   - Copy the configuration object

4. Update `src/firebase/config.js` with your Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### 3. Firestore Security Rules

Set up the following security rules in Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to releases for all users
    match /releases/{document} {
      allow read: if true;
      allow write: if true; // Change this to add authentication
    }
  }
}
```

### 4. Storage Security Rules

Set up the following security rules in Storage:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /album-art/{allPaths=**} {
      allow read: if true;
      allow write: if true; // Change this to add authentication
    }
  }
}
```

### 5. Run the Development Server

```bash
npm start
```

The website will open at `http://localhost:3000`

## Usage

### Public Website
- Visit the homepage to see the hero section with the latest release
- Browse featured releases in the dedicated section
- Explore all releases with search and sort functionality
- Click on streaming platform links to listen to tracks

### Admin Panel
- Navigate to `/admin1998` to access the admin panel
- Add new releases with title, description, release date, and album art
- Set releases as "featured" to highlight them
- Add streaming platform links (Spotify, Apple Music, YouTube Music, etc.)
- Edit or delete existing releases

## Release Data Structure

Each release in Firestore contains:

```javascript
{
  title: "Release Title",
  description: "Release description",
  releaseDate: Timestamp,
  featured: boolean,
  albumArt: "URL to album art image",
  streamingLinks: {
    spotify: "Spotify URL",
    applemusic: "Apple Music URL",
    youtubemusic: "YouTube Music URL",
    soundcloud: "SoundCloud URL",
    bandcamp: "Bandcamp URL",
    amazonmusic: "Amazon Music URL"
  },
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## Customization

### Styling
- All components have dedicated CSS files for easy customization
- Global styles are in `src/App.css`
- Color scheme uses CSS custom properties for easy theming

### Adding New Streaming Platforms
1. Update the `streamingPlatforms` array in `ReleaseCard.js`
2. Add the new platform to the form in `ReleaseForm.js`
3. Update the Firestore data structure if needed

### Branding
- Update the artist name "ZARNDER" throughout the components
- Replace gradient colors in CSS files
- Add your own logo and branding elements

## Deployment

### Firebase Hosting (Recommended)

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase hosting:
```bash
firebase init hosting
```

4. Build the project:
```bash
npm run build
```

5. Deploy:
```bash
firebase deploy
```

### Other Hosting Options
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## Security Considerations

- **Authentication**: Add Firebase Authentication to secure the admin panel
- **Security Rules**: Update Firestore and Storage rules to restrict write access
- **Environment Variables**: Use environment variables for sensitive configuration
- **Admin Access**: Implement role-based access control for admin features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please open an issue on the GitHub repository.