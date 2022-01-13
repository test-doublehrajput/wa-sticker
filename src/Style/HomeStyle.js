import { StyleSheet } from "react-native"

const HomeStyle = StyleSheet.create({
    control:{
        flex:2,
        backgroundColor:'white', 
        types:{
            flex:1,
            flexDirection: 'row',
            alignItems:'center',
            // paddingLeft:8,
            // backgroundColor:'white',        
            // marginBottom:10,
        },
        sort:{
            maxHeight: 40,
            flex:1,
            flexDirection: 'row',
            alignItems:'center',
            backgroundColor:'white',
            text:{
                marginLeft:10,
                fontSize:12,
                fontWeight:"400",
            },
            icon:{
                backgroundColor:'white',
                marginLeft:18,
                fontSize:14,
            }    
        },       
    },
    list:{
        flex:10,
        // paddingLeft:15,
        // paddingRight:15,
        // backgroundColor:'#FFF8F3',        
        // backgroundColor:'white',        
    },
    footer:{
        flex:1,
        flexDirection: 'row',
        padding:4,
        backgroundColor:'teal',
        shadowColor:'black',
        elevation:-40
    },
    buttons:{
        height:12,
        width:12,
        backgroundColor:'red'
    }
})


export default HomeStyle;
