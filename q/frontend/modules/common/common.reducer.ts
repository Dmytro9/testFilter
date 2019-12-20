import { createReducer } from '@reduxjs/toolkit';
import { toggleSidebar } from './common.actions';

export interface ICommonReducer {
  isSidebarOpened: boolean;
}

export default createReducer(
  {
    isSidebarOpened: true,
  },
  {
    [toggleSidebar.type]: (state, action) => ({
      ...state,
      isSidebarOpened: !state.isSidebarOpened,
    }),
  },
);
