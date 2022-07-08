import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import usePlanetsList from '../hooks/usePlanets';

export const planetContext = createContext();

function PlanetProvider(props) {
  const { children } = props;
  const [data] = usePlanetsList();

  const context = {
    planets: data,
  };

  return (
    <planetContext.Provider value={ context }>
      {children}
    </planetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default PlanetProvider;
