import React from 'react';
import Home from './screens/Home';
import CameraScreen from './screens/Camera';
import Friends from './screens/Friends';
import Login from './screens/Login'
import Register from './screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();
const options = {
  headerShown : false
}
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Message" screenOptions={options} >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="login" exact component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="camera" component={CameraScreen} />
        <Stack.Screen name="friends" component={Friends} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

