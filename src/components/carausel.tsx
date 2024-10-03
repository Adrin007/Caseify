import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import PhoneSkel from "./phoneSkel";

const images = [
    "/testimonials/1.jpeg",
    "/testimonials/2.jpeg",
    "/testimonials/3.jpeg",
    "/testimonials/4.jpeg",
    "/testimonials/5.jpeg",
    "/testimonials/6.jpeg",
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Function to handle swipe and arrow navigation
  const handleNext = () => setCurrentIndex((currentIndex + 1) % images.length);
  const handlePrev = () => setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  // Swipe handler
  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  return (
    <div {...handlers} className="carousel-container relative overflow-hidden w-full h-64">
      <div className="carousel-wrapper flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div className={`carousel-slide w-full h-64 flex-shrink-0 relative ${index === currentIndex ? "active" : "inactive"}`} key={index}>
            <PhoneSkel ImgSRC={image}></PhoneSkel>
          </div>
        ))}
      </div>

      {/* Left and Right Navigation Buttons */}
      <button onClick={handlePrev} className="absolute left-0 inset-y-0 text-white text-xl bg-black bg-opacity-50 p-2">{"<"}</button>
      <button onClick={handleNext} className="absolute right-0 inset-y-0 text-white text-xl bg-black bg-opacity-50 p-2">{">"}</button>
    </div>
  );
};

export default Carousel;
