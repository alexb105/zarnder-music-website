# Assets Folder Structure

This folder contains all static assets for the ZARNDER Music Website.

## Folder Structure

```
src/assets/
├── images/
│   ├── logos/          # Brand logos and logo variations
│   ├── backgrounds/    # Hero backgrounds and page backgrounds
│   ├── icons/          # UI icons and small graphics
│   └── index.js        # Export all images
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
