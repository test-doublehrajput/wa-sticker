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
// import Storage0 from '../utils/Storage0';
import Gallary from '../components/Gallary';

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


export default function CreateScreen({route, navigation}){
    // const [Grid, setGrid] = React.useState({});
    // const [Config, setConfig] = React.useState({...config});
    // const [Animated, setAnimated] = React.useState(false);
    // const [Name, setName] = React.useState('Random ');
    // const url1 = "https://thumbs.dreamstime.com/b/demo-computer-key-to-download-version-software-trial-64543995.jpg"
    // const [path, setPath] = React.useState(Gal) 
    const [demo, setDemo] = React.useState() 
    
    React.useEffect(()=>{
        // setDemo(p=>[...p,12])
    },[])

    // const test =p=>log('in paraent: I got ',p);
    const test =p=>log('in paraent: state demo is ',demo);

    return(
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}> 
            <Pressable   onPress={()=>navigation.navigate('Home',{check:setDemo})}>
                <Text style={styles.text1}> ok {demo}</Text>
            </Pressable>
            
            <>
              <Gallary demo={setDemo}/>
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
