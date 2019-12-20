import React from 'react';
import { NextPage } from 'next';
import { withApollo } from '../modules/common/components/withApollo.hoc';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Sidebar from '../modules/common/components/sidebar.component';

// https://www.apollographql.com/docs/react/development-testing/testing/

export const EXAMPLE_QUERY = gql`
  {
    status {
      activeConnections
      totalRequests
    }
  }
`;

interface QStatus { status: { activeConnections: number; totalRequests: number }; }

export const Example: NextPage = () => {
  const { loading, error, data } = useQuery<QStatus>(EXAMPLE_QUERY);

  if (loading) { return <p>loading</p>; }
  if (error) { return <p>error</p>; }

  const { activeConnections, totalRequests } = data.status;
  return (
    <>
      <Sidebar>
        <div>
          activeConnections: {activeConnections}
        </div>
        <div>
          totalRequests: {totalRequests}
        </div>
      </Sidebar>
    </>
  );
};

export default withApollo(Example);
