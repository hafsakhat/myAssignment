import React, {Component} from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class HomeScreen extends Component {

  componentDidMount(){
    this.unsubscribe = this.props.navigation.addListener('focus',() => {
      this.isLoggedIn();
    });
  }

    componentWillUnmount(){
      this.unsubscribe();
    }

  isLoggedIn = async() => {
    const value = await AsyncStorage.getItem('@session_token');
    if(value == null) {
      this.props.navigation.navigate('Login');
    }
  };

  render(){
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }

}

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
