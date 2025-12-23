import { useState, useMemo, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { portfolioItems, skillElements } from '../data/portfolio-data';
import type { PortfolioItem } from '../data/portfolio-data';

interface SearchResult extends PortfolioItem {
  categoryTitle: string;
  categoryRoute: string;
}

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Search across all portfolio items
  const searchResults = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];

    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    Object.entries(portfolioItems).forEach(([categoryKey, items]) => {
      const element = skillElements.find(el => el.route === `/${categoryKey}`);
      
      items.forEach(item => {
        const matchesTitle = item.title.toLowerCase().includes(lowerQuery);
        const matchesDescription = item.description.toLowerCase().includes(lowerQuery);
        const matchesCompany = item.company.toLowerCase().includes(lowerQuery);
        const matchesCategory = element?.title.toLowerCase().includes(lowerQuery);

        if (matchesTitle || matchesDescription || matchesCompany || matchesCategory) {
          results.push({
            ...item,
            categoryTitle: element?.title || categoryKey,
            categoryRoute: `/${categoryKey}`
          });
        }
      });
    });

    return results.slice(0, 8); // Limit to 8 results
  }, [query]);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setQuery('');
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Toggle search with Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 hover:border-fuchsia-500/30 hover:shadow-lg hover:shadow-fuchsia-500/20"
        aria-label="Open search"
      >
        <Search className="w-5 h-5" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold text-gray-400 bg-white/10 border border-white/20 rounded">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
    );
  }

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search projects, companies, categories..."
          className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500/50 focus:shadow-lg focus:shadow-fuchsia-500/20"
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {(isFocused || query.length >= 2) && searchResults.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-gray-800 border border-white/20 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
          {searchResults.map((result) => (
            <Link
              key={result.id}
              to={result.categoryRoute}
              onClick={() => {
                setIsOpen(false);
                setQuery('');
              }}
              className="block px-4 py-3 hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium truncate">{result.title}</h4>
                  <p className="text-gray-400 text-sm truncate">{result.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{result.categoryTitle}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-xs text-gray-500">{result.company}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-xs text-gray-500">{result.year}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {query.length >= 2 && searchResults.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-gray-800 border border-white/20 rounded-lg shadow-xl p-4 text-center text-gray-400">
          No results found
        </div>
      )}
    </div>
  );
}


