import { Filter } from 'lucide-react';

interface PortfolioFiltersProps {
  companies: string[];
  years: number[];
  selectedCompany: string;
  selectedYear: string;
  sortBy: string;
  onCompanyChange: (company: string) => void;
  onYearChange: (year: string) => void;
  onSortChange: (sort: string) => void;
  onReset: () => void;
}

export function PortfolioFilters({
  companies,
  years,
  selectedCompany,
  selectedYear,
  sortBy,
  onCompanyChange,
  onYearChange,
  onSortChange,
  onReset
}: PortfolioFiltersProps) {
  const hasActiveFilters = selectedCompany !== 'all' || selectedYear !== 'all';

  return (
    <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-white" />
        <h3 className="text-white">Filters & Sorting</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Company Filter */}
        <div>
          <label htmlFor="company-filter" className="block text-sm text-gray-400 mb-2">
            Company
          </label>
          <select
            id="company-filter"
            value={selectedCompany}
            onChange={(e) => onCompanyChange(e.target.value)}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500/50 focus:shadow-lg focus:shadow-fuchsia-500/20"
          >
            <option value="all">All Companies</option>
            {companies.map((company) => (
              <option key={company} value={company} className="bg-gray-800">
                {company}
              </option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label htmlFor="year-filter" className="block text-sm text-gray-400 mb-2">
            Year
          </label>
          <select
            id="year-filter"
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500/50 focus:shadow-lg focus:shadow-fuchsia-500/20"
          >
            <option value="all">All Years</option>
            {years.map((year) => (
              <option key={year} value={year.toString()} className="bg-gray-800">
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label htmlFor="sort-filter" className="block text-sm text-gray-400 mb-2">
            Sort By
          </label>
          <select
            id="sort-filter"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500/50 focus:shadow-lg focus:shadow-fuchsia-500/20"
          >
            <option value="date-desc" className="bg-gray-800">Latest First</option>
            <option value="date-asc" className="bg-gray-800">Oldest First</option>
            <option value="company-asc" className="bg-gray-800">Company (A-Z)</option>
            <option value="company-desc" className="bg-gray-800">Company (Z-A)</option>
          </select>
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <div className="flex items-end">
            <button
              onClick={onReset}
              className="w-full px-4 py-2 bg-gradient-to-r from-fuchsia-600/20 to-red-600/20 hover:from-fuchsia-600/30 hover:to-red-600/30 text-fuchsia-300 rounded-lg transition-all border border-fuchsia-500/30 hover:border-fuchsia-400/50 hover:shadow-lg hover:shadow-fuchsia-500/20"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}