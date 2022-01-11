var RNFS = require('react-native-fs');
const log = console.log;

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
        // let result1 = [...result]
        // result1[0].map(item => {
        //     log(typeof item)
        // })

        // * remove the functions from object
        // result.map(id=>{
        //     let key = Object.keys(id)[0];
        //     let val = Object.values(id)[0];

        //     if (val.length !== 0 ){
        //         val.map(file=>{
        //             delete file.isDirectory
        //             delete file.isFile
        //         })
        //     }

        // })

        //* remove functions from object in two line; gives ssame result as above logic
        let string = JSON.stringify(result)
        let parsed = JSON.parse(string)
        
        return parsed;
    })
}

export const delPack =(folder)=> {
    let path = "/data/user/0/com.app1/files/stickers_asset/"+folder;
    try{
        RNFS.unlink(path)
        .then(res=>log(res))
        .catch(rej=>log(rej))
    }catch(err){
        log('err: ', err)
    }
}

export default GetStickersAsset;
