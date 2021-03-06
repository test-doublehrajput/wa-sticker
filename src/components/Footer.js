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
} from 'react-native';
import RNWhatsAppStickers from 'react-native-whatsapp-stickers';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import {RNFS} from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
var RNFS = require('react-native-fs');

const log = console.log;
const Meta = {
    PUB:'Kishor Jena' , 
    EMAIL: 'xyz@myproject.xy',
    SITE: 'https://github.com/Jobeso/react-native-whatsapp-stickers',
    POLICY: 'https://github.com/Jobeso/react-native-whatsapp-stickers',
    LICENSE: 'https://github.com/Jobeso/react-native-whatsapp-stickers/blob/master/LICENSE',
  }



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

const storeData = async (value) => {
    let data =  {
        "identifier": "name",
        "name": "name",
        "publisher": Meta['PUB'],
        "tray_image_file": 'tray[0].uri',
        "publisher_email": Meta['EMAIL'],
        "publisher_website": Meta['SITE'],
        "privacy_policy_website": Meta['POLICY'],
        "license_agreement_website": Meta['LICENSE'],
        "image_data_version":"1",
        "avoid_cache":false,
        "animated_sticker_pack":"isAnimated",
        "stickers":"stickers(non_tray)"
        }
    
    try {
      await AsyncStorage.setItem('@storage_Key2', 'JSON.stringify(data)' )
    } catch (e) {
      // saving error
    }
}
const getData = async (value) => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key2')
      if(value !== null) {
          // log(value)
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }

  const getAllKeys = async (value) => {
    try {
      const value = await AsyncStorage.getAllKeys()
      if(value !== null) {
          // log(value)
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }

getAllKeys()

export default function Footer({navigation}){
    
    const [text, setText] = useState('')
    const [data, setData] = useState('')
    const [isAnimated, setAnimated] = useState(false)
    const [path, setPath] = useState('')

    const onChangeText =text=> setText(text)

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
    // Create screen will contain
    //    anim static
    // fotter button will be entry to this screen
    return(
        <View style={styles.container}>
            <Text style={styles.text1}> Under Development </Text>
            {/* <Pressable style={styles.inpt}>
             
            </Pressable> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      // declare in Homeastyle.js
      marginBottom:6,
    },
    text1:{
      color:'white', fontWeight:'400', fontSize:20, letterSpacing:4,
    },
    add:{
        flex:1,
        backgroundColor:'green',
        fontSize:12,
        color:'white',
        margin:4,
        borderWidth:2,
        borderColor:'white',
        borderBottomRightRadius:50,
        borderTopRightRadius:50,
    },
    inpt:{
        flex:1,
        backgroundColor:'green',
        fontSize:12,
        color:'white',
        margin:4,
        borderWidth:2,
        borderColor:'white',
        borderBottomLeftRadius:50,
        borderTopLeftRadius:50,
    }
})



