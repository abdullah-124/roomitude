import React, { useState, useRef, useCallback } from 'react';

const PriceRangeInputSlider = ({ 
  min = 0, 
  max = 1000, 
  minValue, 
  maxValue,
  onChange = () => {}
}) => {
  const [isDragging, setIsDragging] = useState(null);
  const sliderRef = useRef(null);

  const getPercentage = (value) => ((value - min) / (max - min)) * 100;

  const handleMouseDown = (type) => (e) => {
    setIsDragging(type);
    e.preventDefault();
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const value = Math.round((percentage / 100) * (max - min) + min);

    if (isDragging === 'min') {
      const newMinValue = Math.min(value, maxValue - 1);
      onChange(Math.max(min, newMinValue), maxValue);
    } else if (isDragging === 'max') {
      const newMaxValue = Math.max(value, minValue + 1);
      onChange(minValue, Math.min(max, newMaxValue));
    }
  }, [isDragging, min, max, minValue, maxValue, onChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const minPercentage = getPercentage(minValue);
  const maxPercentage = getPercentage(maxValue);

  return (
    <div className="relative px-3">
      {/* Track */}
      <div 
        ref={sliderRef}
        className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
      >
        {/* Active Range */}
        <div
          className="absolute h-2 bg-[var(--sbg)] rounded-full"
          style={{
            left: `${minPercentage}%`,
            width: `${maxPercentage - minPercentage}%`
          }}
        />
        
        {/* Min Thumb */}
        <div
          className={`absolute w-6 h-6 bg-white border-3 border-[var(--sbg)] rounded-full cursor-grab transform -translate-y-2 -translate-x-3 transition-transform hover:scale-110 ${
            isDragging === 'min' ? 'scale-110 cursor-grabbing' : ''
          }`}
          style={{ left: `${minPercentage}%` }}
          onMouseDown={handleMouseDown('min')}
        >
          <div className="w-2 h-2 bg-orange-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        {/* Max Thumb */}
        <div
          className={`absolute w-6 h-6 bg-white border-3 border-[var(--sbg)] rounded-full cursor-grab transform -translate-y-2 -translate-x-3 transition-transform hover:scale-110 ${
            isDragging === 'max' ? 'scale-110 cursor-grabbing' : ''
          }`}
          style={{ left: `${maxPercentage}%` }}
          onMouseDown={handleMouseDown('max')}
        >
          <div className="w-2 h-2 bg-[var(--sbg)] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeInputSlider