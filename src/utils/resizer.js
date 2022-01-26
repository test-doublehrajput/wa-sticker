import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';
import RNImageTools from 'react-native-image-tools-wm';

import { Alert } from 'react-native';
const log = console.log;
const maxWidth = 512
const maxHeight = 512
const compressFormat = 'WEBP'
const quality = 50
const rotation = 0
const outputPath = null
const options = {mode:'cover', onlyScaleDown:false}
export function FixImages(images){
    // log('FixImages ',images.length)
    return Promise.all(
        images.map(item=>{
            try{
                return ImageResizer.createResizedImage(item, 512, 512, 'WEBP', 0.1, 0, null, false, {mode:'cover'} )
                .then(r=>{
                    // log('resizing got path as  ',r)
                    log('before r = ',r);
                    return RNImageTools.resize(r.uri, 512,512);
                })
                .then(path => {
                    log('After  ',path);
                    return path.uri;
                })
                .catch(er=>log('er ',er))
            }catch(e){
                Alert.alert('Something went wrong ',e.toString());
            }
            // .then(response => {
                // response.uri is the URI of the new image that can now be displayed, uploaded...
                // response.path is the path of the new image
                // response.name is the name of the new image with the extension
                // response.size is the size of the new image
            //     log('response ',response.path)
            //     return response.path
            // })
            // .catch(err => {
            //     // Oops, something went wrong. Check that the filename is correct and
            //     // inspect err to get more details.
            // });
        })
  
    )

}

export function FixIcon(image){
    // log('FixImages ',images.length)
    console.log('images: in fixicon : ',image)
   
    return ImageResizer.createResizedImage(image, 96, 96, 'WEBP', 90, 0, null, false, {mode:'cover'} )
    .then(r=> RNImageTools.resize(r.uri, 512,512))
    .then(path =>path.uri)
    .catch(er=>Alert.alert('er ',er))

    // .then(response => {
        // response.uri is the URI of the new image that can now be displayed, uploaded...
        // response.path is the path of the new image
        // response.name is the name of the new image with the extension
        // response.size is the size of the new image
    //     log('response ',response.path)
    //     return response.path
    // })
    // .catch(err => {
    //     // Oops, something went wrong. Check that the filename is correct and
    //     // inspect err to get more details.
    // });

}