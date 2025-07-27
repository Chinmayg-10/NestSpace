import '../App.css';

const Header = ({
  viewMode,
  setViewMode,
  isLoggedIn,
  handleLogout,
  handleLogin,
  role,
  handleAddProperty,
  handleMyProperties,
}) => {
  return (
    <header className="app-header flex justify-between items-center px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
        🏠 Real Estate Listings {role ? <span className="text-gray-500 text-lg">({role})</span>: ""}
      </h1>

      {/* Owner-specific buttons */}
      {role === 'owner' && isLoggedIn && (
        <div className="flex gap-3 mr-4">
          <button
            onClick={handleAddProperty}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
          >
            ➕ Add Property
          </button>
          <button
            onClick={handleMyProperties}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm"
          >
            📋 My Properties
          </button>
        </div>
      )}

      {/* View Toggle Buttons */}
      <div className="view-toggle flex gap-2">
        <button
          className={`px-4 py-2 rounded-md text-sm ${
            viewMode === 'grid'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setViewMode('grid')}
        >
          Grid View
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm ${
            viewMode === 'map'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setViewMode('map')}
        >
          Map View
        </button>
      </div>

      {/* Auth Button */}
      <div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

