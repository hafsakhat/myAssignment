import React, {Component} from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UserInfo extends Component{
  constructor(props){
    super(props);
    this.state = {
      userData:"",
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

  /*updateUser = async () => {
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

  }*/

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
          <Text style={styles.faveButtonText}>Favourite Locations</Text>
          <FlatList
           data={this.state.userData.favourite_locations}
           renderItem={({item}) => (
             <View>
               <Text style={styles.textStyles}> {item.location_name}</Text>
            </View>
           )}
           /*keyExtractor={(item,index) => item.user_id.toString()}*/
           keyExtractor={(item, index) => item.location_id.toString()}
         />

        <Text style={styles.likeButton}>Liked Reviews</Text>
        <FlatList
         data={this.state.userData.liked_reviews}
         renderItem={({item}) => (
           <View>
             <Text style={styles.textStyles}> {item.location.location_name}</Text>
             <Text style={styles.textStyles}> Overall: {item.review.overall_rating} </Text>
             <Text style={styles.textStyles}> Price: {item.review.price_rating} </Text>
             <Text style={styles.textStyles}> Qaulity{item.review.quality_rating} </Text>
             <Text style={styles.textStyles}> Cleanliness{item.review.clenliness_rating} </Text>
             <Text style={styles.textStyles}> {item.review.review_body} </Text>
          </View>
         )}
         /*keyExtractor={(item,index) => item.user_id.toString()}*/
         keyExtractor={(item, index) => item.review.review_id.toString()}
       />
      <TouchableOpacity
        style = {styles.buttons}
        onPress={() => this.props.navigation.navigate('Update')}>
        <Text style = {styles.buttonText}>update profile</Text>
      </TouchableOpacity>
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
      marginTop: 10,
      margin:10,
      borderWidth: 2,
      borderRadius: 30,
      borderColor: '#FF9B71'
    },
    buttons: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: "#e84855",
      marginTop: 25,
      marginLeft: 120,
      marginRight: 120,
      borderRadius: 20
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
    },
    faveButtonText:{
      fontSize: 20,
      color:'#63B9A1',
      fontFamily: 'Roboto',
      paddingLeft: 10,
      marginTop: 10,
      fontWeight: 'bold',
      marginBottom: 5
    },
    textStyles: {
      fontFamily: "Cochin",
      fontSize: 17,
      paddingLeft: 10
    },
    likeButton:{
      fontFamily: "Cochin",
      fontSize: 20,
      paddingLeft: 10,
      color: '#AE0707',
      fontWeight: 'bold',
      marginTop: 20
    }
});


export default UserInfo;
