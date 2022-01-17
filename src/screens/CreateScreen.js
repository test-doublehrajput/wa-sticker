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
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
import Gallary from '../components/Gallary';

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

const Preview =({data})=> {
    log('data in pre ',data)
    // let uri = "file:///"+item
    return(
        <FlatList 
            horizontal
            data={data}
            keyExtractor={(item, index)=> index.toString()}
            renderItem={({item})=>{
                log('item ',item)
                let uri = "file:///"+item

                return <Image style={mid.img} source={{uri:uri}}/>
            }}
        />
    );

}

const Form =()=>{
    return(
        <>
            <View style={form.packName}>
                <TextInput placeholder='Pack Name' value='Pack 1'/>
            </View>

            <View style={form.authorName}>
                <TextInput placeholder='Author Name' value='Author1'/>
            </View>
        </>
    );
}
export default function(){
    const [PreviewImages, setPreviewImages] = React.useState([]);

    React.useEffect(()=>{
        log(PreviewImages)
    },[])

    return(
        <View style={root.main}>
                <View style={up.main}>
                    <Form/>
                </View>
                <View style={mid.main}>
                    <Preview data={PreviewImages}/>
                </View>
                <View style={mid2.main}>
                    <Choose/>
                </View>
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
        backgroundColor:'lightgrey',
    },
    img:{
        width:50,
        height:50,
        marginLeft:15,
        // marginTop:10
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