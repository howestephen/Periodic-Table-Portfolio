# Public Assets Folder

This folder contains static assets that are served at the root of your application.

## Usage

Files placed in this folder can be referenced with absolute paths starting with `/`.

### Example Structure:

```
public/
  ├── images/
  │   ├── portfolio/
  │   │   ├── project-1.jpg
  │   │   ├── project-2.png
  │   │   └── thumbnails/
  │   └── og-image.jpg
  ├── videos/
  │   ├── portfolio/
  │   │   ├── project-1.mp4
  │   │   ├── project-2.webm
  │   │   └── project-3.mp4
  ├── audio/
  │   ├── mixdown-1.mp3
  │   ├── track-2.wav
  │   └── album-mix.mp3
  └── favicon.ico
```

### In portfolio-data.ts:

```typescript
{
  id: "project-1",
  title: "My Project",
  description: "Project description",
  type: "image",
  url: "/images/portfolio/project-1.jpg",  // ✅ Reference from public folder
  thumbnail: "/images/portfolio/thumbnails/project-1-thumb.jpg",  // Optional
  category: "graphic-design",
  company: "Company Name",
  year: 2024,
}
```

## Notes

- Files in `public/` are copied as-is during build (no processing)
- Use `/` to reference files from the root
- Recommended folder structure:
  - `/images/portfolio/` - Portfolio images
  - `/images/thumbnails/` - Thumbnail images
  - `/images/og-image.jpg` - Open Graph image for social sharing
  - `/videos/portfolio/` - Portfolio videos (MP4, WebM, etc.)
  - `/audio/` - Audio files (MP3, WAV, OGG, etc.)

## Video Files

For local video items, you'll need:

1. The video file in `/public/videos/` (e.g., `/videos/portfolio/project-1.mp4`)
2. A thumbnail image in `/public/images/portfolio/` (e.g., `/images/portfolio/video-thumb.jpg`)

Supported formats: MP4, WebM, OGG

Example in portfolio-data.ts:

```typescript
{
  id: "vi-1",
  title: "My Video Project",
  description: "Video description",
  type: "video",
  url: "/videos/portfolio/project-1.mp4",
  thumbnail: "/images/portfolio/video-thumb.jpg", // Required for local videos
  category: "video",
  company: "Client Name",
  year: 2024,
}
```

**Note:** You can also use external video embed URLs (like Vimeo) by using a full URL instead of a local path. The system will automatically detect local videos (paths starting with `/`) and use an HTML5 video player, or use an iframe for external embeds.

## Audio Files

For audio items, you'll need:

1. The audio file in `/public/audio/` (e.g., `/audio/mixdown.mp3`)
2. A thumbnail image in `/public/images/portfolio/` (e.g., `/images/portfolio/album-cover.jpg`)

Example in portfolio-data.ts:

```typescript
{
  id: "ae-1",
  title: "My Mixdown",
  description: "Track description",
  type: "audio",
  url: "/audio/mixdown.mp3",
  thumbnail: "/images/portfolio/album-cover.jpg", // Required for audio
  category: "audio",
  company: "Client Name",
  year: 2024,
}
```
