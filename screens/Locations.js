import React, {Component} from 'react';
import { View, Text, Button, ScrollView, TextInput, StyleSheet, TouchableOpacity, FlatList, KeyboardAvoidingView, SafeAreaView, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Locations extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      LocationData: [],
      location_id: "",
      reviewData:[],
      overall_rating:"",
      price_rating:"",
      quality_rating:"",
      clenliness_rating:"",
      review_body:"",
      favouriteLocation:""
    }
  }

  async storeLocationData(location){
    try{
      await AsyncStorage.setItem('@location_id', JSON.stringify(location));
    }catch(error){
        console.log("something went wrong!")
      }
  }
  async storeReviewData(review){
    try{
      await AsyncStorage.setItem('@review_id', JSON.stringify(review));
    }catch(error){
        console.log("something went wrong!")
      }
  }



  componentDidMount(){
    const{item} = this.props.route.params;
    console.log("mounted")
    this.getLocationInfo(item.location_id);
  }

 /*GET request to get location info*/
  getLocationInfo = location_id => {
  /*  const location = AsyncStorage.getItem('@location_id');*/
    const value = AsyncStorage.getItem('@session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + location_id, {
      method: 'GET',
      headers: {
        //Accept: 'application/json',
        'Content-Type' : 'application/json',
        'X-Authorization' : String(value),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': 0
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          LocationData: responseJson
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

 /*add to favourite locations*/
  addFavouriteLocation = async (location_id) => {
    const value = await AsyncStorage.getItem('@session_token');
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/favourite', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'X-Authorization' : value
      },
     })
      .then((response) => {
        if(response.status === 200){
          ToastAndroid.show('added to favourites', ToastAndroid.SHORT);
        }
        else if(response.status === 400){
          throw 'Failed';
        }
        else{
          throw 'Something went wrong';
        }
      })
      .catch((error) =>{
        console.log(error);
      })
  }

  likeReview = async (review_id) => {
    const{item} = this.props.route.params;
    const value = await AsyncStorage.getItem('@session_token');
    const locID = item.location_id.toString();
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + locID + "/review/" + review_id + "/like",{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'X-Authorization' : String(value)
      },
    })
      .then((response) => {
        ToastAndroid.show('Added to liked reviews', ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  /*Get post review for that location*/
  /*addReview = location_id => {
    const{item} = this.props.route.params;
    /*convert to string and pass to body
    let sendReview = {
      overall_rating: parseInt(this.state.id),
      price_rating: parseInt(this.state.price_rating),
      clenliness_rating: parseInt(this.state.clenliness),
      review_body: this.state.review_body
    };

    /*const location = AsyncStorage.getItem('@location_id');*/
    /*const review = AsyncStorage.getItem('@review_id')*
    const value = AsyncStorage.getItem('@session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + location_id + "/review",{
      method: 'POST',
      headers:{
        'Content-Type' : 'application/json',
        'X-Authorization' : value
      },
      body: JSON.stringify(sendReview)
    })
    .then((response) => {
      this.getLocationInfo(item.location_id);
      alert("review added")
    })
    .catch((error)=>{
      console.log(error);
    })

  }*/
    render(){
      const{item} = this.props.route.params;
      return (
        <View style = {{marginBottom: '20%', flex: 1}}>
          <Text style={styles.titleText}>{item.location_name}</Text>
          <Text style={styles.textStyle}>{item.location_town}</Text>
          <Text style={styles.ratingStyle}>Overall: {item.avg_overall_rating}</Text>
          <Text style={styles.ratingStyle}>Price: {item.avg_price_rating}</Text>
          <Text style={styles.ratingStyle}>Quality: {item.avg_quality_rating}</Text>
          <Text style={styles.ratingStyle}>Cleanliness: {item.avg_clenliness_rating}</Text>
          <TouchableOpacity
          onPress={() => this.addFavouriteLocation(item.location_id)}>
          <Text style={styles.faveButtonText}> Add to favourites </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Reviews', {item})}>
            <Text style={styles.reviewButtonStyle}> Write a review for {item.location_name}</Text>
          </TouchableOpacity>
          <Text style={styles.textStyle}>Reviews for {item.location_name}</Text>
          <SafeAreaView>
            <FlatList
                data={this.state.LocationData.location_reviews}
                extraData={this.state}
                renderItem={({item}) => (
                  <View style={styles.item}>
                    <Text style={styles.textStyles}>Overall: {item.overall_rating}</Text>
                    <Text style={styles.textStyles}>Price: {item.price_rating}</Text>
                    <Text style={styles.textStyles}>Quality: {item.quality_rating}</Text>
                    <Text style={styles.textStyles}>Cleanliness: {item.clenliness_rating}</Text>
                    <Text style={styles.textStyles}>Comments: {item.review_body}</Text>
                    <Text style={styles.textStyles}>Likes: {item.likes}</Text>
                    <TouchableOpacity
                      onPress={() => this.likeReview(item.review_id)}>
                      <Text style = {styles.likeButton}>Like</Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item, index) => item.review_id.toString()}
            />
          </SafeAreaView>
         </View>
      )
    }
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#e84855',
  },
  textStyle: {
    fontFamily: "Cochin",
    fontSize: 20,
    textAlign: 'center',
    fontStyle: 'italic',
    color: "#474D51",
  },
  reviewButtonStyle: {
    fontFamily: "Cochin",
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: "#fb5607",
  },
  ratingStyle:{
    fontFamily: "Cochin",
    fontSize: 18,
    textAlign: 'center',
    color: '#e84855',
    marginTop: 2
  },
  buttons: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: "#e84855",
    marginTop: 20,
  },
  faveButtonText:{
    fontSize: 20,
    color:'#63B9A1',
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  item: {
    flex: 1,
    margin: 20,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'pink',
  },
  textStyles: {
    fontFamily: "Cochin",
    fontSize: 17,
    paddingLeft: 10,
  },
  likeButton:{
    flex: 1,
    fontFamily: "Cochin",
    fontSize: 17,
    paddingLeft: 300,
    color: '#AE0707',
    fontWeight: 'bold'
  }
})



export default Locations;
