import RNWhatsAppStickers from 'react-native-whatsapp-stickers'

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

export default function DecoratePack(data, ){
    // log('We have ',data)
    let image_file = data.previewImages;

    const readyToUse = JSON.stringify(
      {
        identifier : data.packName,
        name : data.packName,
        publisher : data.authorName,
        tray_image_file : image_file[0],
        publisher_email : meta.email,
        publisher_website : meta.site,
        privacy_policy_website : meta.policy,
        license_agreement_website : meta.license,
        image_data_version : '2',
        avoid_cache : 'false',
        animated_sticker_pack : data.isAnimated,
        stickers : [
          {"image_file": image_file[1] , emojis:['😀', '😁']},
          {"image_file": image_file[2] , emojis:['😀', '😁']},
          {"image_file": image_file[3] , emojis:['😀', '😁']}
        ]
      },
      null,
      4
    )

    return readyToUse
}