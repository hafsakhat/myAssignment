import React, {Component} from 'react'
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ScrollView, ToastAndroid} from 'react-native'

/* users can create an account with their name, email and password */

class SignupScreen extends Component {
  constructor(props) {
    super(props);
     this.state = {
       first_name: "",
       last_name: "",
       email:"",
       password:""
     }
  }

  /* validation for signup form,
  ** checking email is following correct regular expression,
  ** password is not less than 5 charcters,
  ** and fields are not empty,
  ** alert user if input is incorrect */
  validate = () => {
    const {first_name, last_name, email, password} = this.state
    let reg = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    if(first_name == "") {
      alert("Please fill in your first name")
      return false
    }else if(last_name == "") {
      alert("please fill in your last name")
      return false
    }else  if(email == "") {
      alert("Please enter email")
      return false
    }else if(reg.test(email)==false) {
      alert("Please enter valid email")
      return false
    }else if(password == "") {
      alert("Please fill in password")
      return false
    }else if(password.length < 5) {
      alert("Password must be 5 or more characters")
      return false
    }
    return true
}

  // if form validation is ok, then allow user to create a new account, direct them to login page
  signup = () => {
    if(this.validate()) {
      return fetch("http://10.0.2.2:3333/api/1.0.0/user", {
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
        } else if(response.status === 400){
          throw 'Failed validation';
        } else{
          throw 'Something went wrong';
        }
      })
      .then((responseJson) => {
        console.log("user created with ID: ", responseJson);
        ToastAndroid.show("Account created", ToastAndroid.SHORT);
        this.props.navigation.navigate("Login");

    })
    .catch((error) => {
      console.log(error);
    })
  }
}


  // form input
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
             <TouchableOpacity
                style={styles.buttons}
                onPress={() => this.signup()}>
                <Text style={styles.buttonText}> Sign Up </Text>
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
      margin:10,
      borderWidth: 2,
      borderRadius: 30,
      borderColor: '#FF9B71'
    },
    buttons: {
      alignItems: 'center',
      padding: 16,
      backgroundColor: "#e84855",
      marginTop: 20,
      marginLeft: 150,
      marginRight: 150,
      borderRadius: 30
    },
    buttonText: {
      fontSize: 20,
      color: 'white',
      fontFamily: 'Roboto'
    },
  });



export default SignupScreen;
