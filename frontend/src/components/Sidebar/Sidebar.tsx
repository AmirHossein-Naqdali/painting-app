import React from 'react';
import './Sidebar.css';
import { useGlobalContext } from '../../Context';
import ShapeDisplay from '../ShapeDisplay/ShapeDisplay';
import { Shape } from '../../types';

function Sidebar(): React.ReactElement {
  const { setSelectedShape, selectedShape } = useGlobalContext();
  const { error } = useGlobalContext();

  const handleButtonClick = (shape: Shape['type']): ((e: React.MouseEvent<HTMLButtonElement>) => void) => {
    return function (event: React.MouseEvent<HTMLButtonElement>): void{
      event.stopPropagation();
      setSelectedShape(shape);
    }
  };

  return (
    <div className="Sidebar" onClick={() => setSelectedShape(null)}>
        <p className="tools-title">Tools</p>
        <button className={selectedShape === 'circle' ? 'active' : ''} onClick={handleButtonClick('circle')} disabled={error !== null}>
          <ShapeDisplay type="circle" />
          <span>Circle</span>
        </button>
        <button className={selectedShape === 'square' ? 'active' : ''} onClick={handleButtonClick('square')} disabled={error !== null}>
          <ShapeDisplay type="square" />
          <span>Square</span>
        </button>
        <button className={selectedShape === 'triangle' ? 'active' : ''} onClick={handleButtonClick('triangle')} disabled={error !== null}>
          <ShapeDisplay type="triangle" />
          <span>Triangle</span>
        </button>
    </div>
  );
}

export default Sidebar;
