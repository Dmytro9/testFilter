import React from 'react';
import Sidebar from '../modules/common/components/sidebar.component';
import { CssBaseline } from '@material-ui/core';
import { NextPage } from 'next';
import Router from 'next/router';

const Home: NextPage = () => {
  return (
    <div>
      <CssBaseline />
      <Sidebar title="C-YA"/>
    </div>
  );
};

export default Home;
