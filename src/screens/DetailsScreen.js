import React from 'react';
import {View, Text, StyleSheet,FlatList, Image} from 'react-native';
import Button from 'apsl-react-native-button'

const log = console.log;
const url0 = "https://cdn.shopify.com/s/files/1/1061/1924/products/Rolling_Eyes_Emoji_Icon_d5a8401c-e785-4a6f-975d-856eadfd95de_large.png?v=1571606093"
const url1 = "https://i.pinimg.com/originals/4f/5d/23/4f5d23170a65869ff7c210342516ad2c.jpg"
const url2 = "https://media-exp1.licdn.com/dms/image/C560BAQHNAHcfA93quA/company-logo_200_200/0/1609622702805?e=2159024400&v=beta&t=R8yjBWPU30_9yW2US2QMruKoXHVwGnDSv_P3HL4QnDI"
const url3 = "https://www.pinclipart.com/picdir/middle/148-1486972_mystery-man-avatar-circle-clipart.png"
const COLOR_WA = '#075E54'
const COLOR_WA2 = '#397e76'
const COLOR_WA3 = '#518e87'
const COLOR_WA4 = '#83afaa'
const ADDTO = 'Add To WhatsApp'
const ROOT = "file://";
// const image_data = [
//   {bg:'white'},
//   {bg:'white'},
//   {bg:'white'},
//   {bg:'white'},
//   // {bg:'white'},
//   // {bg:'white'},
//   // {bg:'white'},
//   // {bg:'white'},
//   // {bg:'midnightblue'},
// ]

// let len =image_data.length;
// let remain = len%3
// let miss = 3-remain;
// // if(remain) miss==1?image_data.push({bg:'aliceblue', add:1}):image_data.push( {bg:'skyblue', add:'1'},{bg:'turquoise', add:'2'} )
// for(let i =1;i<=30-len;i++){
//   let index = i-1;
//   image_data.push({bg:'aliceblue', add:1})
// }

const DetailsScreen = ({ route, navigation }) => {

    const [Pack, setStickers] = React.useState({
      title: route.params.title,
      tray: ROOT+route.params.tray,
      size: route.params.size,
      stickers: Object.values(route.params.Stickers)[0].map(i=>i.path),
      toAdd: 3 - Object.values(route.params.Stickers)[0].length%3,
      canAdd : 1,
    })

    // lets make the cells as 3x count 
    // to prevent the size changing of cells of last row 
    // when it contains 1 or 2 cells
    if (Pack.canAdd) {
      if (Pack.toAdd === 1) Pack.stickers.push([])
      if (Pack.toAdd === 2) Pack.stickers.push([],[])
      Pack.canAdd = 0
    }
    
    const renderPacks =({item})=>{
      // TODO: should handle the https url
      // log(item)
      let uri = item?ROOT+item:url0;
      // return <View style={styles.body.iconContainer}></View>
      return(
        <View style={styles.body.iconContainer}>
          {/* <Text style={{fontWeight:'800', fontSize:20}}>{item.add?'unused':''}</Text><Text style={{fontSize:40}}>{item.add}</Text> */}
          <Image style={styles.icon.sub} source={{uri:uri}}/>
        </View>
      );
    }

    // console.log(image_data)
    return (
      <View style={styles.container} >
        <View style={styles.head.container}>
          <View style={styles.head.left}>
            <Image style={styles.icon.main} source={{uri:Pack.tray || url2}}/>
          </View>
          <View style={styles.head.right}>
            <Text style={styles.head.text.Title}>{Pack.title}</Text>
            <Text style={styles.head.text.Author}>Author name</Text>
            <Text style={styles.head.text.Animated}>Animated</Text>
            <Text style={styles.head.text.size}>{Pack.size}/30</Text>
          </View>
        </View>
        <View style={styles.body.container}>
          <FlatList data={ Pack.stickers }
              numColumns={3} 
              // contentContainerStyle={{ height: '100%' }}
              keyExtractor={(item, index) =>  index.toString() } 
              renderItem={renderPacks}
              />
        </View>
        <View style={styles.footer.container}>
            <Button style={{
              backgroundColor: COLOR_WA,  
              borderRadius:50,
              borderColor:COLOR_WA4,
              marginTop:8,
              borderWidth:1,
              // height:30,
              // width:60,
              // width:80,
              }} textStyle={{color:COLOR_WA4,fontWeight:"900", fontSize:18}}
              >
              {ADDTO}
            </Button>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    // backgroundColor:'lightgrey'
  },
  head:{
    container:{
      flex:1,
      flexDirection:'row',
      // backgroundColor:'lightgrey',
      padding:14,
      height:110,
      // borderRadius:4,
    },
    left:{
      flex:1,
      height:110,
      alignItems:'center',
      justifyContent:'center',
      // padding:4,
      backgroundColor:'white',
      borderTopLeftRadius:4,
      borderBottomLeftRadius:4,

    },
    right:{
      flex:2,
      height:110,
      paddingLeft:14,
      // alignItems:'center',
      justifyContent:'center',
      backgroundColor:'white',
      borderTopRightRadius:4,
      borderBottomRightRadius:4,
    },
    text:{
      Title:{
        // color:'black'
        fontWeight:'800',
      },
      Author:{
        // color:'black'
        fontWeight:'400',
      },
      Animated:{
        // color:'black'
        fontWeight:'400',
      },
      size:{
        // color:'black'
        fontWeight:'400',
      },
    }
  },
  body:{
    container:{
      flex:6,
      // height: '100%',
      // flexDirection:'row',
      alignContent:'center',
      justifyContent: "center",
      // backgroundColor:'green',
      padding:14,
    },
    iconContainer:{
      flex:1,
      alignContent:'center',
      justifyContent: "center",
      height:100,
      width:100,
      margin:12,
      // backgroundColor:'tomato',
    }
  },
  icon:{
    main:{
      height:100,
      width:100,
      resizeMode:'cover',
      overflow: "hidden",
      // borderRadius:75,
    },
    sub:{
      flex:1,
      justifyContent: "center",
      alignItems: "center",
      width:100,
      height:100,
      // backgroundColor:"green",
      // margin:10,
      // borderRadius:5
      // marginTop:12,
      // marginLeft:6,
      // marginRigh:6,
    }
  },
  footer:{
    container:{
      flex:1,
      // backgroundColor:'wheat'
      paddingLeft:14,
      paddingRight:14,
    }
  }
});
export default DetailsScreen;