import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import usePlanetsList from '../hooks/usePlanets';

export const planetContext = createContext();

function PlanetProvider(props) {
  const { children } = props;
  const [data] = usePlanetsList();
  const [planets, setPlanet] = useState();

  // filtrando pelo nome
  const handleFilterByName = ({ target: { value } }) => {
    if (value !== '') {
      const planetsFiltered = data.filter((item) => item.name
        .toLowerCase().includes(value));
      setPlanet(planetsFiltered);
    } else {
      setPlanet(data);
    }
  };

  // didMount
  useEffect(() => {
    if (data) {
      setPlanet(data);
    }
  }, [data]);

  const context = {
    planets,
    handleFilterByName,
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
