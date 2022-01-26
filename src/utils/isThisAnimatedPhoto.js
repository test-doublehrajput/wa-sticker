// import gif from '../type/gif';
//  import png from '../type/gif';
import {isGif, isGifAnimated } from './type/Gif';
import {isWebp, isWebpAnimated} from './type/Webp';

const log = console.log;
function isThisAnimatedPhoto(buffer){
    // log(buffer.length)
    // implement for png kater if required

    if (isGif(buffer) && isGifAnimated(buffer)){
        return true
    }

    if (isWebp(buffer) && isWebpAnimated(buffer)){
        return true
    }

    return false;
    // Webp(buffer)
}

export const isThisAnimatedWEBP =(buffer)=>{
    return (isWebp(buffer) && isWebpAnimated(buffer))
}

export default isThisAnimatedPhoto