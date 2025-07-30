import React from 'react';
import './ShapeDisplay.css';

interface ShapeDisplayProps {
  type: 'circle' | 'square' | 'triangle';
}

const ShapeDisplay: React.FC<ShapeDisplayProps> = ({ type }) => {
  return (
    <div className={`shape-display ${type}`}></div>
  );
};

export default ShapeDisplay;
