import "../App.css";

const PropertyCard = ({ 
  property, 
  user, 
  setUser, 
  onClick, 
  onScheduleViewing,
  isOwner = false,
  onDelete
}) => {
  const formatPrice = (price, type) => {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);

    return type === "rent" ? `${formatted}/month` : formatted;
  };

  const handleWishlist = async (e) => {
    e.stopPropagation();
    if (!user) {
      alert("Login to add to wishlist!");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/user/wishlist/${property._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id }),
        }
      );

      const data = await res.json();
      if (data.success) {
        alert("Wishlist updated!");
        // Update user wishlist in frontend
        setUser((prev) => ({ ...prev, wishlist: data.wishlist }));
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, wishlist: data.wishlist })
        );
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error updating wishlist:", err);
      alert("Something went wrong!");
    }
  };

  const isInWishlist = user?.wishlist?.includes(property._id);

  return (
    <div className="property-card" onClick={onClick}>
      <img
        src={property.image}
        alt={property.title}
        className="property-image"
        loading="lazy"
      />
      <div className="property-details">
        <div className="property-header">
          <h3>{property.title}</h3>
          <span className={`property-type ${property.type}`}>
            {property.type.toUpperCase()}
          </span>
        </div>
        <p className="property-price">
          {formatPrice(property.price, property.type)}
        </p>
        <p className="property-address">📍 {property.address}</p>
        <div className="property-specs">
          <span>🛏️ {property.bedrooms} bed</span>
          <span>🚿 {property.bathrooms} bath</span>
          <span>📐 {property.sqft} sqft</span>
        </div>
        <div className="property-actions">
          {isOwner ? (
            <button 
              className="delete-btn" 
              onClick={(e) => {
                e.stopPropagation();
                if(onDelete) onDelete(property._id);
              }}
            >
              🗑 Delete
            </button>
          ) : (
            <>
              <button className="schedule-btn" onClick={onScheduleViewing}>
                Schedule Viewing
              </button>
              <button
                className={`wishlist-btn ${isInWishlist ? "active" : ""}`}
                onClick={handleWishlist}
              >
                {isInWishlist ? "💔 Remove" : "❤️ Wishlist"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

