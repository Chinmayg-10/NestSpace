import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PropertyCarousel({ images = [] }) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);
  const next = () => setIndex((prev) => (prev + 1) % images.length);

  // Auto-slide every 5s
  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => clearInterval(intervalRef.current);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 md:h-96 flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded">
        <p className="text-gray-500 dark:text-gray-400">No images available</p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-64 md:h-96 overflow-hidden rounded mb-6"
      onMouseEnter={() => clearInterval(intervalRef.current)}
      onMouseLeave={() => (intervalRef.current = setInterval(next, 5000))}
    >
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`Property image ${i + 1}`}
          className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}

      {/* Prev Button */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow hover:bg-white hover:scale-105 transition"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Next Button */}
      <button
        onClick={next}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow hover:bg-white hover:scale-105 transition"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
