import { ReactNode, useContext, createContext, useState } from "react";
import { Shape, GlobalContextType } from "./types";

const GlobalContext: React.Context<GlobalContextType | null> = createContext<GlobalContextType | null>(null);

const GlobalState : React.FC<{children: ReactNode}> = ({children}) => {
    const [numberOfCircles, setNumberOfCircles] = useState<number>(0);
    const [numberOfSquares, setNumberOfSquares] = useState<number>(0);
    const [numberOfTriangles, setNumberOfTriangles] = useState<number>(0);
    const [selectedShape, setSelectedShape] = useState<Shape['type'] | null>(null);
    const [shapes, setShapes] = useState<Shape[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const globalContextValue: GlobalContextType = {
        numberOfCircles: numberOfCircles, setNumberOfCircles: setNumberOfCircles,
        numberOfSquares: numberOfSquares, setNumberOfSquares: setNumberOfSquares,
        numberOfTriangles: numberOfTriangles, setNumberOfTriangles: setNumberOfTriangles,
        selectedShape, setSelectedShape,
        shapes, setShapes,
        isLoading, setIsLoading,
        error, setError
    };

    return (
        <GlobalContext.Provider value={globalContextValue}>
            {children}
        </GlobalContext.Provider>
    );
};

const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalState provider');
    }
    return context;
};

export default GlobalState;
export {useGlobalContext};
