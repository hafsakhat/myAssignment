import React, {Component} from 'react';
import { View, Text, Button, ScrollView, TextInput, StyleSheet, TouchableOpacity,ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

/* Users can added a review for the specified location, giving an overall, price, quality and cleanliness rating, with comments */

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      LocationData:[],
      overall_rating:"",
      price_rating:"",
      quality_rating:"",
      clenliness_rating:"",
      review_body:"",
    }
  }


  // post review for specific location
  addReview = async (location_id) => {
    const{item} = this.props.route.params;
    // convert to string and pass to body
    let sendReview = {
      overall_rating: parseInt(this.state.overall_rating),
      price_rating: parseInt(this.state.price_rating),
      quality_rating: parseInt(this.state.quality_rating),
      clenliness_rating: parseInt(this.state.clenliness_rating),
      review_body: this.state.review_body
    };
    const value = await AsyncStorage.getItem('@session_token');
    const userid = await AsyncStorage.getItem('@user_id')
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + location_id + "/review",{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json',
        'X-Authorization' : String(value)
      },
      body: JSON.stringify(sendReview)
    })
    .then((response) => {
      if(response.status === 201) {
        ToastAndroid.show('review added', ToastAndroid.SHORT);
        return response.json()
      } else if(response.status === 400) {
        throw 'unable to upload review';
      } else if(response.status === 401) {
        throw 'unable to upload review';
      } else{
        throw 'Something went wrong';
      }
    })
    .then((responseJson) => {
        console.log("review uploaded: ", responseJson);
  })
    .catch((error)=>{
      console.log(error);
    })
}

  /* form to added a new review for location */
  render(){
    const{item} = this.props.route.params;
    return(
      <ScrollView>
      <Text style={styles.titleTextReview}>Write a review for {item.location_name}</Text>
        <TextInput
            placeholder="Enter overall rating"
            onChangeText={(overall_rating) => this.setState({overall_rating})}
            value={this.state.overall_rating}
            style={styles.input}
         />
         <TextInput
             placeholder="Enter price rating"
             onChangeText={(price_rating) => this.setState({price_rating})}
             value={this.state.price_rating}
             style={styles.input}
          />
          <TextInput
              placeholder="Enter quality rating"
              onChangeText={(quality_rating) => this.setState({quality_rating})}
              value={this.state.quality_rating}
              style={styles.input}
           />
          <TextInput
              placeholder="Enter cleanliness rating"
              onChangeText={(clenliness_rating) => this.setState({clenliness_rating})}
              value={this.state.clenliness_rating}
              style={styles.input}
          />
          <TextInput
              placeholder="Enter review"
              onChangeText={(review_body) => this.setState({review_body})}
              value={this.state.review_body}
              style={styles.reviewInput}
          />
          <TouchableOpacity
            onPress={() => this.addReview(item.location_id)}>
            <Text style={styles.buttonText}> submit review </Text>
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
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 20,
    marginLeft: 35,
    marginRight: 35,
    borderColor: '#FF9B71'
  },
  reviewInput: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#FF9B71',
    marginLeft: 35,
    marginRight: 35,
    height: 100,
    marginTop: 10
  },
  buttonText: {
    fontSize: 20,
    color: "#e84855",
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold'
  },
  titleTextReview: {
    fontFamily: 'Roboto',
    fontSize: 20,
    textAlign: 'center',
    color: '#e84855',
    marginTop: 15
  },
})


export default Reviews;
