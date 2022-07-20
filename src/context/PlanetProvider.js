import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import usePlanetsList from '../hooks/usePlanets';

export const planetContext = createContext();

function PlanetProvider(props) {
  const { children } = props;
  const [data] = usePlanetsList();
  const [planets, setPlanet] = useState();
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [, setSort] = useState({
    order: {
      column: 'population',
      sort: 'ASC',
    },
  });
  const planetasFiltrados = data;

  const handleFilterByName = ({ target: { value } }) => {
    if (value !== '') {
      const planetsFiltered = data.filter((item) => item.name
        .toLowerCase().includes(value));
      return setPlanet(planetsFiltered);
    }
    setPlanet(data);
  };

  const handleSortFilter = (colum, sorting) => {
    setSort({
      order: {
        colum,
        sort: sorting,
      },
    });
    const newplanets = planets.filter((item) => item[colum] !== 'unknown');
    if (sorting === 'ASC') {
      return setPlanet(newplanets.sort((a, b) => Number(a[colum]) - Number(b[colum])));
    }
    setPlanet(newplanets.sort((a, b) => Number(b[colum]) - Number(a[colum])));
  };

  const handleFilter = (filters, datas) => {
    let copyData = datas;
    if (filters.length !== 0) {
      filters.forEach((filter) => {
        const columValue = Number(filter.valueFilter);
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
      const newplanets = data?.sort((x, y) => {
        const a = x.name.toUpperCase();
        const b = y.name.toUpperCase();
        const num = -1;
        if (a === b) return 0;
        return a > b ? 1 : num;
      });
      setPlanet(newplanets);
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
    handleSortFilter,
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
