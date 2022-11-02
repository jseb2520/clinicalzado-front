import serverRequests from '../axios-server';

const Location = {
  getAll: () => serverRequests.get('/locations'),
  getBy: (query) => serverRequests.get(`/locations?${query}`),
  getById: (id) => serverRequests.get(`/locations/${id}`),
  create: (body) => serverRequests.post('/locations', body),
  update: (id, body) => serverRequests.put(`/locations/${id}`, body),
  delete: (id) => serverRequests.del(`/locations/${id}`),
};

export default Location;
