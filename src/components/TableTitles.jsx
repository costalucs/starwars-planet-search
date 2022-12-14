import React, { useContext } from 'react';
import { planetContext } from '../context/PlanetProvider';
import logo from '../projectIntro.gif';

export default function TableTitles() {
  const { planets } = useContext(planetContext);

  return (
    (planets
      ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rotation Period</th>
              <th>Orbital Period</th>
              <th>Diameter</th>
              <th>Climate</th>
              <th>Gravity</th>
              <th>Terrain</th>
              <th>Surface Water</th>
              <th>Population</th>
              <th>Films</th>
              <th>Created</th>
              <th>Edited</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {planets
            && planets.map((item) => (
              <tr key={ item.name }>
                <td data-testid="planet-name">{ item.name }</td>
                <td>{ item.rotation_period }</td>
                <td>{ item.orbital_period }</td>
                <td>{ item.diameter }</td>
                <td>{ item.climate }</td>
                <td>{ item.gravity }</td>
                <td>{ item.terrain }</td>
                <td>{ item.surface_water }</td>
                <td>{ item.population }</td>
                <td>{ item.films.map((film) => film) }</td>
                <td>{ item.created }</td>
                <td>{ item.edited }</td>
                <td>{ item.url }</td>
              </tr>
            ))}
          </tbody>
        </table>)
      : (
        <img src={ logo } alt="logo" />
      ))
  );
}
