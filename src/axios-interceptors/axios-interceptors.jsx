import axios from 'axios';

const instance = axios.create();

instance.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   config.headers.Authorization = token;
  return config;
});

instance.interceptors.response.use(response => {
    // handle success
    return response;
}, error => {
    // handle error
    if (error.response.status === 401) {
        // redirect to login page
    }
    return Promise.reject(error);
});

instance.interceptors.request.use(function (config) {
    // do something before request is sent
    return config;
}, function (error) {
    // do something with request error
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    // do something with response data
    return response;
}, function (error) {
    // do something with response error
    return Promise.reject(error);
});

export default instance;
