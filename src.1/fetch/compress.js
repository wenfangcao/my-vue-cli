/* 
* 图片压缩
* img    原始图片
* width   压缩后的宽度
* height  压缩后的高度
* ratio   压缩比率 
*/
export default function resizeImage(path){
  return new Promise((callback)=>{
    
      var img = new Image();
      img.setAttribute("crossOrigin",'Anonymous')
      
      img.onload = function(){
       var w =  120 ;
       var h =  120 ;
       var quality =  0.7;  // 默认图片质量为0.7
       //生成canvas
       var canvas = document.createElement('canvas');
       var ctx = canvas.getContext('2d');
       // 创建属性节点
       canvas.width = w ;
       canvas.height = h ;
       console.log(img);
       ctx.drawImage(img, 0, 0, w, h);
       console.log(w,h);
       // quality值越小，所绘制出的图像越模糊
       var base64 = canvas.toDataURL('image/jpeg', quality );
       // 回调函数返回base64的值
       console.log(base64);
       callback(base64);
      }
      console.log(path);
      img.src = path;
  })
}