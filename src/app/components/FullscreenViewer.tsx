import { useEffect, useState, useRef } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  // Volume2,
} from "lucide-react";
import { PortfolioItem } from "../data/portfolio-data";
import { SocialShare } from "./SocialShare";
import { getYouTubeEmbedUrl, getFigmaEmbedUrl } from "../utils/media-helpers";

interface FullscreenViewerProps {
  item: PortfolioItem | null;
  onClose: () => void;
  items?: PortfolioItem[];
  currentIndex?: number;
  onNavigate?: (index: number) => void;
}

export function FullscreenViewer({
  item,
  onClose,
  items = [],
  currentIndex = 0,
  onNavigate,
}: FullscreenViewerProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  useEffect(() => {
    if (!item) return;

    // Reset audio when item changes
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowLeft" && items.length > 0 && onNavigate) {
        const prevIndex =
          currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        onNavigate(prevIndex);
      } else if (e.key === "ArrowRight" && items.length > 0 && onNavigate) {
        const nextIndex =
          currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        onNavigate(nextIndex);
      } else if (e.key === " " && item.type === "audio" && audioRef.current) {
        e.preventDefault();
        togglePlay();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [item, currentIndex, items, onNavigate, isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = parseFloat(e.target.value);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!item) return null;

  const hasNavigation = items.length > 1 && onNavigate;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 transition-opacity duration-200 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleClose}
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50 p-2 hover:bg-white/10 rounded-lg"
        aria-label="Close"
      >
        <X className="w-8 h-8" />
      </button>

      {hasNavigation && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const prevIndex =
                currentIndex > 0 ? currentIndex - 1 : items.length - 1;
              onNavigate(prevIndex);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-50 p-3 hover:bg-white/10 rounded-lg"
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const nextIndex =
                currentIndex < items.length - 1 ? currentIndex + 1 : 0;
              onNavigate(nextIndex);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-50 p-3 hover:bg-white/10 rounded-lg"
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      <div
        className="max-w-6xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content */}
        <div className="flex-1 flex items-center justify-center mb-6">
          {item.type === "video" || item.type === "youtube" ? (
            <div className="w-full aspect-video">
              {item.type === "youtube" ? (
                <iframe
                  src={getYouTubeEmbedUrl(item.url)}
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={item.title}
                />
              ) : item.url.startsWith("/") ? (
                // Local video file - use HTML5 video element
                <video
                  src={item.url}
                  controls
                  className="w-full h-full rounded-lg"
                  title={item.title}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                // External embed URL - use iframe
                <iframe
                  src={item.url}
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={item.title}
                />
              )}
            </div>
          ) : item.type === "figma" ? (
            <div className="w-full h-full min-h-[600px]">
              <iframe
                src={getFigmaEmbedUrl(item.url)}
                className="w-full h-full rounded-lg border-0"
                allowFullScreen
                title={item.title}
              />
            </div>
          ) : item.type === "audio" ? (
            <div className="w-full max-w-2xl">
              {/* Album Art / Thumbnail */}
              {item.thumbnail && (
                <div className="mb-6 flex justify-center">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-64 h-64 rounded-lg object-cover shadow-2xl"
                  />
                </div>
              )}

              {/* Audio Player */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <audio
                  ref={audioRef}
                  src={item.url}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* Play/Pause Button */}
                <div className="flex items-center justify-center mb-6">
                  <button
                    onClick={togglePlay}
                    className="w-20 h-20 bg-gradient-to-r from-fuchsia-600/30 to-red-600/30 hover:from-fuchsia-600/50 hover:to-red-600/50 rounded-full flex items-center justify-center transition-all border border-fuchsia-500/30 hover:border-fuchsia-400/50 hover:shadow-lg hover:shadow-fuchsia-500/30"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause className="w-10 h-10 text-white ml-1" />
                    ) : (
                      <Play className="w-10 h-10 text-white ml-1" />
                    )}
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <img
              src={item.url}
              alt={item.title}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
          )}
        </div>

        {/* Info */}
        <div className="text-center text-white">
          <h2 className="text-2xl mb-2">{item.title}</h2>
          <p className="text-gray-400 mb-2">{item.description}</p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
            <span>{item.company}</span>
            <span>•</span>
            <span>{item.year}</span>
          </div>
          <div className="flex justify-center mb-4">
            <SocialShare item={item} />
          </div>
          {hasNavigation && (
            <div className="mt-4 text-sm text-gray-500">
              {currentIndex + 1} of {items.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
