import '../App.css'
import "../index.css"

const FilterBar = ({ filters, onFiltersChange }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    onFiltersChange({ type: 'all', minPrice: '', maxPrice: '' });
  };

  return (
    <div className="filter-bar shadow-md p-4 bg-white rounded-lg flex flex-wrap gap-4 justify-between items-center">
      {/* Property Type Filter */}
      <div className="filter-group flex flex-col">
        <label className="text-sm text-gray-600">Type:</label>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={filters.type || 'all'}
          onChange={(e) => handleFilterChange('type', e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="rent">For Rent</option>
          <option value="sale">For Sale</option>
        </select>
      </div>

      {/* Min Price Filter */}
      <div className="filter-group flex flex-col">
        <label className="text-sm text-gray-600">Min Price:</label>
        <input
          type="number"
          className="border rounded px-2 py-1 text-sm"
          placeholder="e.g. 500"
          value={filters.minPrice || ''}
          onChange={(e) => handleFilterChange('minPrice', e.target.value)}
        />
      </div>

      {/* Max Price Filter */}
      <div className="filter-group flex flex-col">
        <label className="text-sm text-gray-600">Max Price:</label>
        <input
          type="number"
          className="border rounded px-2 py-1 text-sm"
          placeholder="e.g. 2000"
          value={filters.maxPrice || ''}
          onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
        />
      </div>

      {/* Reset Filters */}
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm mt-4 md:mt-0"
        onClick={resetFilters}
      >
        Reset
      </button>
    </div>
  );
};

export default FilterBar;

      