import { useNavigate } from "react-router-dom";

export default function PropertyCard({ property }) {
  const navigate = useNavigate();

  return (
    <div
      className="border rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden bg-white dark:bg-gray-800"
      onClick={() => navigate(`/properties/${property._id}`)}
    >
      {/* Property Image */}
      <img
        src={property.images?.[0] || "https://via.placeholder.com/400x300"}
        alt={property.title}
        className="w-full h-56 object-cover"
      />

      {/* Card Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">
          {property.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">{property.location}</p>

        <p className="mt-2 text-primary font-semibold">
          ${property.price?.toLocaleString()}
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {property.bedrooms} beds • {property.bathrooms} baths • {property.type}
        </p>
      </div>
    </div>
  );
}







