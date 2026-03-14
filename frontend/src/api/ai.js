import client from './client';

export const chatWithAI = async (message) => {
  const response = await client.post('/ai/chat', { message });
  return response.data;
};

export const simulateIntervention = async (scenario) => {
  const response = await client.post('/ai/simulate', { scenario });
  return response.data;
};

export const getCausalGraph = async (topic) => {
  const response = await client.get('/ai/causal-graph', {
    params: { topic }
  });
  return response.data;
};
