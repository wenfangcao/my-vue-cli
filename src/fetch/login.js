import url from './url.js'
import dslog from './dslog.js'
import $api from './api'
import isDev from './config'
 //获取地址参数数据
import parseQueryString from './parseQueryString'

function getcode(){
  return new Promise((resolve)=>{
    //开发环境不登录
    if(isDev){return ;}
    //获取微信用户信息
    if( localStorage.openId == undefined ){
        //获取code返回值
        //dslog.alertData("获取code返回值");
        var code = parseQueryString(window.location.href).code ;
        if(code == undefined || code == null || code == "" ){
            window.location.href = url.weixinUrl ;
        }else{
            //通过CODE获取accessToken
            //dslog.alertData("通过CODE获取accessToken");
            $api.get(url.accessToken+"?code="+code)
            .then((res)=>{
                var res = res.result ;
                localStorage.accessToken  = res.access_token ;
                localStorage.refreshToken = res.refresh_token ;
                localStorage.openId       = res.openid ;
                refreshToken() ;
            });
        }
    }else{
        refreshToken() ;
    }
    resolve() ;
  })
}

function refreshToken(){
    //用refreshToken更新accessToken
    //dslog.alertData("用refreshToken更新accessToken");
    let refreshToken = localStorage.refreshToken ;
    $api.get(url.refreshToken+"?refreshToken="+refreshToken)
    .then(res=>{
        if(res.status == 1){
            var res = res.result ;
            localStorage.accessToken  = res.access_token ;
            localStorage.refreshToken = res.refresh_token ;
            localStorage.openId       = res.openid ;
            
            //获取微信用户信息
            getInfo(res.openid,res.access_token) ;
        }else{
            //refreshToken过期，重新获取
            localStorage.removeItem("accessToken") ;
            localStorage.removeItem("refreshToken") ;
            localStorage.removeItem("openId");
            window.location.href = url.proUrl ;
        }
  })
}

function getInfo(openId,accessToken){
     //获取用户信息
     //dslog.alertData("获取用户信息");
     $api.get(url.getMsg+"?openId="+openId+"&accessToken="+accessToken)
     .then( res => {   
         if( res.status == 1 ){
             var res = res.result ;
             login(res,openId) ;
         }else{
             alert("用户信息获取失败");
         }
     });
}

function login(res,openId){
    //登录
    //dslog.alertData("登录") ;
    $api.post(url.loginWx,{
        "openId"  :  openId,
        "nickname":  res.nickname,
        "sex"     :  res.sex,
        "city"    :  res.city,
        "province":  res.province,
        "iconurl" :  res.headimgurl,
        "country" :  res.country
    })
    .then( r => {
        if( r.status != 1 ){
            //注册
            //dslog.alertData("注册");
            $api.post(url.registerWx,{
                "openId"  : openId,
                "nickname": res.nickname,
                "sex"     : res.sex,
                "city"    : res.city,
                "province": res.province,
                "country" : res.country,
                "iconurl" : res.headimgurl
            })
            .then( p => {
                if( p.status == 1 ){
                    //注册成功
                    login() ;
                }else{
                    //注册失败
                    alert("注册失败") ;
                }
            }) ;
        }else{
            //保存用户登录信息
            var r = r.result ;
            sessionStorage.Authorization = r.AccessToken ;
            sessionStorage.iconurl       = r.userInfo.iconurl ;
            sessionStorage.nickname      = r.userInfo.nickname ;
            sessionStorage.id            = r.userInfo.id ;
            if(localStorage.href == undefined){
                window.location.href = url.proUrl + "Index" ;
            }else{
                var u = localStorage.href.slice(1)
                window.location.href = url.proUrl + u ;
            }


            //回到之前的页面

            // alert("即将跳转前history长度："+history.length);
            // // history.go(-3);
            // alert("跳转函数触发后history长度："+history.length);
            // return false;
        }
    });
}

function newLogin(){
    return new Promise((resolve)=>{
        //开发环境不登录
        if(isDev){return ;}
        //获取微信用户信息
        if( localStorage.refreshToken == undefined ){
            //获取code返回值
            //dslog.alertData("获取code返回值");
            var code = parseQueryString(window.location.href).code ;
            if(code == undefined || code == null || code == "" ){
                window.location.href = url.weixinUrl ;
                return ;
            }else{
                var data = {
                    code : code 
                }
            }
        }else{
            var data = {
                refreshToken: localStorage.refreshToken
            }
        }
        
        $api.post(url.autoLogin,data)
        .then( res => {
            if( res.status == 0 ){
                localStorage.removeItem("refreshToken");
                // newLogin() ;//直接用函数，CODE失效无法解决
                window.location.href = url.proUrl ;
            }else{
                var r = res.result ;
                sessionStorage.Authorization = r.AccessToken ;
                sessionStorage.iconurl       = r.userInfo.iconurl ;
                sessionStorage.nickname      = r.userInfo.nickname ;
                sessionStorage.id            = r.userInfo.id ;
                localStorage.refreshToken    = r.refreshToken ;
                if(localStorage.href == undefined){
                    window.location.href = url.proUrl + "Index" ;
                }else{
                    var u = localStorage.href.slice(1) ;
                    localStorage.removeItem("href") ;//防止下次进入项目，再次进入该页面
                    window.location.href = url.proUrl + u ;
                }

            }
            
            
            resolve();
        })

        
    })
}

//export default getcode
export default newLogin
