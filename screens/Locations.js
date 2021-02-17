import React, {Component} from 'react';
import { View, Text, Button, ScrollView, TextInput, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Locations extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      locationDetails: [],
      location_id: "",
      reviewData:[],
      overall_rating:"",
      price_rating:"",
      clenliness_rating:"",
      review_body:""
      //favouriteLocation:[]
    }
  }

  /*Get post review for that location*/
  addReview = location_id => {
    /*convert to string and pass to body*/
    let sendReview = {
      overall_rating: parseInt(this.state.id),
      price_rating: parseInt(this.state.price_rating),
      clenliness_rating: parseInt(this.state.clenliness),
      review_body: this.state.review_body
    };

    //const location = AsyncStorage.getItem('@location_id');
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + location_id + "/review",{
      method: 'POST',
      headers:{
        'Content-Type' : 'application/json',
        'X-Authorization' : location_id
      },
      body: JSON.stringify(sendReview)
    })
    .then((response) => {
      alert("review added")
    })
    .catch((error)=>{
      console.log(error);
    })

  }

  /*componentDidMount(){
    this.getLocationInfo();
  }*/

 /*GET request to get location info but doesnt work*/
  /*getLocationInfo = location_id => {
    //const location = this.props.route.params.loc_id;
    //const{item} = this.props.route.params;
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + location_id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          location_id: responseJson.location_id
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }*/
    render(){
      const{item} = this.props.route.params;
      return (
        <View>
          <Text>{item.location_name}</Text>
          <Text>{item.location_town}</Text>
          <Text>{item.avg_overall_rating}</Text>
        <ScrollView>
            <Text> Write a review for {item.location_name}</Text>
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
                  placeholder="Enter clenliness rating"
                  onChangeText={(clenliness_rating) => this.setState({clenliness_rating})}
                  value={this.state.clenliness_rating}
                  style={styles.input}
              />
              <TextInput
                  placeholder="Enter review"
                  onChangeText={(review_body) => this.setState({review_body})}
                  value={this.state.review_body}
                  style={styles.input}
              />
              <Button
                title="Submit"
                onPress={() => this.addReview(item.location_id)}
              />
         </ScrollView>
         </View>
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
    borderColor: '#FF9B71'
  }
})



export default Locations;
