import serverRequests from '../axios-server';

const Service = {
  getAll: () => serverRequests.get('/services'),
  getBy: (query) => serverRequests.get(`/services?${query}`),
  getById: (id) => serverRequests.get(`/services/${id}`),
  create: (body) => serverRequests.post('/services', body),
  update: (id, body) => serverRequests.put(`/services/${id}`, body),
  delete: (id) => serverRequests.del(`/services/${id}`),
};

export default Service;
