import React, {useState, useRef} from 'react';
import './Canvas.css';
import { useGlobalContext } from '../../Context';
import { Shape } from '../../types';

function Canvas(): React.ReactElement {
  const [selectedElement, setSelectedElement] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewShape, setPreviewShape] = useState<Shape | null>(null);
  const dragInfo = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0 });

  const {
    selectedShape,
    shapes,
    setShapes,
    setNumberOfCircles,
    setNumberOfSquares,
    setNumberOfTriangles,
    isLoading,
    error,
  } = useGlobalContext();

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    setSelectedElement(null);
    if (selectedShape && previewShape !== null) {
      setShapes((prevShapes) => [...prevShapes, previewShape]);
      if (previewShape.type === 'circle') setNumberOfCircles((prev) => prev + 1);
      else if (previewShape.type === 'square') setNumberOfSquares((prev) => prev + 1);
      else if (previewShape.type === 'triangle') setNumberOfTriangles((prev) => prev + 1);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && selectedElement !== null){
      const dx = e.clientX - dragInfo.current.startX;
      const dy = e.clientY - dragInfo.current.startY;
      const newShapes = shapes.map((shape, index) => {
        if (index === selectedElement)
          return {...shape, x: dragInfo.current.initialX + dx, y: dragInfo.current.initialY + dy,};
        return shape;
      });
      setShapes(newShapes);
    } else if (selectedShape !== null){
      const newPreviewShape: Shape = {
        type: selectedShape,
        x: e.clientX - e.currentTarget.getBoundingClientRect().left - 25,
        y: e.clientY - e.currentTarget.getBoundingClientRect().top - 25,
      };
      setPreviewShape(newPreviewShape);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setPreviewShape(null);
  };

  const handleShapeMouseDown = (index: number) => {
    return function(e: React.MouseEvent<HTMLDivElement>){
      if (selectedShape === null) {
        setSelectedElement(index);
        setIsDragging(true);
        dragInfo.current = {
          startX: e.clientX,
          startY: e.clientY,
          initialX: shapes[index].x,
          initialY: shapes[index].y,
        };
      }
    }
  };

  const handleElementDoubleClick = function (elementIndex: number): () => void {
    return function (): void {
      if (selectedShape === null){
        const element = shapes[elementIndex];
        if (element.type === 'circle') setNumberOfCircles((prev) => prev-1);
        else if (element.type === 'square') setNumberOfSquares((prev) => prev-1);
        else if (element.type === 'triangle') setNumberOfTriangles((prev) => prev-1);
        shapes.splice(elementIndex, 1);
      }
    }
  }

  return (
    <div className="Canvas" 
      onClick={handleCanvasClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}>

      {isLoading && <div className="canvas-overlay"><div className={error===null ? "loader" : ""}></div></div>}
      {error && <div className="canvas-overlay error-message">{error}</div>}
        
      {shapes.map((shape, index) => {
        const classType: string = `shape ${shape.type}`;
        const style : React.CSSProperties = {
          position: 'absolute',
          left: `${shape.x}px`,
          top: `${shape.y}px`,
        };
        return <div
                  key={index} 
                  className={classType}
                  style={style}
                  onMouseDown={handleShapeMouseDown(index)}
                  onDoubleClick={handleElementDoubleClick(index)} />
        })}
      {previewShape && (
        <div
          className={`shape ${previewShape.type} preview`}
          style={{left: `${previewShape.x}px`, top: `${previewShape.y}px`,}} />
      )}
    </div>
  );
}

export default Canvas;
