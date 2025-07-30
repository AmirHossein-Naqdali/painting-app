import { Drawing, Shape, User } from './types';

const API_BASE_URL = "http://localhost:8080/api";

export const getUsers = async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
        throw new Error('Failed to fetch users from the server.');
    }
    return response.json();
};

export const getDrawingForUser = async (username: string): Promise<Drawing> => {
    const response = await fetch(`${API_BASE_URL}/drawings/${username}`);

    if (!response.ok) {
        if (response.status === 404) {
            return { title: "Untitled", shapes: [] };
        }
        throw new Error(`Failed to fetch drawing for user ${username}`);
    }

    const data = await response.json();
    let shapes: Shape[] = [];
    if (data.content) {
        try {
            shapes = JSON.parse(data.content);
        } catch (e) {
            console.error("Failed to parse drawing content:", e);
        }
    }
    return { title: data.title || "Untitled", shapes };
};

export const saveDrawingForUser = async (username: string, title: string, shapes: Shape[]): Promise<void> => {
    const payload = {
        title: title,
        content: JSON.stringify(shapes)
    };

    const response = await fetch(`${API_BASE_URL}/drawings/${username}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`Failed to save drawing for user ${username}`);
    }
};
