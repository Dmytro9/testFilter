import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

function configureAppStore(preloadedState) {
  const persistedReducer = persistReducer(
    {
      key: 'primary',
      storage,
      whitelist: ['common'],
    },
    rootReducer,
  );

  const store = configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: [
      ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
    ],
  });

  return store;
}

export default configureAppStore;
