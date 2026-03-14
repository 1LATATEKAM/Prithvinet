import client from './client';

export const login = (credentials) => client.post('/auth/login', credentials);
export const register = (userData) => client.post('/auth/register', userData);

export default client;
