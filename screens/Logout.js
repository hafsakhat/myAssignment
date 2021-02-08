import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LogoutScreen extends Component{

   logout = () => {
    AsyncStorage.clear();
    this.props.navigation.navigate("Login");
  }
  render(){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Logout</Text>
        <Button
          title="logout"
          onPress={() => this.logout()}
         />
      </View>
    )
  }
}

  export default LogoutScreen;
