import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'

const LoginScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Screen</Text>
      <Button
        title="Log in"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Sign up"
        onPress={() => navigation.navigate('SignUp')}
       />
     </View>
  );
};


export default LoginScreen
