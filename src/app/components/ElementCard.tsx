import { Link } from 'react-router-dom';
import { Brain, Video, Palette, Music, Sparkles, Box, Layout, Code, Camera } from 'lucide-react';
import { SkillElement } from '../data/portfolio-data';

interface ElementCardProps {
  element: SkillElement;
}

const iconMap = {
  brain: Brain,
  video: Video,
  palette: Palette,
  music: Music,
  sparkles: Sparkles,
  box: Box,
  layout: Layout,
  code: Code,
  camera: Camera
};

export function ElementCard({ element }: ElementCardProps) {
  const Icon = iconMap[element.iconType as keyof typeof iconMap] || Code;

  return (
    <Link
      to={element.route}
      className={`
        ${element.color}
        relative p-6 rounded-2xl border-4 border-white/30
        shadow-xl hover:scale-105 hover:shadow-2xl
        transition-all duration-300 cursor-pointer
        flex flex-col justify-between
        min-h-[220px] aspect-square
        group
      `}
    >
      {/* Icon */}
      <div className="absolute top-4 right-4 opacity-70 group-hover:opacity-100 transition-opacity">
        <Icon className="w-6 h-6 text-white" />
      </div>

      {/* Symbol */}
      <div className="flex-1 flex items-center justify-center">
        <h2 className="text-white text-7xl font-bold tracking-tight">
          {element.symbol}
        </h2>
      </div>

      {/* Title and Subtitle */}
      <div className="border-t-2 border-white/40 pt-3 mt-3">
        <h3 className="text-white text-lg font-medium lowercase mb-1">
          {element.title}
        </h3>
        <p className="text-white/90 text-sm">
          {element.subtitle}
        </p>
      </div>
    </Link>
  );
}
