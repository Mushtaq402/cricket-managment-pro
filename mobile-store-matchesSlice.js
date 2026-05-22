import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { matchService } from '../../services/matchService';

export const fetchMatches = createAsyncThunk(
  'matches/fetchMatches',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await matchService.getMatches(filters);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMatchDetail = createAsyncThunk(
  'matches/fetchMatchDetail',
  async (matchId, { rejectWithValue }) => {
    try {
      const response = await matchService.getMatchDetail(matchId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateScore = createAsyncThunk(
  'matches/updateScore',
  async ({ matchId, scoreData }, { rejectWithValue }) => {
    try {
      const response = await matchService.updateScore(matchId, scoreData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  list: [],
  detail: null,
  loading: false,
  error: null,
  liveMatches: [],
};

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    addLiveMatch: (state, action) => {
      state.liveMatches.push(action.payload);
    },
    removeLiveMatch: (state, action) => {
      state.liveMatches = state.liveMatches.filter(m => m.id !== action.payload);
    },
    updateLiveMatch: (state, action) => {
      const index = state.liveMatches.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.liveMatches[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMatchDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatchDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(fetchMatchDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateScore.fulfilled, (state, action) => {
        state.detail = action.payload;
      });
  },
});

export const { clearError, addLiveMatch, removeLiveMatch, updateLiveMatch } = matchesSlice.actions;
export default matchesSlice.reducer;
