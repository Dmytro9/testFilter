import { createAction } from '@reduxjs/toolkit';

const PREFIX = 'common/';

export const toggleSidebar = createAction(`${PREFIX}toggleSidebar`);

export const search = createAction<string>(`${PREFIX}search`);
