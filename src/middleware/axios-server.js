import axios from 'axios';
// config
import { HOST_API } from '../config';

const server = axios.create({
  baseURL: `${HOST_API}/api`,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

server.interceptors.request.use(async (request) => {
  try {
    const token = localStorage.getItem('accessToken');

    if (token) {
      request.headers.common.Authorization = `Bearer ${token}`;
    }
    return request;
  } catch (err) {
    throw new Error(
      `axios# Problem with request during pre-flight phase: ${err}.`,
    );
  }
});

server.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

const responseBody = (response) => response.data;

const serverRequests = {
  del: (url) => server.delete(`${url}`).then(responseBody),
  get: (url) => server.get(`${url}`).then(responseBody),
  put: (url, body) => server.put(`${url}`, body).then(responseBody),
  post: (url, body) => server.post(`${url}`, body).then(responseBody),
};

export default serverRequests;
