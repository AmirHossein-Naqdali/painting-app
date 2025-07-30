import React from 'react';
import './Footer.css';
import {useGlobalContext} from '../../Context';
import ShapeDisplay from '../ShapeDisplay/ShapeDisplay';

const Footer: React.FC = () => {
  const {numberOfCircles, numberOfSquares, numberOfTriangles} = useGlobalContext();

  return (
    <div className="Footer">
        <div className="shape-counter">
            <ShapeDisplay type="circle" />
            <p className="count">{numberOfCircles}</p>
        </div>
        <div className="shape-counter">
            <ShapeDisplay type="square" />
            <p className="count">{numberOfSquares}</p>
        </div>
        <div className="shape-counter">
            <ShapeDisplay type="triangle" />
            <p className="count">{numberOfTriangles}</p>
        </div>
    </div>
  );
}

export default Footer;
