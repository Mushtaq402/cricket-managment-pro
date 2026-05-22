import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import matchesReducer from './matchesSlice';
import tournamentsReducer from './tournamentsSlice';
import playersReducer from './playersSlice';
import uiReducer from './uiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    matches: matchesReducer,
    tournaments: tournamentsReducer,
    players: playersReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;
