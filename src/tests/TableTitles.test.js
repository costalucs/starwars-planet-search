import React from 'react';
import {  cleanup, render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testando TableTitles', ()=> {
  beforeEach(cleanup)
  test('Testando os componentes da tabela', async () => {
    render(<App/>)
    const tabela = await screen.findAllByRole('columnheader')
    const tableResult = await screen.findAllByRole('row')
    expect(tabela).toHaveLength(13)
    const inputName = screen.getByTestId('name-filter')
    userEvent.type(inputName, 'tatoo')
    const planet = await screen.getByRole('cell', {  name: /tatooine/i})
    expect(planet).toBeInTheDocument()
    userEvent.type(inputName, '')
    expect(tableResult).toHaveLength(11)

    const columnFilter = screen.getByTestId('column-filter')
    const comparisonFilter = screen.getByTestId('comparison-filter')
    const valueFilter = screen.getByTestId('value-filter')
    const buttonFitler = screen.getByTestId('button-filter')

    userEvent.selectOptions(columnFilter, 'rotation_period')
    userEvent.selectOptions(comparisonFilter, 'igual a')
    userEvent.type(valueFilter, '23')
    userEvent.click(buttonFitler)
    expect(screen.getAllByTestId('planet-name')).toHaveLength(3)

    userEvent.type(inputName, '')
    expect(tabela).toHaveLength(13)


    const filterInfo = screen.getByTestId('filter')
    const filterRemoveButton = screen.getByRole('button', {  name: /x/i})
    const removeAllFilter = screen.getByRole('button', {  name: /revomer filtros/i})
    expect(filterInfo).toBeInTheDocument()
    expect(removeAllFilter).toBeInTheDocument()
    expect(filterRemoveButton).toBeInTheDocument()

    userEvent.click(filterRemoveButton)
    expect(screen.getAllByTestId('planet-name')).toHaveLength(10)
    expect(filterInfo).not.toBeInTheDocument()

    userEvent.selectOptions(columnFilter, 'rotation_period')
    userEvent.selectOptions(comparisonFilter, 'maior que')
    userEvent.type(valueFilter, '25')
    userEvent.click(buttonFitler)
    userEvent.click(removeAllFilter)
    expect(filterInfo).not.toBeInTheDocument()

    userEvent.type(valueFilter, '')
    userEvent.selectOptions(columnFilter, 'population')
    userEvent.selectOptions(comparisonFilter, 'menor que')
    userEvent.type(valueFilter, '25')
    userEvent.click(buttonFitler)

  })
})
