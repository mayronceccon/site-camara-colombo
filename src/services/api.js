import axios from 'axios';
import { setupCache } from 'axios-cache-adapter'

const cache = setupCache({
  maxAge: 60 * 60 * 1000 //60 minutos
})

const api = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
  adapter: cache.adapter
});

export default api;