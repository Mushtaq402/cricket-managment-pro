import apiClient from './apiClient';

export const matchService = {
  async getMatches(filters = {}) {
    try {
      const response = await apiClient.get('/matches', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch matches');
    }
  },

  async getMatchDetail(matchId) {
    try {
      const response = await apiClient.get(`/matches/${matchId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch match details');
    }
  },

  async getLiveMatches() {
    try {
      const response = await apiClient.get('/matches/live/current');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch live matches');
    }
  },

  async updateScore(matchId, scoreData) {
    try {
      const response = await apiClient.put(`/matches/${matchId}/score`, scoreData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update score');
    }
  },

  async getMatchStats(matchId) {
    try {
      const response = await apiClient.get(`/matches/${matchId}/stats`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch match stats');
    }
  },

  async subscribeToLiveUpdates(matchId, callback) {
    // WebSocket subscription for live updates
    const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:5000';
    const ws = new WebSocket(`${wsUrl}/matches/${matchId}/live`);

    ws.onopen = () => {
      console.log('WebSocket connected for match:', matchId);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      callback(data);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return ws;
  },
};

export default matchService;
