import React, {Component} from 'react';
import { View, Text, Button, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      LocationData:[],
      favouriteLocation:[]
    }
  }

  componentDidMount(){
    this.unsubscribe = this.props.navigation.addListener('focus',() => {
      this.isLoggedIn();
    });
    this.getLocationData();
  }

    componentWillUnmount(){
      this.unsubscribe();
    }

    /*try and send facourites to another page and view as a flatlist?*/
    /*addFavouriteLocation(id){
      return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + loc_id + "/favourite", {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        }
      })
    }*/

    getLocationData = async () => {
      const value = await AsyncStorage.getItem('@session_token');
      return fetch("http://10.0.2.2:3333/api/1.0.0/find",{
          method: 'GET',
          headers: {
            //Accept: 'application/json',
            'Content-Type' : 'application/json',
            'X-Authorization' : value
          }
        })
        .then((response) => {
          if(response.status === 200){
            return response.json()
          }
          else if(response.status === 401){
            throw 'Bad Request';
          }
          else{
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
  //}

  isLoggedIn = async() => {
    const value = await AsyncStorage.getItem('@session_token');
    if(value == null) {
      this.props.navigation.navigate('Login');
    }
  };

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
    }
    else{
      return(
        <View>
          <FlatList
             data={this.state.LocationData}
             renderItem={({item}) => (
               <View style={styles.item}>
                 <Text style={styles.textStyle}>
                    {item.location_name}
                 </Text>
                 <Text style={styles.textStyleLocation}>
                    {item.location_town}
                 </Text>
                 <Button
                   title="Favourite"
                   /*onPress={() => this.addFavouriteLocation(item.id)}*/
                 />
              </View>
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
    borderBottomWidth: 2,
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
  }
})

/*const HomeScreens = ({navigation}) => {
  render(){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Log out"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    )
  }*/


export default HomeScreen;
