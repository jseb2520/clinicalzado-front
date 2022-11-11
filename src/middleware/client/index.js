import serverRequests from '../axios-server';

const Client = {
  getAll: () => serverRequests.get('/clients?populate=%2A'),
  getBy: (query) => serverRequests.get(`/clients?populate=%2A&${query}`),
  getById: (id) => serverRequests.get(`/clients/${id}?populate=%2A`),
  create: (body) => serverRequests.post('/clients', body),
  update: (id, body) => serverRequests.put(`/clients/${id}`, body),
  delete: (id) => serverRequests.del(`/clients/${id}`),
};

export default Client;
