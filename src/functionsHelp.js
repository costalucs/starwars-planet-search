function handleFilter(filters, state, data) {
  const { columnFilter, comparisson, valueFilter } = state;
  const planetasFiltrados = [...data];
  if (filters.length !== 0) {
    if (comparisson === 'maior que') {
      const planetsFiltered = planets.filter((item) => (
        Number(item[columnFilter]) > Number(valueFilter)
      ));
      return setPlanet(planetsFiltered);
    }
    if (comparisson === 'menor que') {
      const planetsFiltered = planets.filter((item) => (
        Number(item[columnFilter]) < Number(valueFilter)
      ));
      return setPlanet(planetsFiltered);
    }
    if (comparisson === 'igual a') {
      const planetsFiltered = planets.filter((item) => (
        Number(item[columnFilter]) === Number(valueFilter)
      ));
      return setPlanet(planetsFiltered);
    }
  }
  return planetasFiltrados;
}

export default handleFilter;
