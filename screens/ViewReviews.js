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

  addReview = () =>{
    
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
