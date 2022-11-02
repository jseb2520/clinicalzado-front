import serverRequests from '../axios-server';

const User = {
  getAll: () => serverRequests.get('/users'),
  getBy: (query) => serverRequests.get(`/users?${query}`),
  getById: (id) => serverRequests.get(`/users/${id}`),
  create: (body) => serverRequests.post('/users', body),
  update: (id, body) => serverRequests.put(`/users/${id}`, body),
  delete: (id) => serverRequests.del(`/users/${id}`),
};

export default User;
