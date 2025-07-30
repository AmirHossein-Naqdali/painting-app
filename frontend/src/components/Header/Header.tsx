import React, {useState, useRef, useEffect} from 'react';
import './Header.css';
import { useGlobalContext } from '../../Context';
import { Shape, User } from '../../types';
import { saveDrawingForUser, getDrawingForUser, getUsers } from '../../api';

function Header(): React.ReactElement {
  const [fileName, setFileName] = useState<string>('Untitled');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null); // Default to 'alice'

  const {
    shapes,
    setShapes,
    setNumberOfCircles,
    setNumberOfSquares,
    setNumberOfTriangles,
    isLoading,
    setIsLoading,
    setError,
  } = useGlobalContext();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
          const userList = await getUsers();

          if (userList.length === 0){
            setError('No user found.');
            console.error('No user found.');
          }else {
            setUsers(userList);
            setIsLoading(false);
            setCurrentUser(userList[0].username);
          }
      } catch (err) {
          setError('Could not connect to the server. Please make sure the backend is running.');
          console.error(err);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (isLoading || (currentUser === null)) return;

    const loadDrawing = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const loadedDrawing = await getDrawingForUser(currentUser);
        setFileName(loadedDrawing.title);
        setShapes(loadedDrawing.shapes);

        let circles = 0;
        let squares = 0;
        let triangles = 0;
        loadedDrawing.shapes.forEach(shape => {
          if (shape.type === 'circle') circles++;
          else if (shape.type === 'square') squares++;
          else if (shape.type === 'triangle') triangles++;
        });
        setNumberOfCircles(circles);
        setNumberOfSquares(squares);
        setNumberOfTriangles(triangles);
      } catch (err) {
        setError(`Failed to load drawing for ${currentUser}.`);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadDrawing();
  }, [currentUser]);

  const handleSave = async () => {
    if (isLoading || (currentUser === null)) return;

    setIsSaving(true);
    setIsLoading(true);
    setError(null);
    try {
      await saveDrawingForUser(currentUser, fileName, shapes);
      alert('Drawing saved successfully!');
    } catch (err) {
      const errorMessage = 'Failed to save drawing.';
      setError(errorMessage);
      console.error(err);
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
      setIsSaving(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentUser(event.target.value);
  };


  const saveFile = (): void => {
    const content = JSON.stringify(shapes, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName + ".json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedShapes: Shape[] = JSON.parse(content);
        if (!Array.isArray(importedShapes))
            throw new Error("Invalid file format.");
        setShapes(importedShapes);
        let circles = 0;
        let squares = 0;
        let triangles = 0;
        importedShapes.forEach(shape => {
          if (shape.type === 'circle') circles++;
          else if (shape.type === 'square') squares++;
          else if (shape.type === 'triangle') triangles++;
        });
        setNumberOfCircles(circles);
        setNumberOfSquares(squares);
        setNumberOfTriangles(triangles);

        const index = file.name.lastIndexOf('.');
        if (index !== -1) setFileName(file.name.substring(0, index));
        else setFileName(file.name);
      } catch (error) {
        console.error("Failed to import canvas: ", error);
        alert("Failed to import file. Please make sure it's a valid canvas JSON file.");
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const importFile = (): void => {
    fileInputRef.current?.click();
  }

  return (
    <div className="Header">
      <div className="user-selector">
        <label htmlFor="user-select">Current User:</label>
        <select id="user-select" value={currentUser===null ? "" : currentUser} onChange={handleUserChange} disabled={isLoading}>
          {users.map(user => (<option key={user.id} value={user.username}>{user.username}</option>))}
        </select>
      </div>
      <div className='painting-title'>
        <label>Painting Title:</label>
        <input type="text" value={fileName} placeholder="Painting Title" onChange={(e) => setFileName(e.target.value)} disabled={isLoading}/>
      </div>
      <div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="application/json"
          style={{ display: 'none' }}/>
        <button onClick={importFile} disabled={isLoading}>Upload</button>
        <button onClick={saveFile} disabled={isLoading}>Download</button>
        <button onClick={handleSave} disabled={isLoading}>{isSaving ? 'Saving...' : 'Save Drawing'}</button>
      </div>
    </div>
  );
}

export default Header;
