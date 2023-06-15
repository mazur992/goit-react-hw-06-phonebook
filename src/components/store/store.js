import { configureStore } from '@reduxjs/toolkit';
import { reducer } from '../slice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'localContacts',
  storage,
  blacklist: ['filter'],
};
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store);
