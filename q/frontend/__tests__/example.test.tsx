import React from 'react';
import { render, wait } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { Example, EXAMPLE_QUERY } from '../pages/example';
// Modified version of
// https://www.apollographql.com/docs/react/development-testing/testing/

const exampleMock = {
  request: {
    query: EXAMPLE_QUERY,
  },
  result: {
    data: {
      status: {
        activeConnections: 10,
        totalRequests: 20,
      },
    },
  },
};
it('renders without error', async () => {
  const { container } = render((
    <MockedProvider mocks={[exampleMock]} addTypename={false}>
      <Example/>
    </MockedProvider>
  ));

  // loading state first time
  expect(container.textContent).toMatch(/Loading/i);

  // wait to get the result of the query
  await wait();
  expect(container.textContent).toMatch(/activeConnections: 10/i);
  expect(container.textContent).toMatch(/totalRequests: 20/i);
});
