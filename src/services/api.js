import axios from 'axios';

const api = axios.create({
  baseURL: 'https://camaracolombo.com.br:5005/api',
});

export default api;