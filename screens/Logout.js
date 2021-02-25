import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* users can logout of the application and are then redirected to back to the login screen */

class LogoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token:""
    }
  }

  //remove session token and allow user to log out, direct user to login screen
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
         ToastAndroid.show('Logged Out', ToastAndroid.SHORT);
         console.log('logged out');
       })
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
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Roboto',
    marginTop: 1
  },

})

export default LogoutScreen;
