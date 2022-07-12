import { useState, useEffect } from 'react';

export default function usePlanetsList() {
  const [planets, setPlanets] = useState();

  const getAPIlist = () => {
    const URI = 'https://swapi-trybe.herokuapp.com/api/planets/';
    fetch(URI).then((resp) => resp.json())
      .then((data) => {
        console.table(data);
        return data.results;
      }).then((lista) => setPlanets(lista));
  };

  useEffect(() => {
    getAPIlist();
  }, []);

  return [planets];
}
