import serverRequests from '../axios-server';

const Location = {
  getAll: () => serverRequests.get('/locations?populate=%2A'),
  getBy: (query) => serverRequests.get(`/locations?populate=%2A&${query}`),
  getById: (id) => serverRequests.get(`/locations/${id}?populate=%2A`),
  create: (body) => serverRequests.post('/locations', body),
  update: (id, body) => serverRequests.put(`/locations/${id}`, body),
  delete: (id) => serverRequests.del(`/locations/${id}`),
};

export default Location;
