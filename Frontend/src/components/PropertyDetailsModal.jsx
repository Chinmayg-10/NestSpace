import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const PropertyDetailsModal = ({ 
  property, 
  isOpen, 
  onClose, 
  onAddToWishlist,user
}) => {
  const navigate = useNavigate();

  if (!isOpen || !property) return null;

  const handleScheduleClick = () => {
    navigate('/schedule', { state: { property } });
  };

  const isInWishlist = user?.wishlist?.includes(property._id);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="property-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>×</button>

        {/* Property Image */}
        <img src={property.image} alt={property.title} className="modal-image" />

        {/* Content Section */}
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">{property.title}</h2>

            {/* Wishlist Button */}
            <button 
              className={`wishlist-btn ${isInWishlist ? "active" : ""}`} 
              onClick={() => onAddToWishlist(property)}
            >
              {isInWishlist ? "💔 Remove" : "❤️ Wishlist"}
            </button>
          </div>

          <p className="modal-address">📍 {property.address}</p>
          
          {/* Price */}
          <p className="modal-price">
            {property.type === 'rent'
              ? `$${property.price.toLocaleString()}/month`
              : `$${property.price.toLocaleString()}`}
          </p>

          {/* Tags */}
          <div className="modal-tags">
            <span>🛏 {property.bedrooms} Beds</span>
            <span>🚿 {property.bathrooms} Baths</span>
            <span>📐 {property.sqft} sqft</span>
            <span className={`tag ${property.type}`}>{property.type.toUpperCase()}</span>
          </div>

          {/* Description */}
          <div className="modal-description">
            <h4>Description</h4>
            <p>{property.description}</p>
          </div>

          {/* CTA Button */}
          <button className="btn-primary" onClick={handleScheduleClick}>
            Schedule Viewing
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsModal;


