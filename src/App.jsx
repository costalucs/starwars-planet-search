import React from 'react';
import './App.css';
import TableTitles from './components/TableTitles';
import PlanetProvider from './context/PlanetProvider';
import Header from './components/Header';

function App() {
  return (
    <main>
      <PlanetProvider>
        <Header />
        <TableTitles />
      </PlanetProvider>
    </main>
  );
}

export default App;
