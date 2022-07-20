import React from 'react';
import {  cleanup, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testando filter', ()=> {
  afterEach(cleanup)

  it('Testando inputname', async ()=> {
    render(<App/>)
    const nameInput = screen.getByTestId('name-filter');
    expect(nameInput).toBeInTheDocument()

    await waitFor(() => expect(screen.getAllByTestId('planet-name')).toHaveLength(10))
    userEvent.type(nameInput, 'al')
    expect(screen.getAllByTestId('planet-name')).toHaveLength(1)
    userEvent.type(nameInput, '{selectall}{del}')
    expect(screen.getAllByTestId('planet-name')).toHaveLength(10)
  })
})
