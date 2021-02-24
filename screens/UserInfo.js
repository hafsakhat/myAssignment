import React, {Component} from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet, TextInput, ScrollView, TouchableOpacity, SafeAreaView, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UserInfo extends Component{
  constructor(props){
    super(props);
    this.state = {
      userData:"",
      isLoading: true,
      userID: "",
      location_id:""
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

  removeFaveLoc = async (location_id) => {
    const value = await AsyncStorage.getItem('@session_token');
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/favourite', {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json',
        'X-Authorization' : value
      },
    })
    .then((response) => {
      this.getUserData();
    })
    .then((response) => {
        ToastAndroid.show('removed from favourites', ToastAndroid.SHORT);
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  unlikeReview = async (review_id) => {
    const value = await AsyncStorage.getItem('@session_token');
    const locID = item.location_id.toString();
    //const revID = item.review_id.toString();
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + locID + "/review/" + review_id + "/like",{
      method: 'DELETE',
      header:{
        'Content-Type': 'application/json',
        'X-Authorization': String(value)
      }
   })
   .then((response) => {
     this.getUserData();
   })
   .then((response) => {
       alert('removed from likes')
   })
  .catch((error) => {
    console.log(error);
  })
}

    delReview= async (review_id) => {
      const review = this.props.Reviews;
      const value = await AsyncStorage.getItem('@session_token');
      const locID = this.props.location_id.toString();
      const revID = review.review_id.toString();
      return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + locID + "/review/" + revID,{
        method: 'DELETE',
        header:{
          'Content-Type': 'application/json',
          'X-Authorization': String(value)
        }
     })
     .then((response) => {
       this.getUserData();
     })
     .then((response) => {
         alert('review removed')
     })
    .catch((error) => {
      console.log(error);
    })
  }



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
        <ScrollView>
        <View style = {{marginBottom: '10%', flexGrow: 1}}>
          <Text style={styles.titleText}>PROFILE</Text>
          <TouchableOpacity
            style = {styles.buttons}
            onPress={() => this.props.navigation.navigate('Update')}>
            <Text style = {styles.buttonText}>update profile</Text>
          </TouchableOpacity>
          <Text style={styles.faveButtonText}>Favourite Locations</Text>
          <FlatList
           data={this.state.userData.favourite_locations}
           extraData={this.state}
           renderItem={({item}) => (
             <View style={styles.item}>
               <Text style={styles.textStyles}> {item.location_name}, {item.location_town}</Text>
               <TouchableOpacity
                 onPress={() => this.removeFaveLoc(item.location_id)}>
                 <Text style = {styles.unfavButton}>remove</Text>
               </TouchableOpacity>
            </View>
           )}
           keyExtractor={(item, index) => item.location_id.toString()}
         />

        <Text style={styles.likeTitle}>Liked Reviews</Text>
        <FlatList
         data={this.state.userData.liked_reviews}
         extraData={this.state}
         renderItem={({item}) => (
           <View style={styles.item}>
             <Text style={styles.textStylesRating}> {item.location.location_name}</Text>
             <Text style={styles.textStyles}> Overall: {item.review.overall_rating} {"\n"} Price: {item.review.price_rating}{"\n"} Quality: {item.review.quality_rating}
              {"\n"} Cleanliness: {item.review.clenliness_rating} {"\n"} Comments: {item.review.review_body}</Text>
             <TouchableOpacity
               onPress={() => this.unlikeReview(item.review_id)}>
               <Text style = {styles.unlikeButton}>remove like</Text>
             </TouchableOpacity>
          </View>
         )}
         keyExtractor={(item, index) => item.review.review_id.toString()}
       />
       <Text style={styles.reviewTitle}>My Reviews</Text>
         <FlatList
          data={this.state.userData.reviews}
          extraData={this.state}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text style={styles.textStylesRating}> {item.location.location_name}</Text>
              <Text style={styles.textStyles}> Overall: {item.review.overall_rating} {"\n"} Price: {item.review.price_rating}{"\n"} Quality: {item.review.quality_rating}
               {"\n"} Cleanliness: {item.review.clenliness_rating} {"\n"} Comments: {item.review.review_body}</Text>
              <TouchableOpacity
                onPress={() => this.delReview(item.review_id)}>
                <Text style = {styles.removeRevButton}>remove review</Text>
              </TouchableOpacity>
           </View>
          )}
          /*keyExtractor={(item,index) => item.user_id.toString()}*/
          keyExtractor={(item, index) => item.review.review_id.toString()}
        />
      </View>
      </ScrollView>
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
    unfavButton:{
      fontFamily: "Cochin",
      fontSize: 17,
      paddingLeft: '80%',
      color: '#63B9A1',
    },
    textStyles: {
      fontFamily: "Cochin",
      fontSize: 17,
      paddingLeft: 10
    },
    textStylesRating: {
      fontFamily: "Cochin",
      fontSize: 17,
      paddingLeft: 10,
      color: '#e84855'
    },
    likeTitle:{
      fontFamily: "Cochin",
      fontSize: 20,
      paddingLeft: 10,
      color: '#AE0707',
      fontWeight: 'bold',
      marginTop: 20
    },
    reviewTitle:{
      fontFamily: "Cochin",
      fontSize: 20,
      paddingLeft: 10,
      color: "#fb5607",
      fontWeight: 'bold',
      marginTop: 20
    },
    unlikeButton:{
      fontFamily: "Cochin",
      fontSize: 17,
      paddingLeft: '75%',
      color: '#AE0707',
    },
    removeRevButton:{
      fontFamily: "Cochin",
      fontSize: 17,
      paddingLeft: '65%',
      color: "#fb5607",
    },
    item: {
      flex: 3,
      margin: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'pink',
    },
});


export default UserInfo;
