import React from 'react';
import { View, Text, Button } from 'react-native';

const Publish = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Publish Screen</Text>
      <Button
        title="Log out"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default Publish;
