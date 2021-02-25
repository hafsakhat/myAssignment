import React, {Component} from 'react';
import { View, Text, Button, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Home screen lists all of the locations of the API, users have to be logged in to access Home screen */

class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      LocationData:[]
    }
  }


/* Location Data displayed when screen is mounted,
  ** checks to see if user is logged in, if not navigate to the login screen */
  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus',() => {
      this.isLoggedIn();
    });
    this.getLocationData();
  }

    // prevent memory leaks
  componentWillUnmount() {
      this.unsubscribe();
  }


    // get the list of locations from API
    getLocationData = async () => {
      const value = await AsyncStorage.getItem('@session_token');
      return fetch("http://10.0.2.2:3333/api/1.0.0/find",{
          method: 'GET',
          headers: {
            'Content-Type' : 'application/json',
            'X-Authorization' : value
          }
        })
        .then((response) => {
          if(response.status === 200) {
            return response.json()
          }
          else if(response.status === 401) {
            throw 'Bad Request';
          }
          else {
            throw 'Something went wrong';
          }
        })
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

  // if user is not logged in navigate to the login screen
  isLoggedIn = async() => {
    const value = await AsyncStorage.getItem('@session_token');
    if(value == null) {
      this.props.navigation.navigate('Login');
    }
  };

  /* load activity indicator if data has not mounted yet,
  ** Display list of location in a flatlist, each location is clickable
     and will direct you to the specific location page */
  render(){
    if(this.state.isLoading) {
      return(
        <View>
          <ActivityIndicator
          size="large"
          color="black"
          />
        </View>
      );
    }else {
      return(
        <View>
        <Text style={styles.titleText}>LOCATIONS</Text>
          <FlatList
             data={this.state.LocationData}
             renderItem={({item}) => (
               <TouchableOpacity onPress={() => this.props.navigation.navigate('Locations', {item})}>
               <View style={styles.item}>
                 <Text style={styles.textStyle}>
                    {item.location_name}
                 </Text>
                 <Text style={styles.textStyleLocation}>
                    {item.location_town}
                 </Text>
              </View>
              </TouchableOpacity>
             )}
             keyExtractor={(item,index) => item.location_id.toString()}
          />
        </View>
      );
    }
  }

}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignSelf: 'stretch',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'pink',
  },
  textStyle: {
    fontFamily: "Cochin",
    fontSize: 20,
  },
  textStyleLocation: {
    fontFamily: "Cochin",
    fontSize: 20,
    color: "#474D51",
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
})



export default HomeScreen;
