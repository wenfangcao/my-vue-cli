import $api from './api.js'
import url from './url.js'
export default function share(){
    return new Promise((reslove)=>{    
        var p= url.getWxConfig + "?url=" + window.location.href;
        $api.get(p).then((res) => {
            var res = res.result ;
            // console.log("appId:" + url.appid + "timeStamp:" + res.timestamp + "nonceStr" + res.nonceStr + "signature" + res.signature);
            wx.config({
                debug: false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: url.appid, // 必填，公众号的唯一标识
                timestamp: res.timestamp,// 必填，生成签名的时间戳
                nonceStr: res.nonceStr, // 必填，生成签名的随机串
                signature: res.signature,// 必填，签名
                jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                // 'startRecord',
                // 'stopRecord',
                // 'onVoiceRecordEnd',
                // 'playVoice',
                // 'pauseVoice',
                // 'stopVoice',
                // 'onVoicePlayEnd',
                // 'uploadVoice',
                // 'downloadVoice',
                // 'chooseImage',
                // 'previewImage',
                // 'uploadImage',
                // 'downloadImage',
                // 'translateVoice',
                // 'getNetworkType',
                // 'openLocation',
                // 'getLocation',
                // 'hideOptionMenu',
                // 'showOptionMenu',
                // 'hideMenuItems',
                // 'showMenuItems',
                // 'hideAllNonBaseMenuItem',
                // 'showAllNonBaseMenuItem',
                // 'closeWindow',
                // 'scanQRCode',
                // 'chooseWXPay',
                // 'openProductSpecificView',
                // 'addCard',
                // 'chooseCard',
                // 'openCard'
                ] // 必填，需要使用的JS接口列表
            });
            wx.ready(function (e) {
                console.log("分享初始化完成");
                reslove();
            });  
        })
    }); 
}