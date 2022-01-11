import React, {useState} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    Pressable, 
    TextInput, 
    Alert,
    PermissionsAndroid,
    Image,
    Switch,
    Appearance,
} from 'react-native';
import RNWhatsAppStickers from 'react-native-whatsapp-stickers';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import {RNFS} from 'react-native-fs';
var RNFS = require('react-native-fs');

const log = console.log;
const Meta = {
    PUB:'Kishor Jena' , 
    EMAIL: 'xyz@myproject.xy',
    SITE: 'https://github.com/Jobeso/react-native-whatsapp-stickers',
    POLICY: 'https://github.com/Jobeso/react-native-whatsapp-stickers',
    LICENSE: 'https://github.com/Jobeso/react-native-whatsapp-stickers/blob/master/LICENSE',
  }

const STATIC_URL =[
        "https://raw.githubusercontent.com/WhatsApp/stickers/main/Android/app/src/main/assets/1/tray_Cuppy.png",
        "https://raw.githubusercontent.com/WhatsApp/stickers/main/Android/app/src/main/assets/1/01_Cuppy_smile.webp",
        "https://raw.githubusercontent.com/WhatsApp/stickers/main/Android/app/src/main/assets/1/02_Cuppy_lol.webp",
        "https://raw.githubusercontent.com/WhatsApp/stickers/main/Android/app/src/main/assets/1/03_Cuppy_rofl.webp"
    ]

const ANIMATED_URL = [
    "https://raw.githubusercontent.com/WhatsApp/stickers/main/Android/app/src/main/assets/2/01.png",
    "https://raw.githubusercontent.com/WhatsApp/stickers/main/Android/app/src/main/assets/2/07_OK.webp",
    "https://raw.githubusercontent.com/WhatsApp/stickers/main/Android/app/src/main/assets/2/07_OK.webp",
    "https://raw.githubusercontent.com/WhatsApp/stickers/main/Android/app/src/main/assets/2/07_OK.webp",
]



const emojis = ['😁', '🙂']

const stickers =(non_tray)=> {
    
    const stickers = non_tray.map(item=>({emojis:emojis, image_file:non_tray[1].uri}) )
    
    return stickers;
}
    
const pack1 = (tray, non_tray, name, isAnimated) => { 
    let data =  {
    "identifier": name,
    "name": name,
    "publisher": Meta['PUB'],
    "tray_image_file": tray[0].uri,
    "publisher_email": Meta['EMAIL'],
    "publisher_website": Meta['SITE'],
    "privacy_policy_website": Meta['POLICY'],
    "license_agreement_website": Meta['LICENSE'],
    "image_data_version":"1",
    "avoid_cache":false,
    "animated_sticker_pack":isAnimated,
    "stickers":stickers(non_tray)
    }
    return data;
}

// RNWhatsAppStickers.getDownloadedStickers().then(res=>log('ignore it | :',res));
try{
    RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
  .then((result) => {
    let stickers_asset_path = result.filter(item=>item.name === 'stickers_asset')[0].path;
    // log('Got path? ',stickers_asset_path);
    // console.log('GOT RESULT', result);
    // stat the first file
    
    return RNFS.readDir("file:///data/user/0/com.app1/files/stickers_asset/");
  })
  .then((statResult) => {
    // log('statResult ',statResult);
  })
//   .then(content=>{
//       log(content)
//   })
  .catch((err) => {
    console.log(err.message, err.code);
  });
}catch(err){
    log('err: ', err.toString());
}
// //
export default function Footer({navigation}){
    
    const [text, setText] = useState('')
    const [isAnimated, setAnimated] = useState(false)
    const [path, setPath] = useState('')

    const onChangeText =(text)=> {
        console.log('changed to ',text)
        setText(text)
    }

    const send = () => {
        pack1(text);
    }

    const pick=()=>{
        launchImageLibrary({
            multiple: true,
          }).then(images => {
            return images['assets']
          })
          .then(stickers=>{
            
            let non_tray = stickers.filter(item=>item.width === 512);
            let tray = stickers.filter(item=>item.width === 96);

            // log('tray: ',tray[0]);
            // log(`non_tray ${non_tray[0]} `);
            
            let config = pack1(tray, non_tray, text, isAnimated);

            return config;
            // let tray_image_file = stickers[0]['image_file']
            // return obj;
          })
          .then(res=>RNWhatsAppStickers.prepare(JSON.stringify(res)))
          .then(res1=>RNWhatsAppStickers.send(text,text))
          .catch(e=>console.log('pick error: ',e));
    }

    const toggleSwitch =()=> setAnimated(prev=>!prev)
    
    return(
        <>

            <Pressable>
                <Text style={styles.add}> ADD </Text>
            </Pressable>

        </>
    );
}

const styles = StyleSheet.create({
    add:{
        height:30,
        backgroundColor:'tomato',
        fontSize:20,
        color:'white',
        // margin:20
    },
    inpt:{
        height:50,
        backgroundColor:'teal',
        color:'white',
        // marginBottom:20
    }
})