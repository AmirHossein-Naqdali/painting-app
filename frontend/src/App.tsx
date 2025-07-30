import React from 'react';
import './App.css';
import Canvas from './components/Canvas/Canvas';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import GlobalState from './Context';

function App(): React.ReactElement {
  return (
    <GlobalState>
      <div className="App">
        <Header />
        <div className="main-content">
          <div className="left-panel">
            <Canvas />
            <Footer />
          </div>
          <Sidebar />
        </div>
      </div>
    </GlobalState>
  );
}

export default App;
