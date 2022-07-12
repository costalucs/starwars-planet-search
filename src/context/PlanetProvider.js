import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import usePlanetsList from '../hooks/usePlanets';

export const planetContext = createContext();

function PlanetProvider(props) {
  const { children } = props;
  const [data] = usePlanetsList();
  const [planets, setPlanet] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

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

  const resetPlanets = () => {
    setPlanet(data);
  };

  const handleFilter = (state) => {
    // console.log(state);
    // console.log(planets);
    const { columnFilter, comparisson, valueFilter } = state;
    if (comparisson === 'maior que') {
      const planetsFiltered = planets.filter((item) => (
        Number(item[columnFilter]) > Number(valueFilter)
      ));
      return setPlanet(planetsFiltered);
    }
    if (comparisson === 'menor que') {
      const planetsFiltered = planets.filter((item) => (
        Number(item[columnFilter]) < Number(valueFilter)
      ));
      return setPlanet(planetsFiltered);
    }
    const planetsFiltered = planets.filter((item) => (
      Number(item[columnFilter]) === Number(valueFilter)
    ));
    return setPlanet(planetsFiltered);
  };

  // didMount
  useEffect(() => {
    if (data) {
      setPlanet(data);
    }
  }, [data]);

  const context = {
    planets,
    data,
    handleFilterByName,
    handleFilter,
    resetPlanets,
    setPlanet,
    filterByNumericValues,
    setFilterByNumericValues,

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
