import React from 'react';
import './App.css';
import TableTitles from './components/TableTitles';
import PlanetProvider from './context/PlanetProvider';
import Header from './components/Header';
import InputText from './components/InputText';
import NumericFilter from './components/NumericFilter';

function App() {
  return (
    <main>
      <PlanetProvider>
        <Header />
        <div>
          <InputText />
        </div>
        <NumericFilter />
        <TableTitles />
      </PlanetProvider>
    </main>
  );
}

export default App;
