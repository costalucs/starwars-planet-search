import React, { useContext } from 'react';
import { planetContext } from '../context/PlanetProvider';

function FilterButton() {
  const { filterByNumericValues } = useContext(planetContext);
  return (
    <button
      onClick={ filterByNumericValues }
      type="button"
      data-testid="button-filter"
    >
      Filtrar
    </button>
  );
}
export default FilterButton;
