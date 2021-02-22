import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
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
      <View>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => this.logout()}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: "#e84855",
    marginTop: 20,
    marginLeft: 150,
    marginRight: 150,
    borderRadius: 30
  },
  buttonText:{
    fontSize: 20,
    color: 'white',
    fontFamily: 'Roboto',
    marginTop: 1
  },

})

export default LogoutScreen;
