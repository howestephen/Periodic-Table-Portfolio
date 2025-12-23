/**
 * Portfolio Item Types:
 * - "image": Regular image URL (can be local or remote)
 *   Local examples:
 *     - "/images/portfolio/project-1.jpg" (from public folder)
 *     - "https://example.com/image.jpg" (remote URL)
 * - "video": Video file (can be local or embed URL)
 *   Local examples:
 *     - "/videos/portfolio/project-1.mp4" (from public folder)
 *     - "/videos/project-2.webm"
 *   Embed examples (iframe):
 *     - https://player.vimeo.com/video/VIDEO_ID
 *     - https://example.com/embed/video
 * - "youtube": YouTube video URL (supports watch, youtu.be, or embed format)
 *   Examples:
 *     - https://www.youtube.com/watch?v=VIDEO_ID
 *     - https://youtu.be/VIDEO_ID
 *     - https://www.youtube.com/embed/VIDEO_ID
 * - "figma": Figma file URL (will be converted to embed format automatically)
 *   Examples:
 *     - https://www.figma.com/file/FILE_ID/PROJECT_NAME
 *     - https://www.figma.com/design/FILE_ID/PROJECT_NAME
 * - "audio": Local audio file (MP3, WAV, OGG, etc.)
 *   Examples:
 *     - "/audio/mixdown-1.mp3"
 *     - "/audio/track-2.wav"
 *
 * Local Assets:
 * Place images in the /public/images/ folder and reference them with absolute paths:
 *   - "/images/portfolio/my-image.jpg"
 *   - "/images/thumbnails/my-thumbnail.jpg"
 * Place videos in the /public/videos/ folder and reference them with absolute paths:
 *   - "/videos/portfolio/my-video.mp4"
 *   - "/videos/project-2.webm"
 *   Note: Local videos require a thumbnail image for the grid view
 * Place audio files in the /public/audio/ folder:
 *   - "/audio/my-mixdown.mp3"
 *   - "/audio/track.wav"
 */
export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  type: "image" | "video" | "youtube" | "figma" | "audio";
  url: string;
  thumbnail?: string; // Optional thumbnail (auto-generated for YouTube, required for audio)
  category: string;
  company: string;
  year: number;
}

export interface SkillElement {
  symbol: string;
  title: string;
  subtitle: string;
  color: string;
  iconType: string;
  route: string;
}

export const skillElements: SkillElement[] = [
  {
    symbol: "Ct",
    title: "Creative Lead",
    subtitle: "All day Every day",
    color: "bg-gradient-to-br from-red-500 to-red-600",
    iconType: "brain",
    route: "/creative-tech",
  },
  {
    symbol: "Gd",
    title: "Graphic Design",
    subtitle: "Since 2004",
    color: "bg-gradient-to-br from-fuchsia-500 to-pink-600",
    iconType: "palette",
    route: "/graphic-design",
  },
  {
    symbol: "Ae",
    title: "Audio Production",
    subtitle: "Since 2007",
    color: "bg-gradient-to-br from-orange-500 to-orange-600",
    iconType: "music",
    route: "/audio",
  },
  {
    symbol: "Mo",
    title: "Motion Graphics",
    subtitle: "Since 2015",
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
    iconType: "sparkles",
    route: "/motion",
  },
  {
    symbol: "Ui",
    title: "UI Design",
    subtitle: "Since 2020",
    color: "bg-gradient-to-br from-amber-400 to-amber-500",
    iconType: "layout",
    route: "/ui-design",
  },
  {
    symbol: "3d",
    title: "Generalist & R3F",
    subtitle: "Since 2018",
    color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    iconType: "box",
    route: "/3d",
  },
  {
    symbol: "Ph",
    title: "Photography",
    subtitle: "Since 2002",
    color: "bg-gradient-to-br from-rose-500 to-rose-600",
    iconType: "camera",
    route: "/photography",
  },
  {
    symbol: "Fr",
    title: "Frontend Dev",
    subtitle: "It's complicated",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    iconType: "code",
    route: "/frontend",
  },
  {
    symbol: "Vi",
    title: "Video Editing",
    subtitle: "Since 2004",
    color: "bg-gradient-to-br from-violet-500 to-violet-600",
    iconType: "video",
    route: "/video",
  },
];

export const portfolioItems: Record<string, PortfolioItem[]> = {
  "creative-tech": [
    {
      id: "ct-1",
      title: "Interactive Installation",
      description: "Motion-reactive light installation",
      type: "image",
      url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
      category: "creative-tech",
      company: "Tech Innovations Inc.",
      year: 2021,
    },
    {
      id: "ct-2",
      title: "Generative Art System",
      description: "Real-time generative visuals",
      type: "image",
      url: "https://images.unsplash.com/photo-1617791160505-6f00504e3519",
      category: "creative-tech",
      company: "Artistic Solutions Ltd.",
      year: 2020,
    },
  ],
  "video": [
    {
      id: "vi-1",
      title: "Brand Documentary",
      description: "Corporate brand story",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      category: "video",
      company: "Brand Storytellers Co.",
      year: 2019,
    },
    {
      id: "vi-2",
      title: "Music Video",
      description: "Experimental music video",
      type: "youtube",
      url: "https://youtu.be/dQw4w9WgXcQ",
      category: "video",
      company: "Music Video Producers",
      year: 2018,
    },
  ],
  "graphic-design": [
    {
      id: "gd-1",
      title: "Brand Identity",
      description: "Complete brand system",
      type: "image",
      url: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
      category: "graphic-design",
      company: "Brand Identity Experts",
      year: 2017,
    },
    {
      id: "gd-2",
      title: "Poster Series",
      description: "Event poster collection",
      type: "image",
      url: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65",
      category: "graphic-design",
      company: "Poster Designers Inc.",
      year: 2016,
    },
  ],
  "audio": [
    {
      id: "ae-1",
      title: "Album Mix",
      description: "Full album production",
      type: "image",
      url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
      category: "audio",
      company: "Audio Production Co.",
      year: 2015,
    },
    {
      id: "ae-2",
      title: "Sound Design",
      description: "Film sound design project",
      type: "image",
      url: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
      category: "audio",
      company: "Sound Designers Ltd.",
      year: 2014,
    },
  ],
  "motion": [
    {
      id: "mo-1",
      title: "Title Sequence",
      description: "Film opening titles",
      type: "image",
      url: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7",
      category: "motion",
      company: "Title Sequence Creators",
      year: 2013,
    },
    {
      id: "mo-2",
      title: "Animated Logo",
      description: "Brand animation",
      type: "image",
      url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113",
      category: "motion",
      company: "Brand Animation Studio",
      year: 2012,
    },
  ],
  "3d": [
    {
      id: "3d-1",
      title: "3D Product Viz",
      description: "Product visualization",
      type: "image",
      url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      category: "3d",
      company: "3D Visualization Experts",
      year: 2011,
    },
    {
      id: "3d-2",
      title: "Environment Design",
      description: "3D environment concept",
      type: "image",
      url: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032",
      category: "3d",
      company: "3D Environment Designers",
      year: 2010,
    },
  ],
  "ui-design": [
    {
      id: "ui-1",
      title: "Mobile App Design",
      description: "Complete app redesign",
      type: "figma",
      url: "https://www.figma.com/file/example123/Mobile-App-Design",
      category: "ui-design",
      company: "Mobile App Designers",
      year: 2009,
    },
    {
      id: "ui-2",
      title: "Dashboard Interface",
      description: "Analytics dashboard",
      type: "figma",
      url: "https://www.figma.com/design/example456/Dashboard-Interface",
      category: "ui-design",
      company: "Dashboard Interface Studio",
      year: 2008,
    },
  ],
  "frontend": [
    {
      id: "fr-1",
      title: "Web Application",
      description: "Complex React app",
      type: "image",
      url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      category: "frontend",
      company: "Web Application Developers",
      year: 2007,
    },
    {
      id: "fr-2",
      title: "Interactive Experience",
      description: "WebGL experience",
      type: "image",
      url: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3",
      category: "frontend",
      company: "Interactive Experience Creators",
      year: 2006,
    },
  ],
  "photography": [
    {
      id: "ph-1",
      title: "Urban Landscapes",
      description: "Cityscape photography series",
      type: "image",
      url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
      category: "photography",
      company: "Personal Project",
      year: 2023,
    },
    {
      id: "ph-2",
      title: "Portrait Series",
      description: "Character portraits",
      type: "image",
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      category: "photography",
      company: "Personal Project",
      year: 2022,
    },
    {
      id: "ph-3",
      title: "Nature Photography",
      description: "Landscape and wildlife",
      type: "image",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      category: "photography",
      company: "Personal Project",
      year: 2021,
    },
  ],
};
