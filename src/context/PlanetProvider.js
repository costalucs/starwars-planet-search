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
      return setPlanet(planetsFiltered);
    }
    setPlanet(data);
  };

  const handleFilter = (filters, datas) => {
    let copyData = datas;
    if (filters.length !== 0) {
      filters.forEach((filter) => {
        const columValue = Number(filter.valueFilter);
        console.log(columValue);
        if (filter.comparisson === 'maior que') {
          copyData = copyData.filter((item) => Number(item[filter
            .columnFilter]) > columValue);
        }
        if (filter.comparisson === 'menor que') {
          copyData = copyData.filter((item) => Number(item[filter
            .columnFilter]) < columValue);
        }
        if (filter.comparisson === 'igual a') {
          copyData = copyData.filter((item) => Number(item[filter
            .columnFilter]) === columValue);
        }
      });
    }
    setPlanet(copyData);
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
