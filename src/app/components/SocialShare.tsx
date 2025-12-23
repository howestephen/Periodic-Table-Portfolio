import { Share2, Twitter, Linkedin, Link2, Check } from 'lucide-react';
import { useState } from 'react';
import { PortfolioItem } from '../data/portfolio-data';

interface SocialShareProps {
  item: PortfolioItem;
}

export function SocialShare({ item }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const url = window.location.href;
  const text = `Check out ${item.title} - ${item.description}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.description,
          url: url,
        });
      } catch (err) {
        // User cancelled or error occurred
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      {navigator.share && (
        <button
          onClick={handleNativeShare}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
          aria-label="Share"
        >
          <Share2 className="w-4 h-4" />
          <span className="text-sm">Share</span>
        </button>
      )}
      
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
        <span className="text-sm hidden sm:inline">Twitter</span>
      </a>

      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
        <span className="text-sm hidden sm:inline">LinkedIn</span>
      </a>

      <button
        onClick={handleCopyLink}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
        aria-label="Copy link"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            <span className="text-sm">Copied!</span>
          </>
        ) : (
          <>
            <Link2 className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}


