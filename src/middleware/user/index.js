import serverRequests from '../axios-server';

const User = {
  getAll: () => serverRequests.get('/users?populate=%2A'),
  getBy: (query) => serverRequests.get(`/users?populate=%2A&${query}`),
  getById: (id) => serverRequests.get(`/users/${id}?populate=%2A`),
  create: (body) => serverRequests.post('/users', body),
  update: (id, body) => serverRequests.put(`/users/${id}`, body),
  delete: (id) => serverRequests.del(`/users/${id}`),
};

export default User;
