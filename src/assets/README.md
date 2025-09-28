# Assets Folder Structure

This folder contains all static assets for the ZARNDER Music Website.

## Folder Structure

```
src/assets/
├── images/
│   ├── logos/          # Brand logos and logo variations
│   ├── backgrounds/    # Hero backgrounds and page backgrounds
│   ├── icons/          # UI icons and small graphics
│   ├── album-art/      # Album covers and artwork
│   ├── photos/         # Artist photos and promotional images
│   ├── graphics/       # Custom graphics and illustrations
│   ├── ui-elements/    # User interface elements
│   ├── social-media/   # Social media assets and banners
│   └── index.js        # Export all images
├── fonts/             # Custom fonts and typography
├── audio/             # Audio files for web use
├── videos/            # Video files and background videos
├── documents/         # PDFs and downloadable documents
├── index.js           # Main assets export file
└── README.md          # This file
```

## Usage

### Import individual assets:
```javascript
import { logo, heroBackground } from '../assets';
```

### Import specific categories:
```javascript
import { logo } from '../assets/images';
```

## Adding New Assets

1. **Place files in appropriate folders:**
   - Logos: `images/logos/`
   - Backgrounds: `images/backgrounds/`
   - Icons: `images/icons/`
   - Album Art: `images/album-art/`
   - Photos: `images/photos/`
   - Graphics: `images/graphics/`
   - UI Elements: `images/ui-elements/`
   - Social Media: `images/social-media/`
   - Fonts: `fonts/`
   - Audio: `audio/`
   - Videos: `videos/`
   - Documents: `documents/`

2. **Export in index files:**
   - Add export to `images/index.js`
   - Main export will automatically include it

3. **File naming conventions:**
   - Use kebab-case: `hero-background.jpg`
   - Be descriptive: `zarnder-logo-white.svg`
   - Include size if relevant: `icon-play-24px.svg`

## Supported Formats

- **Images:** `.jpg`, `.png`, `.svg`, `.webp`
- **Vectors:** `.svg` (preferred for logos and icons)
- **Optimize:** All images should be web-optimized before adding
