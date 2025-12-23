/**
 * Converts a YouTube URL to an embed URL
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID (already embed format)
 */
export function getYouTubeEmbedUrl(url: string): string {
  // If already an embed URL, return as is
  if (url.includes('youtube.com/embed/')) {
    return url;
  }

  // Extract video ID from various YouTube URL formats
  let videoId = '';

  // Format: https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) {
    videoId = watchMatch[1];
  }

  // Format: https://youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) {
    videoId = shortMatch[1];
  }

  // Format: https://www.youtube.com/embed/VIDEO_ID
  const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/);
  if (embedMatch) {
    videoId = embedMatch[1];
  }

  if (!videoId) {
    console.warn('Could not extract YouTube video ID from URL:', url);
    return url;
  }

  return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * Converts a Figma file URL to an embed URL
 * Supports:
 * - https://www.figma.com/file/FILE_ID/PROJECT_NAME
 * - https://www.figma.com/design/FILE_ID/PROJECT_NAME
 * - Already embed format
 */
export function getFigmaEmbedUrl(url: string): string {
  // If already an embed URL, return as is
  if (url.includes('figma.com/embed')) {
    return url;
  }

  // Extract file ID from Figma URL
  // Format: https://www.figma.com/file/FILE_ID/PROJECT_NAME
  // Format: https://www.figma.com/design/FILE_ID/PROJECT_NAME
  const fileMatch = url.match(/figma\.com\/(?:file|design)\/([^/]+)/);
  if (fileMatch) {
    const fileId = fileMatch[1];
    const encodedUrl = encodeURIComponent(url);
    return `https://www.figma.com/embed?embed_host=share&url=${encodedUrl}`;
  }

  console.warn('Could not extract Figma file ID from URL:', url);
  return url;
}

/**
 * Gets a YouTube thumbnail URL from a video ID or URL
 */
export function getYouTubeThumbnail(url: string): string {
  let videoId = '';

  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) {
    videoId = watchMatch[1];
  }

  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) {
    videoId = shortMatch[1];
  }

  const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/);
  if (embedMatch) {
    videoId = embedMatch[1];
  }

  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }

  return '';
}

