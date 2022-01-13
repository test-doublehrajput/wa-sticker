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


const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  // { label: 'Item 3', value: '3' },
  // { label: 'Item 4', value: '4' },
  // { label: 'Item 5', value: '5' },
  // { label: 'Item 6', value: '6' },
  // { label: 'Item 7', value: '7' },
  // { label: 'Item 8', value: '8' },
];

const sortIcon = <Icon name="sort-amount-desc" size={20} color="grey" style={HomeStyle.control.sort.icon} />

const myButton = (
  <Icon.Button
    name="sort-amount-desc"
    color="grey"
    backgroundColor="white"
    // onPress={this.loginWithFacebook}
  >
    Alphabetical
  </Icon.Button>
);

export default function HomeScreen({ navigation }){

    const renderIt = ({item})=>{
      return(
        <Text>{item.name}</Text>
      );
    }

    return (
      <>
      <StatusBar backgroundColor='white' barStyle="dark-content" />

      <View style={HomeStyle.control} > 
          <View style={HomeStyle.control.types}> 
            <FilterButtons />
          </View>
      
          <View style={HomeStyle.control.sort}> 
            {sortIcon}
            <Text style={HomeStyle.control.sort.text}>A-Z {' '}  Newly {' '} Older</Text>
          </View>
      </View>

      <View style={HomeStyle.list}> 
        <PackList nav={navigation} data={{name:'name1',no:123}}/>
      </View>


      <Float nav={navigation}/>
      <View style={HomeStyle.footer}> 
        <Footer/>
      </View>
      </>
    );
} 

