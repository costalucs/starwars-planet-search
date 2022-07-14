import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import usePlanetsList from '../hooks/usePlanets';

export const planetContext = createContext();

function PlanetProvider(props) {
  const { children } = props;
  const [data] = usePlanetsList();
  const [planets, setPlanet] = useState();
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const planetasFiltrados = data;

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

  const handleFilter = (filters, datas) => {
    if (filters.length !== 0) {
      filters.forEach((filter) => {
        const planetsFiltered = datas.filter((planet) => {
          if (filter.comparisson === 'maior que') {
            return Number(planet[filter.columnFilter]) > Number(filter.valueFilter);
          }
          if (filter.comparisson === 'menor que') {
            return Number(planet[filter.columnFilter]) < Number(filter.valueFilter);
          }
          return Number(planet[filter.columnFilter]) === Number(filter.valueFilter);
        });
        setPlanet(planetsFiltered);
      });
    }
  };

  useEffect(() => {
    handleFilter(filterByNumericValues, planetasFiltrados);
  }, [filterByNumericValues, planetasFiltrados]);

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
    planetasFiltrados,
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
