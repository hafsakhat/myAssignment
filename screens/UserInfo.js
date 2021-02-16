import React, {Component} from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UserInfo extends Component{
  constructor(props){
    super(props);
    this.state = {
      userData:"",
      first_name: "",
      last_name: "",
      email:"",
      password:"",
      isLoading: true,
      userID: "",
    }
  }

  componentDidMount(){
    this.getUserData();
  }

  /*DISPLAY USER DATA IN FlatList? AND THEN DO FORM? AND CHANGE IT IDK*/
 /*HOW DO YOU VIEW A YSER?*/
 /*FIRST NAME LAST NAME AND EMAIL*/
  getUserData = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    const userID = await AsyncStorage.getItem('@user_id');
    /*add validation later*/
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + userID,{
      headers:{
        'Content-Type' : 'application/json',
        'X-Authorization' : value
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        /*first_name: responseJson.first_name,
        last_name: responseJson.last_name,
        email: responseJson.email,*/
        isLoading: false,
        userData: responseJson
      })
    })
    .catch((error) => {
      console.log(error);
      throw error
    });
  }

  updateUser = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    const userID = await AsyncStorage.getItem('@user_id');
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + userID,{
      method: 'PATCH',
      headers:{
        'Content-Type' : 'application/json',
        'X-Authorization' : value
      },
      body: JSON.stringify({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password,
      })
   })
      .then((response) => {
        //this.getUserData();
        alert("Profile updated")
        this.getUserData();
      })
      .catch((error) => {
        console.log(error);
        throw error
      })
    //})

  }

 /*200 RESPONSE BUT DOESNT DISPLAY INFO?*/
  render(){
    if(this.state.isLoading){
      return(
        <View>
          <ActivityIndicator
          size="large"
          color="black"
          />
        </View>
      );
    }else{
      return (
        <View>
          <Text>User Information</Text>
          <Text>{this.state.userData.first_name}</Text>
          <Text>{this.state.userData.last_name}</Text>
          <Text>{this.state.userData.email}</Text>
        <Text>Update Profile</Text>
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
                 onPress={() => this.updateUser()}>
                 <Text> Update Profile </Text>
              </TouchableOpacity>
         </ScrollView>
        </View>
      )
    }
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
      borderColor: '#ff55ee'
    },
    buttons: {
      alignItems: 'center',
      padding: 16,
      backgroundColor: "#eb3b8b",
      marginTop: 20,
    },
});


export default UserInfo;
