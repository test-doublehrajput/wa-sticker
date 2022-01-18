import React from 'react'
import { 
  Pressable,
  StyleSheet, 
  Text, 
  View,  
  FlatList,
  StatusBar, 
  TouchableOpacity,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
import Button from 'apsl-react-native-button'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-element-dropdown';

import FilterButtons from '../components/FilterButtons';
import HomeStyle from '../Style/HomeStyle';
import DropdownComponent from '../components/SortButton';
import PackList from '../components/PackList';
import Footer from '../components/Footer';
import Float from '../components/Float';

import RNFS from 'react-native-fs';

// console.log('ok home')

// RNFS.readDir('/data/user/0/com.app1/files/stickers_asset').then(res=>{
//   res.map(i=>{
//     if (i.isDirectory()) console.log(i.name)
//   })
// })

// RNFS.readDir(RNFS.DocumentDirectoryPath ).then(res=>{
//   res.map(i=>{
//     if (i.isDirectory()) {
//       return RNFS.stat(i.path).then(r=>console.log(r))
//     }
//   })
// })


const sortIcon = <Icon name="sort-amount-desc" size={20} color="grey" style={HomeStyle.control.sort.icon} />

export default function HomeScreen({ navigation }){
    
    const [test, setTest] = React.useState(4);

    return (
      <>
      <StatusBar backgroundColor='white' barStyle="dark-content" />

      <View style={HomeStyle.control} > 
          <View style={HomeStyle.control.types}> 
            <FilterButtons />
          </View>
          <><Text>{test}</Text></>
          <View style={HomeStyle.control.sort}> 
            {sortIcon}
            <Text style={HomeStyle.control.sort.text}>A-Z {' '}  Newly {' '} Older</Text>
          </View>
      </View>

      <View style={HomeStyle.list}> 
        <PackList nav={navigation} data={{name:'name1',fun:setTest}}/>
      </View>


      <Float nav={navigation}/>
      <View style={HomeStyle.footer}> 
        <Footer/>
      </View>
      </>
    );
} 

