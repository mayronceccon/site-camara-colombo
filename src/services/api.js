import axios from 'axios';

let urlApi = process.env.REACT_APP_URL_API;
console.log(process.env);
console.log(urlApi);

const api = axios.create({
  baseURL: urlApi
});

export default api;