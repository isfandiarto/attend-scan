import React, {Component} from 'react';
import { Button } from 'react-native';
import CameraScreen from './src/Screens/CameraScreen';
import HomeScreen from './src/Screens/HomeScreen';
import ResultScreen from './src/Screens/ResultScreen';
import CameraScreen1 from './src/Screens/CameraScreen1';
import LoginScreen from './src/Screens/LoginScreen';
import SignUpScreen from './src/Screens/SignUpScreen';
import DataScreen from './src/Screens/DataScreen';
import ScheduleScreen from './src/Screens/ScheduleScreen';
import ProfileScreen from './src/Screens/ProfileScreen';
import DetailScreen from './src/Screens/DetailScreen';

import auth from '@react-native-firebase/auth'

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App({navigation}) {

  const logout = () => {
            auth()
                .signOut()
                .then(() => console.log('User signed out!'));
              
        }

    const homeStyle = {title: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerShown : false,
    headerLeft : null,
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
const loginStyle = {title: 'Login',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerShown : false,
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  return (
    <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name='Login'
                          component={LoginScreen}
                          options={loginStyle}
            />
            <Stack.Screen name='SignUp'
                          component={SignUpScreen}
                          options={loginStyle}
            />
            <Stack.Screen name='Home'
                          component={HomeScreen}
                          options={homeStyle}
            />
            <Stack.Screen name='Camera' component={CameraScreen} />
            <Stack.Screen name='Camera1' component={CameraScreen1} />
            <Stack.Screen name='Result' component={ResultScreen}/>
            <Stack.Screen name='Profile' component={ProfileScreen}/>
            <Stack.Screen name='Data' component={DataScreen}/>
            <Stack.Screen name='Schedule' component={ScheduleScreen}/>
            <Stack.Screen name='Detail' component={DetailScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
  )


}



// export default class App extends Component {

//   logout = () => {
//         auth()
//             .signOut()
//             .then(() => console.log('User signed out!'));
          
//     }

//   render() {
//     return (
//         <NavigationContainer>
//           <Stack.Navigator initialRouteName="Login">
//             <Stack.Screen name='Login'
//                           component={LoginScreen}
//                           options={loginStyle}
//             />
//             <Stack.Screen name='SignUp'
//                           component={SignUpScreen}
//                           options={loginStyle}
//             />
//             <Stack.Screen name='Home'
//                           component={HomeScreen}
//                           options={homeStyle}
//             />
//             <Stack.Screen name='Camera' component={CameraScreen} />
//             <Stack.Screen name='Camera1' component={CameraScreen1} />
//             <Stack.Screen name='Result' component={ResultScreen}/>
//             <Stack.Screen name='Profile' component={ProfileScreen}/>
//             <Stack.Screen name='Data' component={DataScreen}/>
//             <Stack.Screen name='Schedule' component={ScheduleScreen}/>
//           </Stack.Navigator>
//         </NavigationContainer>
      
//     );
//   }
// }

const homeStyle = {title: 'Home',
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerLeft : null,
                headerRight : () => (
                  <Button title='Logout' onPress={() => {
                    navigation.navigate('Login');
                    // auth()
                    //     .signOut()
                    //     .then(() => {
                    //       console.log('User signed out!');
                    //     });
                    }} />
                ),
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }
const loginStyle = {title: 'Login',
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerShown : false,
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }