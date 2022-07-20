import React from 'react';
import {  cleanup, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { data } from './mocks/data';

describe('Testando filter', ()=> {
  beforeEach(()=>{
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(data)
    })
  })
  afterEach(cleanup)

  it('Testando inputname digitando al', async ()=> {
    render(<App/>)
    const nameInput = screen.getByTestId('name-filter');
    expect(nameInput).toBeInTheDocument()
    expect(await screen.findAllByTestId('planet-name')).toHaveLength(10)
    userEvent.type(nameInput, 'al')
    expect(screen.getAllByTestId('planet-name')).toHaveLength(1)

    userEvent.click(screen.getByText(/ascendente/i))
    const columnFilter = screen.getByTestId('column-sort')
    const buttonSort = screen.getByTestId('column-sort-button')
    userEvent.selectOptions(columnFilter, 'population')
    userEvent.click(buttonSort)
    userEvent.click(screen.getByText(/descendente/i))
  })

  it('Testando apagando inputtext', async ()=> {
    render(<App/>)
    const nameInput = screen.getByTestId('name-filter');

    expect(await screen.findAllByTestId('planet-name')).toHaveLength(10)
    userEvent.type(nameInput, 'al')
    expect(screen.getAllByTestId('planet-name')).toHaveLength(1)
    userEvent.type(nameInput, '{selectall}{del}')
    expect(await screen.findAllByTestId('planet-name')).toHaveLength(10)
  })

  it('Testando filtro asc e desc', async () => {
    render(<App/>)
    expect(await screen.findAllByTestId('planet-name')).toHaveLength(10)
    const planetDagoba = screen.getByRole('cell', {  name: /dagobah/i})
    expect(planetDagoba).toBeInTheDocument()
    const planets = await screen.findAllByTestId('planet-name')
    expect(planets).toHaveLength(10)
    userEvent.selectOptions(screen.getByTestId('column-sort'), 'population')
    userEvent.click(screen.getByTestId('column-sort-input-asc'))
    userEvent.click(screen.getByTestId('column-sort-button'))
    expect(await screen.findAllByTestId('planet-name')).toHaveLength(8)
    expect(planetDagoba).not.toBeInTheDocument()
    userEvent.click(screen.getByTestId('column-sort-input-desc'))
    userEvent.click(screen.getByTestId('column-sort-button'))
    expect(planetDagoba).not.toBeInTheDocument()
  })
})
