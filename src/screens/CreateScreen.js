import React from 'react'
import { 
  Pressable,
  StyleSheet, 
  Text, 
  View,  
  FlatList,
  StatusBar, 
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Switch,
  Alert
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import Gallary from '../components/Gallary';
import DecoratePack from '../utils/DecoratePack'
import RNWhatsAppStickers from 'react-native-whatsapp-stickers'
import RNFS from 'react-native-fs'
// import ImageResizer from 'react-native-image-resizer';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import isThisAnimatedPhoto, {isThisAnimatedWEBP} from '../utils/isThisAnimatedPhoto'

const log = console.log;

const Choose =({add2wa, justCreate})=> {
    return(
        <>
        <View style={mid2.btnHolder} > 
            <Pressable style={mid2.buttonAnimated} onPress={justCreate}>
                <Text style={mid2.text}>Create Only</Text> 
            </Pressable>
        </View>
        <View style={mid2.btnHolder2} > 
            <Pressable style={mid2.buttonStatic} onPress={add2wa}>
                <Text style={mid2.text}>Add to WhatsaApp</Text>
            </Pressable>
        </View>
        </>
    )
}

const Preview =({data, removeP})=> {
    // log('data in pre ',data)
    // let uri = "file:///"+item
    // const show =()=> console.log('logging')
    return(
        <FlatList 
            horizontal
            data={data}
            keyExtractor={(item, index)=> index.toString()}
            renderItem={({item, index})=>{
                let uri = "file://"+item
                return (
                    <Pressable onPress={()=>removeP(index)}>
                        <Image style={mid.img} source={{uri:uri}}/>
                    </Pressable>
                )
            }}
        />
    );

}

const Form =({isAnimated, setAnimated, packName, onChangePack, authorName, onChangeAuthor, send, add })=>{

    return(
        <>
            <View style={form.packName}>
                <TextInput placeholder='Pack Name' value={packName} onChangeText={onChangePack}/>
            </View>

            <View style={form.authorName}>
                <TextInput placeholder='Author Name' value={authorName} onChangeText={onChangeAuthor}/>
            </View>

            <View style={{flex:1,flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text style={{fontSize:15, fontWeight:'800', marginLeft:14,marginTop:14}}>is Animated ? {isAnimated.toString()}</Text>

            <Pressable 
                Style={{flex:1,backgroundColor:'red'}} 
                onPress={send}>
                <Text style={{
                        fontSize:14, 
                        fontWeight:'900', 
                        marginLeft:14,
                        marginTop:14}}> SEND 
                </Text>
            </Pressable>
            <Pressable 
                Style={{flex:1,backgroundColor:'red'}} 
                onPress={add}>
                <Text style={{
                        fontSize:14, 
                        fontWeight:'900', 
                        marginLeft:14,
                        marginTop:14}}> ADD 1 
                </Text>
            </Pressable>

            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isAnimated ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setAnimated}
                value={isAnimated}
            />
            </View>
            
        
        </>
    );
}

const addOne =  (path) =>{  
    // isThisAnimatedPhoto('path')
    // log('path ',path[0])
    var Buffer = require('buffer/').Buffer
    RNFS.readFile(path[0], 'base64')
    .then(base64=>Buffer.from(base64, 'base64'))
    .then(res=>isThisAnimatedWEBP(res))
    .then(result=>log(result))

}


export default function(){
    const [PreviewImages, setPreviewImages] = React.useState([]);
    const [isAnimated, setAnimated] = React.useState(false);
    const [PackName, setPackName] = React.useState('Pack 1');
    const [AuthorName, setAuthorName] = React.useState('Author 1');
    const [Version, setVersion] = React.useState(1);

    
    React.useEffect(()=>{
        // log('PreviewImages: ',PreviewImages)
        // log(`PackName:${PackName} | AuthorName:${AuthorName}`)
        // log('PreviewImages ',PreviewImages)
    },[AuthorName, PackName, PreviewImages, isAnimated])

    const removeP=(x)=>{
        setPreviewImages(PreviewImages.filter((i,index)=>index!==x));
    }

    
    const add =()=>{
        addOne(PreviewImages, 'Pack 1')
    }

    const send =async()=>{
        // log('sending,,,')
        try{
        
            const packData = {
                authorName:AuthorName,
                packName:PackName,
                isAnimated:isAnimated,
                version:Version,
                previewImages:PreviewImages,
            }

            let jsonData; 
            await DecoratePack(packData).then(r=>jsonData=r)
            console.log('jsonData  ',jsonData);
            // return 0;
            RNWhatsAppStickers.prepare(jsonData)
            .then(res=>res.slice(1))
            .then(str=>JSON.parse(str))
            .then(obj=>{
                log(obj['identifier'])
                return RNWhatsAppStickers.send(obj['identifier'],obj['identifier'])
            })
            .catch(err=>Alert.alert('Could not create pack',err.toString()))

        }catch(e){
            Alert.alert('Problem with pack',e.toString())
        }
        
    }
    return(
        <View style={root.main}>
                <View style={up.main}>
                    <Form 
                        isAnimated={isAnimated} 
                        setAnimated={setAnimated} 
                        packName={PackName} 
                        onChangePack={setPackName}
                        authorName={AuthorName}
                        onChangeAuthor={setAuthorName}
                        send={send}
                        add={add}
                        />
                </View>

                <View style={mid.main}>
                    <Preview data={PreviewImages} removeP={removeP}/>
                </View>

                
                <View style={down.main}>
                    <Gallary setP={setPreviewImages} typePhoto={isAnimated}/>
                </View>

                <View style={mid2.main}>
                    <Choose add2wa={send} justCreate={()=>(Alert.alert('123'))}/>
                </View>
        </View>
    );
}

const root = StyleSheet.create({
    main:{
        flex:1,
    },
})
const up = StyleSheet.create({
    main:{
        flex:0.5,
        backgroundColor:'white'
    }, 
})

const mid = StyleSheet.create({
    main:{
        flex:0.3,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'ghostwhite',
        borderWidth:1,
        borderColor:'lightgrey'
    },
    img:{
        width:50,
        height:50,
        marginLeft:15,
        // marginTop:10,
        resizeMode:'contain'
    }
})

const mid2 = StyleSheet.create({
    main:{
        flex:0.15,
        backgroundColor:'white',
        flexDirection:'row',
        paddingLeft:20,
        paddingRight:20,
        marginBottom:10,
        paddingTop:10,
    },
    btnHolder:{
        flex:1,
        padding:5,
    },
    btnHolder2:{
        flex:1,
        padding:5,
        
    },
    buttonAnimated:{
        flex:1,
        backgroundColor:'deeppink',
        alignItems:'center',
        justifyContent:'center',
    },
    buttonStatic:{
        flex:1,
        backgroundColor:'teal',
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        fontSize:12,
        fontWeight:"400",
        color:'white'
    }   

})


const down = StyleSheet.create({
    main:{
        flex:1.5,
        backgroundColor:'white'
    },
})

const form = StyleSheet.create({
    packName:{  
        borderBottomColor:'grey', 
        borderBottomWidth:1,
        width:'50%',
        marginLeft:20,
    },
    authorName:{  
        borderBottomColor:'grey', 
        borderBottomWidth:1,
        width:'50%',
        marginLeft:20,
    }  
})
const styles = StyleSheet.create({
    img:{
        width: 100,
        height: 100,
    },
    
});