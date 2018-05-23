let url = {

};


//公众号的唯一标识
//url.appid = "wx89b7174f50667e64" ;//公益
//url.appid = "wx4db2721429ee8d54" ;//风暴云平台
//url.appid = "wx945178066ea59711"; //矩阵风暴云

//回调地址 urlDecode加密
//url.redirect_uri = "http%3a%2f%2fcloud.tangqq.cn%2fdonate";

//服务器地址
//url.baseUrl = "http://cloud.tangqq.cn/DonateServer/";

//项目访问地址
//url.proUrl = "http://cloud.tangqq.cn/donate/#/"

//上线服
url.appid = 'wx89b7174f50667e64' ;
url.redirect_uri = "http%3a%2f%2fwww.quanmu.org.cn%2fdonate";
//url.baseUrl = 'http://115.159.77.50/DonateServer/';
url.baseUrl = 'http://www.quanmu.org.cn/DonateServer/';
url.proUrl = 'http://www.quanmu.org.cn/donate/#/';

//开发地址
url.devUrl = "localhost:8080"

//用户同意授权，获取code
url.weixinUrl = ('https://open.weixin.qq.com/connect/oauth2/authorize?appid='+url.appid+'&redirect_uri='+url.redirect_uri+'&response_type=code&scope=snsapi_userinfo&state=STATE=1#wechat_redirect');

//通过code换取网页授权access_token=
url.accessToken = "wxPub/accessToken";

///获取refreshToken
url.refreshToken = "wxPub/refreshToken";

//获取用户个人信息，openid 等
url.getMsg = "wxPub/getUserInfo";

//手机端h5注册
url.registerWx = "user/registerWx";

//手机端h5登录
url.loginWx = "user/loginWx";

//手机端h5用户个人信息
url.userInfo = "user/myInfo";


//项目列表
url.ItemList = "project";

//项目详情信息
url.ItemDetails = "project/";

//捐助用户列表
url.userList = "donates";

//查询某个人的捐赠记录
url.myDonates = "donates/myDonates";

//微信统一下单接口
//描述：在微信后台生成预支付订单，微信支付的第一步！
url.unifiedOrder = "WxPay/unifiedOrder";

//获取支付signature参数
url.getWxConfig = "wxPub/getWxConfig" ;


//邀请者手机端昵称头像
url.getLessInfo = "user/getLessInfo/" ;//参数直接加后面

//获取分享图片页面的信息
url.getSharedInfo = "user/getSharedInfo" ;


//万能登录接口，无敌
url.autoLogin = "user/autoLogin" ;
module.exports = url;
