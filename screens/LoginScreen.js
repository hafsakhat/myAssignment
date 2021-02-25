import React, {Component} from 'react'
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

/* This is the page users are first met with, users can access the app by creating an account and logging in */

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:"",
      password:""
    }
  }

  // form validation, to check form fields are not empty
  isValid = () => {
    const {email, password} = this.state
    if(email == ""){
      alert("Please enter valid email")
      return false
    }else if(password == ""){
      alert("please enter password")
      return false
    }
    return true
  }

  // if form is valid then, allow user to log in, creating a session token and user ID
  login = async () => {
    if(this.isValid()) {
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/login",{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(this.state)
      })
      .then((response) => {
        if(response.status === 200){
          return response.json()
        } else if(response.status === 400){
            throw 'Invalid login';
            alert("Username or password is incorrect");
        } else {
            throw 'Something went wrong';
        }
      })
      .then(async (responseJson) => {
        console.log(responseJson);
        await AsyncStorage.setItem('@session_token', responseJson.token);
        await AsyncStorage.setItem('@user_id', JSON.stringify(responseJson.id));
        this.props.navigation.navigate("Home");
    })
    .catch((error) => {
      console.log(error);
    })
  }
}

  // form for user input
  render() {
    return(
      <ScrollView>
          <TextInput
              placeholder="Email"
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              style={styles.input}
           />
           <TextInput
              placeholder="Password"
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              secureTextEntry
              style={styles.input}
            />
            <TouchableOpacity
               style={styles.buttons}
               onPress={() => this.login()}>
               <Text style={styles.buttonText}> Login </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignUp')}>
                <Text style={styles.infoText}>
                  Create an Account
                </Text>
             </TouchableOpacity>
      </ScrollView>
    )

  }

}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 30,
    margin: 10,
    borderColor: '#FF9B71'
  },
  buttons: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: "#e84855",
    marginTop: 20,
    marginLeft: 150,
    marginRight: 150,
    borderRadius: 30
  },
  buttons1: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#e84855",
    alignItems: 'center',
  },
  infoText: {
    textAlign: 'center',
    fontSize: 18,
    color: "#e84855",
    fontStyle: 'italic',
    marginTop: 20
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Roboto',
    marginTop: 1
  },
});


export default LoginScreen
