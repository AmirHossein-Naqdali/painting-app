interface Shape {
    type: 'circle' | 'square' | 'triangle';
    x: number;
    y: number;
}

interface GlobalContextType {
    numberOfCircles: number;
    setNumberOfCircles: (arg: number | ((prev: number) => number)) => void;
    numberOfSquares: number;
    setNumberOfSquares: (arg: number | ((prev: number) => number)) => void;
    numberOfTriangles: number;
    setNumberOfTriangles: (arg: number | ((prev: number) => number)) => void;
    selectedShape: Shape['type'] | null;
    setSelectedShape: (shape: Shape['type'] | null) => void;
    shapes: Shape[];
    setShapes: (shapes: Shape[] | ((prev: Shape[]) => Shape[])) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    error: string | null;
    setError: (error: string | null) => void;
}

interface User {
    id: string;
    username: string;
}

interface Drawing {
    title: string;
    shapes: Shape[];
}

export type {Shape, GlobalContextType, User, Drawing};
