import React, {Component} from 'react';
import { View, Text, Button, ScrollView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

class Reviews extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      reviewData:[],
      overall_rating:"",
      price_rating:"",
      clenliness_rating:"",
      review_body:""
    }
  }

  async storeLocationData(location_id){
    try{
      await AsyncStorage.setItem('@location_id', JSON.stringify(locID));
    }catch(error){
        console.log("something went wrong!")
      }
  }


  addReview = async () =>{
    /*convert to string and pass to body*/
    let sendReview = {
      overall_rating: parseInt(this.state.id),
      price_rating: parseInt(this.state.price_rating),
      clenliness_rating: parseInt(this.state.clenliness),
      review_body: this.state.review_body
    };

    const location_id = await AsyncStorage.getItem('@loation_id');
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + locID + "/review",{
      method: 'POST',
      headers:{
        'Content-Type' : 'application/json',
        'X-Authorization' : locID
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

  render(){
    return(
      <ScrollView>
          <TextInput
              placeholder="Enter overall rating"
              onChangeText={(overall_rating) => this.setState({overall_rating})}
              value={this.state.overall_rating}
              //style={styles.input}
           />
           <TextInput
               placeholder="Enter price rating"
               onChangeText={(price_rating) => this.setState({price_rating})}
               value={this.state.price_rating}
               //style={styles.input}
            />
            <TextInput
                placeholder="Enter clenliness rating"
                onChangeText={(clenliness_rating) => this.setState({clenliness_rating})}
                value={this.state.clenliness_rating}
                //style={styles.input}
             />
             <TextInput
                 placeholder="Enter review"
                 onChangeText={(review_body) => this.setState({review_body})}
                 value={this.state.review_body}
                 //style={styles.input}
             />
             <Button
               title="Submit"
               onPress={() => this.addReview()}
             />
      </ScrollView>
    )
  }

}



export default Reviews;
