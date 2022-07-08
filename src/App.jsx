import React from 'react';
import './App.css';
import TableTitles from './components/TableTitles';
import PlanetProvider from './context/PlanetProvider';
import Header from './components/Header';
import InputText from './components/InputText';

function App() {
  return (
    <main>
      <PlanetProvider>
        <Header />
        <InputText />
        <TableTitles />
      </PlanetProvider>
    </main>
  );
}

export default App;
