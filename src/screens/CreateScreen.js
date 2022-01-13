import React from 'react';
import { 
  Pressable,
  StyleSheet, 
  Text, 
  View,  
  Image,
  PermissionsAndroid,
  FlatList,
} from 'react-native';

import RNFS from 'react-native-fs';
import InternalStorage from '../utils/InternalStorage';

const log = console.log;
const keys = Object.keys;
const values = Object.values;


let config = {
    identifier:'',
    name:'',
    publisher:'',
    email:'',
    site:'',
    policy:'',
    tray:'',
    stickers:[]
}



const isImageFile = (item) => {
    const extensions = ['jpg', 'jpeg', 'png', 'webp', 'gif']
    const pattern = new RegExp('\.[0-9a-z]+$') ;
    let fileName = item.name.toLowerCase();
    let res;
    try{
        res = fileName.match(pattern)[0].substring(1)// match, remove [], remove dot(.) from first postion
    }catch(err){
        log('err ',fileName)
    }

    let isImage = extensions.some(ext => res.includes(ext))
    // if(isImage.length===0) log(item.name);
    return isImage;
}

const getLastFolder = (item) => {
    let arr = item.split('/');
    let last = arr[arr.length-1];
    return last;
}

let Gallary = {} ;
let Gal = [] ;

try{

    RNFS.readDir(RNFS.ExternalStorageDirectoryPath)
    .then(res=>{
        let images = res.filter(item=>(item.isFile() && isImageFile(item)))
        Gallary['0'] = images;
        images.map(i=>Gal.push({path:i.path}))
        // GallaryList.push(images)
        let dir = res.filter(item=>item.isDirectory())
        return dir;
    })
    .then(dirs=>{
        return dirs.map(item=>item.path)
    }
    ).then(paths=>{
        // got folders paths
        return Promise.all(
            paths.map(item=>RNFS.readDir(item) // reading each folders
            .then(res=>[res,getLastFolder(item)])) // sending files+folderpath
        )
        
    })
    .then(res1=>{
        // log(Gallary)
        res1.map(item=>{
            let fileOnly = null;
            if(item[0].length > 0){
                item[0].map(item1=> {
                    try{
                        if( item1.isFile() && isImageFile(item1) ) {
                            // log(item[1],' has ',item1.name)
                            if(!Gallary.hasOwnProperty(item[1])){
                                Gallary[item[1]] = []
                            }
                            Gallary[item[1]].push(item1)
                            Gal.push({path:item1.path})
                            
                        } 
                    }catch(err){
                        log('err ',err)
                    }
                } )
                // if(fileOnly.length !== 0 && Object.keys(fileOnly).length !== 0){
                //     // passed
                //     let imageOnly = fileOnly.filter(aFile =>isImageFile(aFile))
                //     if(imageOnly.length !== 0){
                //         // passed

                //     }
                // }
            }
            
        })
        // let gel = [] 
        // Object.keys(Gallary).map(i=>gel.push(Gallary[i]))
        // log(gel[0])
        

        // res1[0].map((item, index)=>{
        //     log(item)
        //     // item.map(item1=>item1.isDirectory())
        // })
    } )
    
}catch(e){
    log(e)
}

export default function CreateScreen({route, navigation}){
    const [Grid, setGrid] = React.useState({});
    const [Config, setConfig] = React.useState({...config});
    const [Animated, setAnimated] = React.useState(false);
    const [Name, setName] = React.useState('Random ');
    const url1 = "https://thumbs.dreamstime.com/b/demo-computer-key-to-download-version-software-trial-64543995.jpg"
    const [path, setPath] = React.useState(Gal) 

    React.useEffect(()=>{
        setPath(Gal)
    },[Gal])
    
    const renderImages =({item})=>{
        let uri = "file:///"+item.path
        let img = <Image style={styles.images} source={{uri:uri}}/>
        return img
    }

    return(
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}> 
            <Pressable   onPress={()=>navigation.navigate('Home')}>
                <Text style={styles.text1}> ok </Text>
            </Pressable>
            <>
            <FlatList data={ path }
              numColumns={3} 
              // contentContainerStyle={{ height: '100%' }}
              keyExtractor={(item, index) =>  index.toString() } 
              renderItem={renderImages}
              />
            </>

        </View>
    )
}

const styles = StyleSheet.create({
    text1:{
        letterSpacing:4,
        fontSize:16,
        fontWeight:'200',
    },
    images:{
        // flex:1,
        width:100,
        height:100,
        resizeMode:'contain',
        margin:14

    }
})
