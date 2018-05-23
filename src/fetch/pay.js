import url from './url.js'
import api from './api.js'
import dslog from './dslog.js'
//import { Message } from 'element-ui';
//console.log(dslog);
//import qs from 'querystring'
var pay = function(data){
  return new Promise((reslove)=>{
    //var data = data ;
    api.post(url.unifiedOrder,data)
    .then((r)=>{
        dslog.consoleData(r);
        var r = r.result ;
        function onBridgeReady(){
            dslog.consoleData('getBrandWCPayRequest'+r);
            dslog.consoleData('getBrandWCPayRequest'+"appId"+url.appid+"timeStamp"+r.timeStamp+"nonceStr"+r.nonceStr+"package"+r.package+"signType"+"MD5"+ "paySign"+r.paySign  );
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId":url.appid,     //公众号名称，由商户传入     
                    "timeStamp": r.timeStamp,         //时间戳，自1970年以来的秒数   
                    "nonceStr": r.nonceStr,           //随机串     
                    "package": r.package, 
                    "signType": "MD5",                //微信签名方式：     
                    "paySign": r.paySign              //微信签名 
                },
                function(res){  
                    dslog.consoleData(res);   
                    if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                        Vue.prototype.$notify({
                            title: '成功',
                            message: '支付成功！',
                            type: 'success'
                        });
                    }
                    reslove(1) ;     
                    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。 
                }
            ); 
         }
         if (typeof WeixinJSBridge == "undefined"){
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
         }else{
            onBridgeReady();
         }
    })
    .catch((err)=>{
        Message.error(error);
    });
  })
}
export default pay;
