import { Link } from "react-router-dom";
import { ElementCard } from "./ElementCard";
import { SearchBar } from "./SearchBar";
import { skillElements } from "../data/portfolio-data";

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black py-12 px-4 relative overflow-hidden">
      {/* Animated neon gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/30 via-purple-900/20 to-red-900/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,0,128,0.15),transparent_50%)] animate-pulse"></div>
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,38,38,0.15),transparent_50%)] animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-red-950/20 via-transparent to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <SearchBar />
          </div>
          <h1 className="text-5xl md:text-7xl text-white mb-4">
            The Periodic Table of <br />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-500 to-red-500">
              Stephen Howe
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            My skills can be combined like an array of elements. Design,
            development, art, audio and animation all combine to form exciting
            new assets.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/about"
              className="px-6 py-3 bg-gradient-to-r from-fuchsia-600/20 to-red-600/20 hover:from-fuchsia-600/30 hover:to-red-600/30 text-white rounded-lg transition-all border border-fuchsia-500/30 hover:border-fuchsia-400/50 hover:shadow-lg hover:shadow-fuchsia-500/20"
            >
              About Me
            </Link>
          </div>
        </header>

        {/* Periodic Table Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillElements.map((element, index) => (
            <div
              key={element.symbol}
              className="animate-in fade-in slide-in-from-bottom-4"
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: "both",
                animationDuration: "500ms",
              }}
            >
              <ElementCard element={element} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-500">
          <p className="text-sm">
            Click on any element to explore the portfolio
          </p>
        </footer>
      </div>
    </div>
  );
}
