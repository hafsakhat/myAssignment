import 'react-native-gesture-handler';

//import react and component
import React from 'react';
//import { View, Text, SafeAreaView, StyleSheet, ScrollView, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { createAppContainer} from '@react-navigation/native';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import Reviews from './screens/ViewReviews';
import Locations from './screens/Locations';
import LogoutScreen from './screens/Logout';
import UserInfo from './screens/UserInfo';
import ProfileUpdate from './screens/updateProfile';

//MOVE HOMESCREEN TO DRAWER

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
      <Drawer.Navigator initialRouteName="Home">
         <Drawer.Screen name="Home" component={HomeScreen}/>
         <Drawer.Screen name="Profile" component={UserInfo} options={{headerShown: false}} />
         <Drawer.Screen name="Logout" component={LogoutScreen}/>
      </Drawer.Navigator>
  );
}

function App() {
  return (
      <NavigationContainer>
         <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Home" component={DrawerRoutes} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="SignUp" component={SignupScreen}/>
            <Stack.Screen name="Locations" component={Locations}/>
            <Stack.Screen name="Reviews" component={Reviews}/>
            <Stack.Screen name="Update" component={ProfileUpdate}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
}


export default App;
