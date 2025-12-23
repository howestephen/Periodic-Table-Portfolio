import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Youtube, Figma, Music } from "lucide-react";
import { portfolioItems, skillElements } from "../data/portfolio-data";
import { FullscreenViewer } from "./FullscreenViewer";
import { PortfolioFilters } from "./PortfolioFilters";
import { SearchBar } from "./SearchBar";
import { getYouTubeThumbnail } from "../utils/media-helpers";
import { getFigmaPlaceholder } from "../utils/figma-helpers";
import type { PortfolioItem } from "../data/portfolio-data";

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date-desc");

  // Remove leading slash if present and use the category param directly
  const categoryKey = category || "";
  const allItems = portfolioItems[categoryKey] || [];
  const element = skillElements.find((el) => el.route === `/${categoryKey}`);

  // Extract unique companies and years for filters
  const companies = useMemo(() => {
    const uniqueCompanies = new Set(allItems.map((item) => item.company));
    return Array.from(uniqueCompanies).sort();
  }, [allItems]);

  const years = useMemo(() => {
    const uniqueYears = new Set(allItems.map((item) => item.year));
    return Array.from(uniqueYears).sort((a, b) => b - a);
  }, [allItems]);

  // Filter items based on selected filters
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const companyMatch =
        selectedCompany === "all" || item.company === selectedCompany;
      const yearMatch =
        selectedYear === "all" || item.year.toString() === selectedYear;
      return companyMatch && yearMatch;
    });
  }, [allItems, selectedCompany, selectedYear]);

  // Sort items based on selected sort option
  const sortedItems = useMemo(() => {
    const items = [...filteredItems];

    switch (sortBy) {
      case "date-desc":
        return items.sort((a, b) => b.year - a.year);
      case "date-asc":
        return items.sort((a, b) => a.year - b.year);
      case "company-asc":
        return items.sort((a, b) => a.company.localeCompare(b.company));
      case "company-desc":
        return items.sort((a, b) => b.company.localeCompare(a.company));
      default:
        return items;
    }
  }, [filteredItems, sortBy]);

  const handleResetFilters = () => {
    setSelectedCompany("all");
    setSelectedYear("all");
  };

  if (!element) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-white mb-4">Category not found</h1>
          <Link
            to="/"
            className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black py-12 px-4 relative overflow-hidden">
        {/* Animated neon gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/30 via-purple-900/20 to-red-900/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,0,128,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,38,38,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/20 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Table
              </Link>
              <SearchBar />
            </div>

            <div className="flex items-center gap-6 mb-4">
              <div
                className={`${element.color} p-8 rounded-2xl border-4 border-white/30`}
              >
                <h2 className="text-white text-6xl font-bold">
                  {element.symbol}
                </h2>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl text-white capitalize mb-2">
                  {element.title}
                </h1>
                <p className="text-xl text-gray-400">{element.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          {allItems.length > 0 && (
            <PortfolioFilters
              companies={companies}
              years={years}
              selectedCompany={selectedCompany}
              selectedYear={selectedYear}
              sortBy={sortBy}
              onCompanyChange={setSelectedCompany}
              onYearChange={setSelectedYear}
              onSortChange={setSortBy}
              onReset={handleResetFilters}
            />
          )}

          {/* Portfolio Grid */}
          {sortedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedItems.map((item, index) => {
                // Get thumbnail based on type
                let thumbnail = item.thumbnail;

                if (!thumbnail) {
                  if (item.type === "youtube") {
                    thumbnail = getYouTubeThumbnail(item.url);
                  } else if (item.type === "figma") {
                    // Figma doesn't provide direct image URLs, use a placeholder
                    thumbnail = getFigmaPlaceholder();
                  } else if (item.type === "audio") {
                    // Audio files need a thumbnail - use a default or require one
                    thumbnail = "/images/audio-placeholder.jpg";
                  } else if (
                    item.type === "video" &&
                    item.url.startsWith("/")
                  ) {
                    // Local video files need a thumbnail - use a default or require one
                    thumbnail = "/images/video-placeholder.jpg";
                  } else {
                    thumbnail = item.url;
                  }
                }

                return (
                  <div
                    key={item.id}
                    className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-gray-800 hover:scale-105 transition-transform duration-300"
                    onClick={() => {
                      setSelectedItem(item);
                      setSelectedItemIndex(index);
                    }}
                  >
                    {item.type === "figma" && !item.thumbnail ? (
                      <div className="w-full h-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                        <div className="text-center p-8">
                          <Figma className="w-16 h-16 text-white mx-auto mb-4 opacity-80" />
                          <p className="text-white text-sm font-medium">
                            Figma Design
                          </p>
                          <p className="text-white/70 text-xs mt-2">
                            Click to view
                          </p>
                        </div>
                      </div>
                    ) : item.type === "audio" && !item.thumbnail ? (
                      <div className="w-full h-full bg-gradient-to-br from-orange-600 to-orange-800 flex items-center justify-center">
                        <div className="text-center p-8">
                          <Music className="w-16 h-16 text-white mx-auto mb-4 opacity-80" />
                          <p className="text-white text-sm font-medium">
                            Audio Track
                          </p>
                          <p className="text-white/70 text-xs mt-2">
                            Click to play
                          </p>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback for broken images
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (
                            parent &&
                            !parent.querySelector(".image-fallback")
                          ) {
                            const fallback = document.createElement("div");
                            fallback.className =
                              "image-fallback w-full h-full bg-gray-700 flex items-center justify-center";
                            fallback.innerHTML = `<p class="text-gray-400 text-sm">Image not available</p>`;
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded">
                        {item.year}
                      </span>
                      {item.type === "youtube" && (
                        <span className="px-2 py-1 bg-red-600/80 backdrop-blur-sm text-white text-xs rounded flex items-center gap-1">
                          <Youtube className="w-3 h-3" />
                          YouTube
                        </span>
                      )}
                      {item.type === "figma" && (
                        <span className="px-2 py-1 bg-purple-600/80 backdrop-blur-sm text-white text-xs rounded flex items-center gap-1">
                          <Figma className="w-3 h-3" />
                          Figma
                        </span>
                      )}
                      {item.type === "audio" && (
                        <span className="px-2 py-1 bg-orange-600/80 backdrop-blur-sm text-white text-xs rounded flex items-center gap-1">
                          <Music className="w-3 h-3" />
                          Audio
                        </span>
                      )}
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      {(item.type === "video" || item.type === "youtube") && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                        </div>
                      )}
                      {item.type === "figma" && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Figma className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      )}
                      {item.type === "audio" && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Music className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      )}
                      <h3 className="text-white text-xl mb-1">{item.title}</h3>
                      <p className="text-gray-300 text-sm mb-2">
                        {item.description}
                      </p>
                      <p className="text-gray-400 text-xs">{item.company}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">
                No items in this category yet
              </p>
            </div>
          )}
        </div>
      </div>

      <FullscreenViewer
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        items={sortedItems}
        currentIndex={selectedItemIndex}
        onNavigate={(index) => {
          setSelectedItem(sortedItems[index]);
          setSelectedItemIndex(index);
        }}
      />
    </>
  );
}
