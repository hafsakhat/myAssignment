import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LogoutScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      token:""
    }
  }

  logout = async () => {
      let token = await AsyncStorage.getItem('@session_token');
      await AsyncStorage.removeItem('@session_token');
      return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout",{
         method: 'POST',
         headers: {
            'X-Authorization': token
         }
       })
       .then((response) => {
         this.props.navigation.navigate("Login");
         alert("Successfully logged out");
         console.log('logged out');
       })

        /* if(response.status === 200){
            //this.props.navigation.navigate("Login");
            return response.json;
         }
          else if(response.status === 401){
           throw 'Unauthorised';
         }
         else{
           throw 'Something went wrong';
         }
       })
       .then(async(responseJson)=>{
         //await AsyncStorage.removeItem('@session_token');
         this.props.navigation.navigate("Login");

       })*/
       .catch((error) => {
       console.log(error);
    })
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
