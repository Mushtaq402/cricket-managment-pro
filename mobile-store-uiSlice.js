import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  notifications: [],
  isOnline: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    setOnlineStatus: (state, action) => {
      state.isOnline = action.payload;
    },
  },
});

export const { setTheme, addNotification, removeNotification, setOnlineStatus } = uiSlice.actions;
export default uiSlice.reducer;
