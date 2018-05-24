import url from './url.js'

// http request 拦截器
axios.interceptors.request.use(
    config => {
      if(sessionStorage.Authorization){
          config.headers.Authorization = sessionStorage.Authorization ;
        }
      return config;
    },
    err => {
      return err ;
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
      return response;
    },
    err => {
      return err ;
    });

// 封装axios的post请求
export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      })

  })
}
export function fetchGet(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      })

  })
}

var baseUrl = url.baseUrl;
export default {
  post(url, params) {
    return fetchPost( baseUrl + url, params );
  },
  get(url, params) {
    return fetchGet( baseUrl + url , params);
  }
}












