import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';


describe('Testando app', () => {
  test('Testando elementos da pagina', () => {
    render(<App />);
    const INPUT_TEXT = screen.getByTestId('name-filter');
    const button = screen.getByTestId('button-filter')
    const columnFilter = screen.getByTestId('column-filter')
    expect(INPUT_TEXT).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(INPUT_TEXT.value).toBe('')
    expect(button).toBeInTheDocument()
    waitFor(() => {
      const elements = screen.getAllByTestId('planet-name')
      expect(elements).toHaveLength(10)
    })
  });

})


