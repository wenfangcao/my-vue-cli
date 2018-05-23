import isDev from './config'

var isdebug = false ;
//if(isDev){
    isdebug = true;
//}


export default {
    consoleData(data){
        if (isdebug){
            console.log(data)
        }
    },
    
    alertData(data){
        if(isdebug){
            alert(data)
        }
    }
}