import React, {Component} from 'react'
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN = 'access_token';

class LoginScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      email:"",
      password:""
    }
  }

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

/*  async storeToken(accessToken){
    try{
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      this.getToken();

    }catch(error){
      console.log("something went wrong!")

    }
  }

  async getToken(){
    try{
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log("token is: " + token)

    }catch(error){
      console.log("something went wrong")

    }
  }*/

  login = async () => {
    if(this.isValid()){
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/login",{
        method: 'POST',
        headers: {
          //Accept: 'application/json',
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(this.state)
      })
      .then((response) => {
        if(response.status === 200){
          return response.json()
        }
        else if(response.status === 400){
          throw 'Invalid login';
        }
        else{
          throw 'Something went wrong';
        }
      })
      .then(async (responseJson) => {
        console.log(responseJson);
        await AsyncStorage.setItem('@session_token', responseJson.token);
        await AsyncStorage.setItem('@user_id', JSON.stringify(responseJson.id));
        /*ID is int and need to store string in storage, convert back to int?*/
        this.props.navigation.navigate("Home");

    })
    .catch((error) => {
      console.log(error);
    })
  }
}

  render(){
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
               <Text> Login </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttons1}
                onPress={() => this.props.navigation.navigate('SignUp')}>
                <Text>
                  Create an account
                </Text>
             </TouchableOpacity>
      </ScrollView>
    )

  }

}

const styles = StyleSheet.create({
  input:{
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 30,
    margin: 10,
    borderColor: '#ff55ee'
  },
  buttons: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: "#ec003e",
    marginTop: 20,
  },
  buttons1: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#cb1f47",
    alignItems: 'center',
  },
});

/*const LoginScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Screen</Text>
      <Button
        title="Log in"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Sign up"
        onPress={() => navigation.navigate('SignUp')}
       />
     </View>
  );
};*/


export default LoginScreen
