export default function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
       //这个是安卓操作系统
       //alert("是安卓");
       return false 
    }
    if (isIOS) {
　　　　//这个是ios操作系统
        //alert("ios");
        return true 
    }
}