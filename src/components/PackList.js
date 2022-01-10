import React from 'react';
import {View, Text, ScrollView,StyleSheet, FlatList, Pressable,Image, Alert } from 'react-native';
import Button from 'apsl-react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeStyle from 'app1/src/Style/HomeStyle';
import GetStickersAsset, {getDemo} from 'app1/src/utils/Stickers'

const url1 = "https://i.pinimg.com/originals/4f/5d/23/4f5d23170a65869ff7c210342516ad2c.jpg"
const url2 = "https://media-exp1.licdn.com/dms/image/C560BAQHNAHcfA93quA/company-logo_200_200/0/1609622702805?e=2159024400&v=beta&t=R8yjBWPU30_9yW2US2QMruKoXHVwGnDSv_P3HL4QnDI"
const url0 = "https://cdn.shopify.com/s/files/1/1061/1924/products/Rolling_Eyes_Emoji_Icon_d5a8401c-e785-4a6f-975d-856eadfd95de_large.png?v=1571606093"
const COLOR_WA = '#075E54'
const COLOR_WA2 = '#397e76'
const COLOR_WA3 = '#518e87'
const COLOR_WA4 = '#83afaa'
const color = ['FED1EF', 'A3E4DB', 'BAABDA', 'F2FFE9', 'FFB5B5']


const log = console.log;



export default function PackList({nav, data}){
    const [ StickersAsset, setAsset] = React.useState({});

    React.useEffect(()=>{
        GetStickersAsset()
        .then(res=>{
            setAsset(res)
        }) 
    },[])

    const image_data = [{

        name:'Heart',
        size:30/30,
        isAnimated:true,
        Authur:'Donald',
        tray:'url', 
        stickers:[
            {image_file:'url', emojis:['🔥','🤔']},
            {image_file:'url', emojis:['🔥','🤔']},
        ] 
    },
    {

        name:'Animal',
        size:30/30,
        isAnimated:true,
        Authur:'Biden',
        tray:'url', 
        stickers:[
            {image_file:'url', emojis:['🔥','🤔']},
            {image_file:'url', emojis:['🔥','🤔']},
        ] 
    },
    // {

    //     name:'Vehicles',
    //     size:30/30,
    //     isAnimated:true,
    //     Authur:'Elon',
    //     tray:'url', 
    //     stickers:[
    //         {image_file:'url', emojis:['🔥','🤔']},
    //         {image_file:'url', emojis:['🔥','🤔']},
    //     ]
    // },
    // {

    //     name:'Vehicles',
    //     size:30/30,
    //     isAnimated:true,
    //     Authur:'Elon',
    //     tray:'url', 
    //     stickers:[
    //         {image_file:'url', emojis:['🔥','🤔']},
    //         {image_file:'url', emojis:['🔥','🤔']},
    //     ]
    // },
    // {

    //     name:'Vehicles',
    //     size:30/30,
    //     isAnimated:true,
    //     Authur:'Elon',
    //     tray:'url', 
    //     stickers:[
    //         {image_file:'url', emojis:['🔥','🤔']},
    //         {image_file:'url', emojis:['🔥','🤔']},
    //     ]
    // },
    ]

    // const IconMain =()=><Image style={styles.IconMain} source={{uri:url1}}/>
    const Sticker =({main, trayUri })=>{
        let style1 = {};
        let uri = url1;
        if (main){
            style1=styles.icon.main;
            uri = trayUri   
        }else{
            style1=styles.icon.sub
        }


        return <Image style={style1} source={{uri:uri}}/>
    }

    const Left =({trayUri})=> {
        return (<View style={styles.left}><Sticker main={true} trayUri={trayUri}/></View>);
    }
    const Mid =({title})=> {
        // console.log('ok');
        return (

            
        <View style={styles.mid}>
            <View style={styles.info.upContainer}>
                <Text style={styles.info.upContainer.title}>{title}</Text>
                <Text style={styles.info.upContainer.authur}>- Mitali</Text>
                <Text style={styles.info.upContainer.packType}>Animated</Text>
            </View>
            <View style={styles.info.downContainer}>
                <Sticker main={false}/>
                <Sticker main={false}/>
                <Sticker main={false}/>
            </View>
        </View>

        );
    }
    const Right =({size})=>{
        return (
            <View style={styles.right.container}>
                <View style={styles.right.upContainer}>
                    <Text style={{fontSize:12, fontWeight:'800', color:'lightgrey'}}> {size}/30 </Text>
                    <Button style={{
                        backgroundColor: 'white',  
                        borderRadius:50,
                        borderColor:COLOR_WA4,
                        marginTop:8,
                        borderWidth:1,
                        height:30,
                        // width:60,
                        // width:80,
                        }} textStyle={{color:COLOR_WA4,fontWeight:"800", fontSize:12}}
                        >
                        Add
                    </Button>
                </View>
                <View style={styles.right.downContainer} >
                        {/* <Pressable onPress={()=>Alert.alert('share')}> */}

                        <View style={styles.right.downContainer.share}>
                            <Button style={{borderWidth:0}}>
                                <Icon name="share-alt" size={20} color={COLOR_WA4} />
                            </Button>
                        </View>
                        {/* </Pressable> */}
                        <View style={styles.right.downContainer.download}>
                            <Button style={{borderWidth:0}}>
                                <Icon name="download" size={20} color={COLOR_WA4} />
                            </Button>
                        </View>
              
                    
                    {/* <Icon name="share-alt" size={20} color="grey" />
                    <Icon name="download" size={20} color="grey" /> */}
                </View>
            </View>
        );
    }

    const renderPacks = ({item, index}) =>{
        let title = Object.keys(item)[0]
        let size = Object.values(item)[0].length
        // let tray = size?url1:'file:///'+Object.values(item)[0][0].path
        let trayUri = url1;

        if (size!==0){
            trayUri = "file:///"+Object.values(item)[0][0].path;
        }
        
        // let Title = Object.values(item)[0]
        
        // log(Object.keys(obj))
        return (
            <Pressable onPress={()=>nav.navigate('Details')} >
                <View style={styles.item}>
                    <Left trayUri={trayUri}/>
                    {/* <Pressable style={{backgroundColor:'red', padding:0}} onPress={()=>Alert.alert('hi')} > */}
                        <Mid title={title}/>
                    {/* </Pressable> */}
                    <Right size={size}/> 
                    {/* 
                    */}
                </View>
            </Pressable>
        );
    }

    return(
        <View style={styles.container}>
            <FlatList data={ StickersAsset }
            numColumns={1} 
            keyExtractor={(item, index) =>  index.toString() } 
            renderItem={renderPacks}
            />
        </View>
    );
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor:'white',
        paddingLeft:8,
        paddingRight:8,
        // paddingTop:28,
    },
    item:{
        flex:1,
        flexDirection:'row',
        height:130,
        backgroundColor:'white',
        borderWidth:2,
        borderRadius:18,
        borderColor:'#DCDCDC',
        marginTop:10,
        // marginBottom:8,
        // marginLeft:8,
        // marginRight:8,
        // shadowColor: '#DCDCDC',
        // shadowOffset: {width: 2, height: 4},
        // shadowOpacity: 0.2,
        // shadowRadius: 3,
        // elevation: 2,
        // shadowColor: '#52006A',
        // zIndex:900
    },
    left:{
        flex:1.2,
        // backgroundColor:'green',
        alignItems:'center',
        justifyContent:'center',
        // padding:0,
        paddingLeft:6,
    },
    mid:{
        flex:2,
        // alignItems:'center',
        // justifyContent:'center',
        backgroundColor:'white',
        paddingLeft:0,
        paddingBottom:10,
        paddingTop:14
    },
    icon:{
        main:{
            height:80,
            width:80,
            resizeMode:'cover',
            overflow: "hidden",
            borderRadius:75,
            // marginLeft:0,
        },
        sub:{
            height:40,
            width:40,
            resizeMode:'cover',
            overflow: "hidden",
            borderRadius:75,
            marginRight:8,
            // marginBottom:0,
        }
    },
    right:{
        container:{
            flex:1.2,
            justifyContent:'center',

            // backgroundColor:'pink',
            // padding:8
        },
        upContainer:{
            flex:1.8,
            alignItems:'center',
            justifyContent:'flex-end',
            // backgroundColor:'orange',
            paddingRight:12
        },
        downContainer:{
            flex:1,
            flexDirection:'row',
            paddingRight:12,
            // backgroundColor:'tomato',
            height:30,
            borderColor:'lightgrey',
            borderLeftWidth:0.8,
            share:{
                flex:1,
                width:50,
                justifyContent:'center',
                alignItems:'center',
                // backgroundColor:'white',
            },
            download:{
                flex:1,
                width:50,
                justifyContent:'center',
                alignItems:'center',
                // backgroundColor:'white',
            },
        }
    },
    info:{
        upContainer:{
            flex:2,
            // backgroundColor:'white',
            borderWidth:0,
            // paddingLeft:4,
            // marginLeft:8,
            title:{
                fontSize:14,
                fontWeight:'600',
            },
            authur:{
                fontSize:10,
                fontWeight:'300',
                fontStyle:'italic'
            },
            packType:{
                fontSize:10,
                fontWeight:'600',
            }
        },
        downContainer:{
            flex:1,
            flexDirection:'row',
            alignItems:'center',
            // justifyContent:'space-between',
            // backgroundColor:'white',
            borderWidth:0,
            // paddingLeft:4,
            // marginBottom:6,
            // marginLeft:8,

            
        }
    },
   
  });

