import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LogoutScreen extends Component{
  logout = () => {
    /*AsyncStorage.removeItem();
    this.props.navigation.navigate("Login");
      //AsyncStorage.getItem('@session_token', responseJson.token);
      /*return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout",{
         method: 'POST',
         headers: {
           Accept: 'application/json',
           'Content-Type' : 'application/json',
            //'X-Authorization': value
         },
         //body: JSON.stringify(responseJson)
       })
       .then((response) => {
         if(response.status === 200){
           return response.json()
         }
         else if(response.status === 401){
           throw 'Unauthorised';
         }
         else{
           throw 'Something went wrong';
         }
       })
       .then((response) => {
         AsyncStorage.clear();
         this.props.navigation.navigate("Login");

     })
     .catch((error) => {
       console.log(error);
     })*/
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
