import React from 'react';

const PaginationDots = ({ activeIndex, totalSlides, onDotClick }) => {
  return (
    <div className="pagination-dots">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          className={`dot ${activeIndex === index ? 'active' : ''}`}
          onClick={() => onDotClick(index)}
        ></button>
      ))}
    </div>
  );
};

export default PaginationDots;