import React from 'react';
import {  
  PermissionsAndroid,
} from 'react-native';
import RNFS from 'react-native-fs';

const log = console.log;
// PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)

let Gallary = {} ;



const isImageFile = (item) => {
  
  const extensions = ['jpg', 'jpeg', 'png', 'webp', 'gif']
  const pattern = new RegExp('\.[0-9a-z]+$') ;
  let fileName;
  let res;
  let isImage;
  
  try{
    fileName = item.name.toLowerCase();
  }catch(err){
    log('err ',err)
  }
  
  try{
      res = fileName.match(pattern)[0].substring(1)// match, remove [], remove dot(.) from first postion
  }catch(err){
      log('err2 ',err)
  }

  try{
    isImage = extensions.some(ext => {
      // log(ext)
      return res.includes(ext)
    } )
    // if(isImage){
    //   // if(res === 'jpg' || res === 'jpeg' || res === 'gif' || res === 'png' || res === 'webp'){
    //     // log('image: ',res)
    //   // }
    // }else{
    //   log('not image ',res)
    // }

  }catch(err){
    log('er3 ',err)
  }
  // if(isImage) log(item.name);
  
  return isImage;
}

const getLastSegment = (item) => {
  // folders only // should not contain file in the end.
  // folder0/.../folderN // will return folderN
  let arr = item.split('/');
  let last = arr[arr.length-1];

  return last;
}

const getParentOfFile = (item) => {
  // files only // last segment must contain file.ext
  // folder0/.../folderN/file.ext returns folderN 
  let arr = item.split('/');
  let last = arr[arr.length-2];
  return last;
}

const cleaning=(res, item)=>{
  // log('__________ (')
  // log(res)
  //* check each folder if it contains folders
  let isFileOnly = res.every(i=>i.isFile())
  

  // some folders returns true for isFile() 
  // elimitate the bug by checking length of res
  // if all are files then return
  if(isFileOnly && res.length){
    //TODO filter for images only
    return [getLastSegment(item),res]
  }
  
  
  // Extracting Files..  from current folder res
  let fileOnly = res.filter(i=>i.isFile())
  
  // check if not null //* Eliminating bug for now
  if(fileOnly.length !== 0){
    
    return [getLastSegment(item),res]
  }
  
  
  
  // log('__________ )')
  // let a = res.map(i=>i.isDirectory())
  return [getLastSegment(item),[]]
}


// only first and second level scanning
// root 0 and all folders in 0
// TODO provide methods to scan each folder on given path. go nested with user tap.
export default function Storage0(){
  try{
    return RNFS.readDir(RNFS.ExternalStorageDirectoryPath) // scan root /0
    .then(res=>{
        let directories = []

        let images = res.filter(item=>{
          if (item.isFile() && isImageFile(item)) return true
          if (item.isDirectory()){
            directories.push(item)
            return false
          }
        })
        
        // get path of first image file (all images have same parent path)
        let path = images[0].path 
        
        // store all images to one key
        Gallary[getParentOfFile(path)] = images;  

        // let dir2 = res.filter(item=>item.isDirectory())
        return directories;
    })
    .then(folders=>{
        // make array of paths of all folders
        let paths = folders.map(item=>item.path)

        // read each folder 
        return Promise.all(
            paths.map(item=>RNFS.readDir(item)  // reading each folders
            .then((res)=> {
              let res1 = cleaning(res, item)
              return res1;
            } )) // return [folder,[files]]
        )
        
    })
    // .then(res1=>res1.filter())
    .then(res1=>{
        // we have res1 as array of array [[folder,[files]],...]
        // It contains mixed files except key 0; as we have already filtered ot
        //TODO double check the files at 0 as it is skipped
        
        // remove blanks
        let noBlank = res1.filter(item=>item[1].length);
        
        // filter for images only
        let imagesOnly0 = noBlank.map(files=>{
          // log('____[<')
          let tmp = files[1]
          let imgs = tmp.filter(aFile=>isImageFile(aFile))
          
          let obj = {[files[0]]:imgs}
          
          return obj
          // log('____>]')
        })
        
        // remove blanks from final
        let imagesOnly = imagesOnly0.filter(item=>{
          let key = Object.keys(item)[0]
          return item[key].length
        });
        
        
        // convert the array to object {Folder:[files],...} for ease of access later 
        // let t = res1.map(i=>Gallary[i[0]] = i[1])
        // log(t.length) // 34 folders
        // log(noNull.length) // 34 folders
        
        // log(final)
        // final.map(i=>log(i[Object.keys(i)[0]].length) )
        // get rid of all functions exist in oebject because It could cause error in some cases; i.e route, storing 
        // Gallary = JSON.parse(JSON.stringify(Gallary))

        // get rid of all functions exist in oebject because It could cause error in some cases; i.e route, storing 
        let final = JSON.parse(JSON.stringify(imagesOnly))
        
        // log(Gallary)
        // log('after ',Gallary['0'])
        return final;
        // return Gallary;
    } )
    
  }catch(e){log(e)}
}