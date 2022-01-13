import React from 'react';
import {  
  PermissionsAndroid,
} from 'react-native';
import RNFS from 'react-native-fs';

// PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)

export default function InternalStorage(){
    // return RNFS.readDir(RNFS.ExternalStorageDirectoryPath)
    return RNFS.getFSInfo()
    .then(res=>res)
}