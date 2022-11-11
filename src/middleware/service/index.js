import serverRequests from '../axios-server';

const Service = {
  getAll: () => serverRequests.get('/services?populate=%2A'),
  getBy: (query) => serverRequests.get(`/services?populate=%2A&${query}`),
  getById: (id) => serverRequests.get(`/services/${id}?populate=%2A`),
  count: () => serverRequests.get('/services/count'),
  create: (body) => serverRequests.post('/services', body),
  update: (id, body) => serverRequests.put(`/services/${id}`, body),
  delete: (id) => serverRequests.del(`/services/${id}`),
};

export default Service;
