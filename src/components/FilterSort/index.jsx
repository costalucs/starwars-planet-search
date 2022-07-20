import React, { useContext, useState } from 'react';
import { planetContext } from '../../context/PlanetProvider';

export default function FilterSort() {
  const columns = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const [sort, setColumn] = useState(columns[0]);
  const [colum, setSort] = useState('asc');

  const { handleSortFilter } = useContext(planetContext);

  return (
    <>
      <select
        onChange={ ({ target }) => setColumn(target.value) }
        data-testid="column-sort"
        id=""
      >
        {columns.map((item, inx) => <option value={ item } key={ inx }>{item}</option>)}
      </select>
      <div value="asc" onChange={ ({ target }) => setSort(target.value) }>
        <label data-testid="column-sort-input-asc" htmlFor="asc">
          Ascendente
          <input type="radio" value="ASC" name="sort" id="asc" />
        </label>
        <br />
        <label data-testid="column-sort-input-desc" htmlFor="desc">
          Descendente
          <input type="radio" value="DESC" name="sort" id="desc" />
        </label>
      </div>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => handleSortFilter(sort, colum) }
      >
        Filtrar
      </button>
    </>

  );
}
