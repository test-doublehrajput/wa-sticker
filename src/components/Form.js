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

export default function Form(){
    return(
        <View style={styles.main}>
            <Text>Form</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:'red'
    },
})

