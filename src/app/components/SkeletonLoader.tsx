export function SkeletonCard() {
  return (
    <div className="group relative aspect-video rounded-xl overflow-hidden bg-gray-800 animate-pulse">
      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800" />
      <div className="absolute top-3 left-3">
        <div className="h-6 w-16 bg-gray-700 rounded" />
      </div>
    </div>
  );
}

export function SkeletonElementCard() {
  return (
    <div className="relative p-6 rounded-2xl border-4 border-white/30 bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse flex flex-col justify-between min-h-[220px] aspect-square">
      <div className="absolute top-4 right-4">
        <div className="w-6 h-6 bg-gray-600 rounded" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="h-20 w-20 bg-gray-600 rounded" />
      </div>
      <div className="border-t-2 border-white/40 pt-3 mt-3">
        <div className="h-6 w-32 bg-gray-600 rounded mb-2" />
        <div className="h-4 w-24 bg-gray-600 rounded" />
      </div>
    </div>
  );
}


