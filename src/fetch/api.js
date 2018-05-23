import url from './url.js'
import isDev from './config'

function isExpired(res){
  if(isDev){
    return false 
  }
  if ((res.status >= 200 && res.status < 300) || res.status == 101){
    
    if(res.data.status == 3){
      sessionStorage.clear() ;
      Vue.prototype.$message({
        message: '登录失效，请刷新页面！',
        type: 'error'
      });
      return true
    }else{
      return false 
    }
	
  }else{
	Vue.prototype.$message({
	  message: res.result ,
	  type: 'error'
	});
    return true	
  }
  
} 
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
        if(isExpired(res)){
          return 
        }
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
        if(isExpired(res)){
          return 
        }
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












