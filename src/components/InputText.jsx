import React, { useContext } from 'react';
import { planetContext } from '../context/PlanetProvider';

function InputText() {
  const { handleFilterByName } = useContext(planetContext);
  return (
    <input
      data-testid="name-filter"
      onChange={ handleFilterByName }
      type="text"
      name="planet"
      id=""
    />
  );
}

export default InputText;
