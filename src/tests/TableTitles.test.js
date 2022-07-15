import React from 'react';
import {  cleanup, render, screen } from '@testing-library/react';
import App from '../App';
// import data from './data/data';
import userEvent from '@testing-library/user-event';

// const mock = () => {
//   jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
//     status: 200,
//     ok: true,
//     json: () => Promise.resolve(data)
//   }))
// }

describe('Testando TableTitles', ()=> {
  beforeEach(cleanup)

  // afterAll(()=> {
  //   jest.clearAllMocks();
  // })

  test('Testando os componentes da tabela', async () => {
    render(<App/>)
    const tabela = await screen.findAllByRole('columnheader')
    expect(tabela).toHaveLength(13)
    const inputName = screen.getByTestId('name-filter')
    userEvent.type(inputName, 'tatoo')
    const planet = await screen.getByRole('cell', {  name: /tatooine/i})
    expect(planet).toBeInTheDocument()
    userEvent.type(inputName, '')
    expect(tabela).toHaveLength(13)

    const columnFilter = screen.getByTestId('column-filter')
    const comparisonFilter = screen.getByTestId('comparison-filter')
    const valueFilter = screen.getByTestId('value-filter')
    const buttonFitler = screen.getByTestId('button-filter')

    userEvent.selectOptions(columnFilter, 'rotation_period')
    userEvent.selectOptions(comparisonFilter, 'igual a')
    userEvent.type(valueFilter, '23')
    userEvent.click(buttonFitler)

    const tableResult = await screen.findAllByRole('row')

    expect(tableResult).toHaveLength(4)

  })

  // it('Testando input', ()=> {
  //  render(<App/>)

  //   // expect(inputName).toBeInTheDocument()

  //   userEvent.type(inputName, 'tatoo')

  //   // const planet = await screen.getByRole('cell', {  name: /tatooine/i})
  //   // expect(planet).toBeInTheDocument()


  // })
})
