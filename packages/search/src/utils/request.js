import axios from "axios";

// create an axios instance
const service = axios.create({
  baseURL: "", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(error => {
  config => {
    // do something before request is sent
    return config;
  },
    // do something with request error
    console.log(error); // for debug
  return Promise.reject(error);
});

export default service;
