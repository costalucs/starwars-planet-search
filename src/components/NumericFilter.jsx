import React, { useState, useContext } from 'react';
import { planetContext } from '../context/PlanetProvider';

function NumericFilter() {
  // const inicialValue = {
  //   number: 0,
  // };

  const { handleFilter,
    filterByNumericValues,
    setFilterByNumericValues, setPlanet, data } = useContext(planetContext);
  // const { planets } = usePlanetsList();

  // const [filters, setFilters] = useState([]);

  // const handleFilter = (state) => {
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

  const [columnsFilters, setColumnFilters] = useState(columns);

  const deleteFilter = (value) => {
    const newFilters = filterByNumericValues
      .filter((item) => item.columnFilter !== value);
    setFilterByNumericValues(newFilters);
    setColumnFilters([...columnsFilters, value]);
    if (newFilters.length === 0) {
      return setPlanet(data);
    }
    // return {
    //   setPlanet(data)
    //   filterByNumericValues.forEach((item) => handleFilter(item))
    setPlanet(data);
    return newFilters.forEach((item) => handleFilter(item));

    // }
  };

  const handleSetFilters = (filter) => {
    // console.log(data);
    handleFilter(filter);
    setFilterByNumericValues([...filterByNumericValues, filter]);
    // handleFilters(valueFilter);
    setColumnFilters(columnsFilters.filter((item) => item !== filter.columnFilter));
    setValueFilter({ ...valueFilter, columnFilter: columns[0] });
  };

  return (
    <form>
      {/* {console.log(data)} */}
      <div>
        {filterByNumericValues && filterByNumericValues.map((item, index) => (
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
        onClick={ () => handleSetFilters(valueFilter) }
        type="button"
        data-testid="button-filter"
      >
        Filtrar
      </button>
      <button
        onClick={ () => setPlanet(data) }
        data-testid="button-remove-filters"
        type="button"
      >
        Revomer Filtros
      </button>

    </form>

  );
}

export default NumericFilter;
