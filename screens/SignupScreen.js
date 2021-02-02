import React from 'react'
import { StyleSheet, View, Text , Button} from 'react-native'

const SignupScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sign up Screen</Text>
      <Button
        title="Log in"
        onPress={() => navigation.navigate('Login')}
       />
     </View>
  );
};


export default SignupScreen;
