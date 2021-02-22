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
          <Text style={styles.titleText}>PROFILE</Text>
          <Text style={styles.infoText}> First Name:  {this.state.userData.first_name}</Text>
          <Text style={styles.infoText}> Last Name:  {this.state.userData.last_name}</Text>
          <Text style={styles.infoText}> Email:  {this.state.userData.email}</Text>
        <Text style={styles.headerText}>Update Profile</Text>
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
                 <Text style={styles.buttonText}> update</Text>
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
    titleText: {
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 30,
      textAlign: 'center',
      fontStyle: 'italic',
      color: '#e84855',
      backgroundColor: '#FF9B71'
    },
    buttonText:{
      fontSize: 20,
      color: 'white',
      fontFamily: 'Roboto'
    },
    headerText:{
      fontFamily: 'Roboto',
      fontSize: 20,
      color: '#e84855',
      textAlign: 'center',
      marginTop: 20
    },
    infoText:{
      textAlign: 'center',
      fontSize: 16,
      color: '#4C5962',
      fontStyle: 'italic',
    }
});


export default UserInfo;
