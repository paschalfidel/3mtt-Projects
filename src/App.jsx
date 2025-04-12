import React from 'react';
import ApiListDisplay from './components/ApiListDisplay.jsx';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Omens Blog API Display</h1>
      </header>
      <main>
        <ApiListDisplay />
      </main>
    </div>
  );
}

export default App;