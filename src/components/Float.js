import React from 'react'
import { 
    Pressable,
    StyleSheet, 
    Text, 
    View,   
    TouchableOpacity,
    Alert,
  } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

const CreateIcon = () => <Icon name='plus-circle' size={18} color='white' /> 

const Float = ({nav}) => {
  console.log(nav)  
  return(
        <Pressable
        style={{
          height: 70,
          width: 160,
          borderWidth: 3,
          borderRadius: 50,
          borderColor: 'white',
          backgroundColor: 'teal',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 100,
          right: 20,
          shadowColor: 'black',
          // shadowOffset: {width: 42, height: 44},
          // shadowOpacity: 1,
          // shadowRadius: 43,
          elevation: 20,
        }}
        onPress={()=>nav.navigate('Gallary') }
        >

            <Text style={{color:'white',fontSize:16, fontWeight:'600',}}> <CreateIcon/> {''} Create</Text> 
 
        </Pressable>
    )
}

const styles = StyleSheet.create({
  shadow:{
    // backgroundColor:'red',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  }
})
export default Float