import axios from 'axios';

const API_GHN = process.env.REACT_APP_API_GHN;

const configAxios = (config) => {
  config.headers['token'] = '106f6abe-d229-11ed-921c-de4829400020';
  config.headers['shopId'] = 3989904;
  config.headers['Content-Type'] = 'application/json';
  return config;
};

const requestOnReject = (error) => {
  return Promise.reject(error);
};

const baseService = axios.create({
  baseURL: API_GHN,
  timeout: 5000,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});

baseService.interceptors.request.use(configAxios, requestOnReject);

const executeAxios = function (url, params, method = 'post', configs = {}) {
  return ['get', 'post', 'delete'].includes(method)
    ? baseService[method](url, params)
    : baseService[method](url, params, configs);
};

export default executeAxios;
