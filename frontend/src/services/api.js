import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Destination APIs
export const getRandomDestination = async () => {
  try {
    const response = await api.get('/destinations/random');
    return response.data;
  } catch (error) {
    console.error('Error fetching random destination:', error);
    throw error;
  }
};

export const getDestinationById = async (id) => {
  try {
    const response = await api.get(`/destinations/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching destination ${id}:`, error);
    throw error;
  }
};

// User APIs
export const registerUser = async (username) => {
  try {
    const response = await api.post('/users', { username });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
};

export const updateUserScore = async (id, score) => {
  try {
    const response = await api.put(`/users/${id}/score`, { score });
    return response.data;
  } catch (error) {
    console.error(`Error updating user ${id} score:`, error);
    throw error;
  }
};

export const getLeaderboard = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};

// Challenge APIs
export const createChallenge = async (userId) => {
  try {
    const response = await api.post('/challenges', { userId });
    return response.data;
  } catch (error) {
    console.error('Error creating challenge:', error);
    throw error;
  }
};

export const getChallengeById = async (id) => {
  try {
    const response = await api.get(`/challenges/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching challenge ${id}:`, error);
    throw error;
  }
};
