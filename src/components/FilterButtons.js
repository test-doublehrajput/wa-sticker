import React from 'react';
import {View, Text, ScrollView,StyleSheet, FlatList, Pressable } from 'react-native';
import Button from 'apsl-react-native-button'
import HomeStyle from 'app1/src/Style/HomeStyle';

export default function FilterButtons(){
    const filters = [
        {'All':'All1'},
        {'Animated':'Animated1'},
        {'Static':'Static1'},
        {'MyPack':'MyPack1'},
        {'Readymade':'Readymade1'}, 
    ]

    return(
    <ScrollView  horizontal={true} >  
            <View>  
        
        <Button style={{
            backgroundColor: '#ff80ab',
            borderRadius:20,
            marginLeft:12,
            borderWidth:0,
        }} 
            textStyle={{fontSize: 12, marginLeft:18, marginRight:18,color:'white'}}>
            All
        </Button>
        </View>  
        <View>  
        
        <Button style={{
            backgroundColor: '#ea80fc',
            borderRadius:20,
            marginLeft:12,
            borderWidth:0,
        }} 
            textStyle={{fontSize: 12, marginLeft:18, marginRight:18, color:"white"}}>
            Animated
        </Button>
        </View>  
        <View>  
        
        <Button style={{
            backgroundColor: '#ff6e40',
            borderRadius:20,
            marginLeft:12,
            borderWidth:0,
        }} 
            textStyle={{fontSize: 12, marginLeft:18, marginRight:18, color:'white'}}>
            Static
        </Button>
        </View>  
        <View>  
        
        <Button style={{
            backgroundColor: '#b388ff',
            borderRadius:20,
            marginLeft:12,
            borderWidth:0,
        }} 
            textStyle={{fontSize: 12, marginLeft:18, marginRight:18, color:'white'}}>
            Created by me
        </Button>
        </View>  
        <View>  
        
        <Button style={{
            backgroundColor: '#00b8d4',
            borderRadius:20,
            marginLeft:12,
            borderWidth: 0,
        }} 
            textStyle={{fontSize: 12, marginLeft:18, marginRight:18, color:'white'}}>
            Readymade
        </Button>
        </View>  
    </ScrollView>  
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
      },
      text: {
        fontSize: 16
      },
      wrapperCustom: {
        borderRadius: 8,
        padding: 6
      },
      logBox: {
        padding: 20,
        margin: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#f0f0f0',
        backgroundColor: '#f9f9f9'
      },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'black',
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });