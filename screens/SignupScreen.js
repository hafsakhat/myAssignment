import React, {Component} from 'react'
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ScrollView} from 'react-native'

//do client side and api validation
//do form and stuff on this page

class SignupScreen extends Component{
  constructor() {
    super();
     this.state ={
       first_name: "",
       last_name: "",
       email:"",
       password:""
     }
  }

  signup = () => {
    return fetch("http://10.0.2.2:3333/api/1.0.0/user",{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(this.state)
      })
      .then((response) => {
        if(response.status === 201){
          return response.json()
        }
        else if(response.status === 400){
          throw 'Failed validation';
        }
        else{
          throw 'Something went wrong';
        }
      })
      .then((responseJson) => {
        console.log("user created with ID: ", responseJson);
        //ToastAndroid.show("Account created", ToastAndroid.SHORT);
        this.props.navigation.navigate("Login");

    })
    .catch((error) => {
      console.log(error);
    })

  }

  render(){
    return(
      <ScrollView>
         <TextInput
            placeholder="First Name"
            onChangeText={(first_name) => this.setState({first_name})}
            value={this.state.first_name}
            style={styles.input}
          />
          <TextInput
             placeholder="Last Name"
             onChangeText={(last_name) => this.setState({last_name})}
             value={this.state.last_name}
             style={styles.input}
           />
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
             <Button
                title= "Sign up"
                onPress={() => this.signup()}
             />
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
      margin:10,
      borderWidth: 2,
      borderRadius: 30,
      borderColor: '#024678'
    },
    buttons: {
      justifyContent: "center",
      textAlign: "center",
      padding: 16,
      backgroundColor: "#DDDDDD"
    },
  });



export default SignupScreen;
