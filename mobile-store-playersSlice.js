import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  players: [],
  loading: false,
  error: null,
};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPlayers, setLoading, setError } = playersSlice.actions;
export default playersSlice.reducer;
