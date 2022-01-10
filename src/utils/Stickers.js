var RNFS = require('react-native-fs');

const GetStickersAsset = () =>{
    return RNFS.readDir(RNFS.DocumentDirectoryPath)
    .then(result=>result.filter(item=>item.name === 'stickers_asset')[0].path)
    .then(parent=>RNFS.readDir(parent))
    .then(folders=>{
        return Promise.all( folders.map(aFolder=> {
            return RNFS.readDir(aFolder.path).then(res=> ({[aFolder.name]:res}) )
        } ))
    })
    .then(result=> {
        //! files can be zero for a folder
        ///* result is collection of array[files, foldername]
        //* create a array which contains object of  
        //* { folder_name : [files] 
        let arr = {};
        // result.map(item=> {Object.assign(arr,item)})
        return result;
    })
}

export default GetStickersAsset;
