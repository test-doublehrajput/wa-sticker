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

const url1 = "https://images.unsplash.com/photo-1642327939972-0a862be6c638?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
const url2 = "https://media.istockphoto.com/photos/labyrinth-picture-id139723134?s=612x612"
const url3 = "https://media.istockphoto.com/photos/white-sticky-note-with-happy-new-year-2022-and-red-push-pin-on-yellow-picture-id1356040800?b=1&k=20&m=1356040800&s=170667a&w=0&h=MyPUoGqq5HMJVDYVSzctZD0mzoZO7lOycUUDpgXR4SM="
const log = console.log;

const Choose =()=> {
    return(
        <>
        <View style={mid2.btnHolder} > 
            <Pressable style={mid2.buttonAnimated}>
                <Text style={mid2.text}>Animated</Text> 
            </Pressable>
        </View>
        <View style={mid2.btnHolder2} > 
            <Pressable style={mid2.buttonStatic}>
                <Text style={mid2.text}>Static</Text>
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

const Form =({isAnimated, setAnimated, packName, onChangePack, authorName, onChangeAuthor, send })=>{

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

// RNFS.readDir("/data/user/0/com.app1/files/stickers_asset")
// RNFS.readDir("/data/user/0/com.app1/files/stickers_asset/Pack 2")
// .then(res=>{
//     // var normalizeFilePath = (path: string) => (path.startsWith('file://') ? path.slice(7) : path);
//     let afile = res.map(i=>i.path);
//     console.log(afile)
//     // console.log(normalizeFilePath(afile));
//     // console.log(normalizeFilePath("file:///data/user/0/com.app1/files/stickers_asset/Pack 2"));
//     // RNFS.copyFile(afile, "/data/user/0/com.app1/files/stickers_asset/Pack 2/new.webp")
//     // .then(res1=>console.log('res1 ',res1))
// })
RNWhatsAppStickers.getDownloadedStickers().then(res=>console.log('down ',res))

export default function(){
    const [PreviewImages, setPreviewImages] = React.useState([]);
    const [isAnimated, setAnimated] = React.useState(false);
    const [PackName, setPackName] = React.useState('Pack 1');
    const [AuthorName, setAuthorName] = React.useState('Author 1');

    
    React.useEffect(()=>{
        // log('PreviewImages: ',PreviewImages)
        // log(`PackName:${PackName} | AuthorName:${AuthorName}`)
    },[AuthorName, PackName, PreviewImages])

    const removeP =(x)=>{
        setPreviewImages(PreviewImages.filter((i,index)=>index!==x));
    }

    const send =()=>{
        const packData = {
            authorName:AuthorName,
            packName:PackName,
            isAnimated:isAnimated,
            previewImages:PreviewImages,
        }
        let jsonData = DecoratePack(packData)
        RNWhatsAppStickers.prepare(jsonData)
        .then(res=>console.log(res))
        
        
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
                        />
                </View>

                <View style={mid.main}>
                    <Preview data={PreviewImages} removeP={removeP}/>
                </View>

                {/* <View style={mid2.main}>
                    <Choose/>
                </View> */}
                
                <View style={down.main}>
                    <Gallary setP={setPreviewImages}/>
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
        paddingLeft:10,
        paddingRight:10,
        marginBottom:10,
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
        fontSize:16,
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