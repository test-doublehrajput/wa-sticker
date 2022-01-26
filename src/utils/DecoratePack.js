import RNWhatsAppStickers from 'react-native-whatsapp-stickers'
import {FixImages, FixIcon} from '../utils/resizer';

const log = console.log;

const meta = {
  pub:'Kishor Jena' , 
  email: 'xyz@myproject.xy',
  site: 'https://github.com/Jobeso/react-native-whatsapp-stickers',
  policy: 'https://github.com/Jobeso/react-native-whatsapp-stickers',
  license: 'https://github.com/Jobeso/react-native-whatsapp-stickers/blob/master/LICENSE',
}

export function send(id){
    RNWhatsAppStickers.send(id, id)
}

export default async function DecoratePack(data, ){
    // log('We have ',data)
    // let image_files0 = [] 
    // log('image_files0 ',image_files0)    
    var image_files;
    var tray_image_file;

    var stickers;
  //   RNFFprobe.getMediaInformation(data.previewImages[0]).then(information => {
  //     console.log('Result: ' + JSON.stringify(information));
  // });
    if(data.isAnimated){
      log('Animated Pack')
      image_files = data.previewImages;
      await FixIcon(data.previewImages[0]).then(res=>{
        // log('res for tray tray',res[0])
        tray_image_file = res;
      })
    }else{
      // else fix all static images
      log('Static Pack')
      await FixImages(data.previewImages).then(res=>{
        image_files = res;
      })
      tray_image_file = image_files[0];
    }
    stickers = image_files.map(item=>( {"image_file": item, emojis:['😀', '😁']} ));
    
    // image_files = data.previewImages
    // const tray_image_file = image_files[0];
    const image_data_version = data.version

    const readyToUse = JSON.stringify(
      {
        identifier : data.packName,
        name : data.packName,
        publisher : data.authorName,
        tray_image_file : tray_image_file,
        publisher_email : meta.email,
        publisher_website : meta.site,
        privacy_policy_website : meta.policy,
        license_agreement_website : meta.license,
        image_data_version : image_data_version,
        avoid_cache : 'false',
        animated_sticker_pack : data.isAnimated,
        stickers : stickers
      },
      null,
      4
    )

    return readyToUse
}