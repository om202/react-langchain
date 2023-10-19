import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './authReducer'
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    authentication: authReducer,
  },
  middleware: [thunk],
})

export function getState() {
  return store.getState();
}