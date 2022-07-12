import React, { useState, useContext } from 'react';
import { planetContext } from '../context/PlanetProvider';

function NumericFilter() {
  // const inicialValue = {
  //   number: 0,
  // };

  const { filterByNumericValues,
    handleFilters, filters, resetPlanets } = useContext(planetContext);

  // const filterByNumericValues = (state) => {
  //   console.log(state);
  // };
  const columns = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const [valueFilter, setValueFilter] = useState({
    columnFilter: columns[0],
    comparisson: 'maior que',
    valueFilter: 0,
  });

  const handleChange = ({ target: { value, name } }) => {
    setValueFilter({
      ...valueFilter,
      [name]: value,
    });
  };

  const [columnsFilters, setFilters] = useState(columns);

  const deleteFilter = (value) => {
    const column = document.getElementsById('filter');
    console.log(column);
    setFilters([...columnsFilters, value]); // coluna de opções
    filters.forEach((item, i) => {
      if (item.columnFilter === value) filters.splice(i, 1); // deleta item
    });
    if (column.length === 0) return resetPlanets;
  };

  const handleSetFilters = () => {
    filterByNumericValues(valueFilter);
    handleFilters(valueFilter);
    setFilters(columnsFilters.filter((item) => item !== valueFilter.columnFilter));
  };

  return (
    <form>
      <div>
        {filters.map((item, index) => (
          <div data-testid="filter" id="filter" key={ index }>
            <span>
              {item.columnFilter}
              {' '}
            </span>
            <span>
              {item.comparisson}
              {' '}
            </span>
            <span>
              {item.valueFilter}
              {' '}
            </span>
            <button
              onClick={ () => deleteFilter(item.columnFilter) }
              type="button"
            >
              X
            </button>
          </div>
        ))}
      </div>
      <select
        onChange={ handleChange }
        name="columnFilter"
        data-testid="column-filter"
        id="column-filter"
      >
        {columnsFilters.map((item, index) => (
          <option key={ index } value={ item }>{item}</option>
        ))}
      </select>
      <select
        onChange={ handleChange }
        name="comparisson"
        data-testid="comparison-filter"
        id="comparisson"
      >
        <option id="comparisson" value="maior que">maior que</option>
        <option id="comparisson" value="menor que">menor que</option>
        <option id="comparisson" value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        name="valueFilter"
        id="value-filter"
        value={ valueFilter.valueFilter }
        onInput={ handleChange }
      />

      <button
        onClick={ handleSetFilters }
        type="button"
        data-testid="button-filter"
      >
        Filtrar
      </button>

    </form>

  );
}

export default NumericFilter;
