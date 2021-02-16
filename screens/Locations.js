import React, {Component} from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Locations = ({route, navigation})=>{
  //const [overall_rating, setOverall_rating] = react.useState(null);
  const{item} = route.params;
  return(
    <View>
     <Text>{item.location_name}</Text>
     <Text>{item.location_town}</Text>
    </View>
  )


}

export default Locations;
