import serverRequests from '../axios-server';

const Client = {
  getAll: () => serverRequests.get('/clients'),
  getBy: (query) => serverRequests.get(`/clients?${query}`),
  getById: (id) => serverRequests.get(`/clients/${id}`),
  create: (body) => serverRequests.post('/clients', body),
  update: (id, body) => serverRequests.put(`/clients/${id}`, body),
  delete: (id) => serverRequests.del(`/clients/${id}`),
};

export default Client;
