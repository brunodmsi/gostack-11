import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import api from '../services/api';

import App from '../App';

const apiMock = new MockAdapter(api);

const wait = (amount = 0) => {
  return new Promise(resolve => setTimeout(resolve, amount));
} 

const actWait = async (amount = 0) => {
  await act(async() => {
    await wait(amount);
  })
}

describe('App Component', () => {
  it('should be able to add new repository', async() => {
    const { getByTestId, getByText } = render(<App />);

    apiMock.onGet('repositories').reply(200, []);

    apiMock.onPost('repositories').reply(200, {
      id: 123,
      url: 'https://github.com/brunodmsi/melembraai',
      title: 'Me Lembra Ai',
      techs: ['Node.js', 'React']
    });

    await actWait();
    
    fireEvent.click(getByText("Adicionar"));

    await actWait();
    
    expect(getByTestId("repository-list")).toContainElement(      
      getByText('Titulo: Me Lembra Ai Tecnologias: Node.js, React, Link do Github: https://github.com/brunodmsi/melembraai')
    )
  })

  it('should be able to remove repository', async () => {
    const { getByTestId, getByText } = render(<App />);

    apiMock.onGet('repositories').reply(200, [
      {
        id: 123,
        url: 'https://github.com/brunodmsi/melembraai',
        title: 'Me Lembra Ai',
        techs: ['Node.js', 'React']
      }
    ]);

    apiMock.onDelete('/repositories/123').reply(204);

    await actWait();
    
    fireEvent.click(getByText("Remover"));
    
    await actWait();

    expect(getByTestId('repository-list')).toBeEmpty();
  })
})
