import React from 'react';
import { 
  Pressable,
  StyleSheet, 
  Text, 
  View,  
  Image,
  PermissionsAndroid,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';

import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/Entypo';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Storage0 from '../utils/Storage0';

const log = console.log; 

const FolderButton = ({pick}) => (
    <Pressable onPress={pick} style={styles.gallary.folderIcon}>
        <View style={styles.icon}> 
            <Icon name="folder-images" size={40} color="teal"/> 
        </View>
    </Pressable>
) 

// const ImageCell = (uri) => {
//     return(
//         <Image style={styles.images} source={{uri:uri}} onPress={()=> Alert.alert('selected') }/>
//     ) 

// }
    

export default function Gallary({route, navigation, setP, typePhoto}){
    const [allPaths, setAll] = React.useState([{}]);
    // TODO 
    const [Folders, setFolders] = React.useState({});
    
    const [Selected, select] = React.useState([]);
    

    // 
    React.useEffect(()=>{  
        //* For Foldered
        // Storage0().then(res=>{      
        //     res.map(i=>{
        //         let k = Object.keys(i);
        //         let v = Object.values(i);
        //         setAll((prev)=>[...prev, ...v.flat()])
        //         setFolders({[k]:v})
                
        //     })
        //     return res;
        // })
        //* For Sorted Flat Array (All files only)
        Storage0(typePhoto).then(res=>setAll(p=>[...p,...res]))

    },[typePhoto])

    React.useEffect(()=>{  
        // log(Selected)
    },[Selected])
    // log(allPaths[0])
    const pick=()=>{
        launchImageLibrary({
            multiple: true,
        })
        .then(images =>setP(p=>[...p,...images['assets'].map(i=>i.uri)]))
    }
    const renderImages =({item})=>{
        // let demo = "https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"

        if(!Object.keys(item).length){
            // uri=demo
            return <FolderButton pick={pick}/>
        }
        
        let uri = "file:///"+item.path
        // return ImageCell(uri)

        return (
            <Pressable onPress={()=>setP(p=>[...p,item.path])}>
                <Image style={styles.gallary.img} 
                        source={{uri:uri}} 
                        />
            </Pressable>
        )        
         
    }

    const renderSelected = ({item}) => {
        let uri = "file:///"+item
        return (
            <Pressable onPress={()=>select(p=>[...p,item.name])} style={styles.preview.imgContainer}>
                <Image style={styles.preview.img} 
                        source={{uri:uri}} 
                        />
            </Pressable>
        )
    }

    return (
        <View style={styles.main}>
            {/* <Pressable onPress={()=>{
                demo('new 123')
                return Alert.alert('blank')
            }} >
                <Text>Press Me</Text>
            </Pressable> */}
            {/* <View style={styles.preview.container}> 
                <FlatList data={Selected}
                    horizontal={true}
                    numRows={1} 
                    // contentContainerStyle={{ height: '100%' }}
                    keyExtractor={(item, index) =>  index.toString() } 
                    renderItem={renderSelected}
                    style={styles.preview.flatlist}
                />
            </View> */}
            <View style={styles.gallary.container}>
                <FlatList data={allPaths}
                numColumns={3} 
                // contentContainerStyle={{ height: '100%' }}
                keyExtractor={(item, index) =>  index.toString() } 
                renderItem={renderImages}
                
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main:{
        flex:1, 
        // flexDirection:'column', 
        // justifyContent:'center',
        // alignItems:'center'
    },

    pack:{
        container:{
            flex:1,
            backgroundColor:'skyblue',
        }

    },
    preview:{
        container:{
            flex:0.5,
            // height:80,
            backgroundColor:'lightgrey',
            justifyContent: "center",
            // width: "100%",
        },
        flatlist:{
            // backgroundColor:'skyblue',
        },
        img:{
            width:100,
            height:50,
            resizeMode:'contain',
            // backgroundColor:'green'
        },
        imgContainer:{
            width:100,
            height:50,
            resizeMode:'contain',
            margin:8,
            // backgroundColor:'red',
        }

    },
    gallary:{
        container:{
            flex:2
        },
        folderIcon:{
            width:100,
            height:100,
            // resizeMode:'contain',
            margin:14,
            // flex:1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'lightgrey',
        },
        iconContainer:{

        },
        img:{
            // flex:1,
            width:100,
            height:100,
            resizeMode:'contain',
            margin:16
        }
    },
    text1:{ // sample
        letterSpacing:4,
        fontSize:16,
        fontWeight:'200',
    },
})