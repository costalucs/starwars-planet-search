import React, { useState, useContext } from 'react';
import { planetContext } from '../context/PlanetProvider';

function NumericFilter() {
  // const inicialValue = {
  //   number: 0,
  // };

  const { filterByNumericValues } = useContext(planetContext);

  // const filterByNumericValues = (state) => {
  //   console.log(state);
  // };

  const [valueFilter, setValueFilter] = useState({
    columnFilter: 'population',
    comparisson: 'maior que',
    valueFilter: 0,
  });

  const handleChange = ({ target: { value, name } }) => {
    setValueFilter({
      ...valueFilter,
      [name]: value,
    });
  };
  const columns = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const [filters, setFilters] = useState(columns);

  const handleFilters = () => {
    filterByNumericValues(valueFilter);
    setFilters(filters.filter((item) => item !== valueFilter.columnFilter));
  };

  return (
    <form>
      <select
        onChange={ handleChange }
        name="columnFilter"
        data-testid="column-filter"
        id="column-filter"
      >
        {filters.map((item, index) => (
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
        onClick={ handleFilters }
        type="button"
        data-testid="button-filter"
      >
        Filtrar
      </button>

    </form>

  );
}

export default NumericFilter;
