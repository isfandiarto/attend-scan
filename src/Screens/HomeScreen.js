import React, { useState, useEffect } from 'react';
import {SafeAreaView, Text, Button, Image, TouchableOpacity} from 'react-native';
import styles from '../Styles/Screens/HomeScreen';
import auth from '@react-native-firebase/auth'
import { firebase } from '@react-native-firebase/auth';
import { ImageBackground } from 'react-native';

function HomeScreen({route, navigation}) {
  const user = firebase.auth().currentUser;

  console.log(user);
  

  const userLogout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
      navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.userBanner}>
        <Text style = {styles.title}>Welcome, {user.displayName}</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.tile}>
        <TouchableOpacity
        onPress={() => navigation.navigate('Camera1')}
        style={styles.tileScan}
        >
        <ImageBackground
          source ={require('../assets/image/scanner.jpg')}
          style={{
            height: '100%',
            width: '100%',
            opacity: 0.5,
            alignSelf: 'center',
            position: 'absolute',
          }}
        />
          <Text style={styles.text}>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => navigation.navigate('Data')}
        style={styles.tileData}
        >
          <ImageBackground
          source ={require('../assets/image/list.jpg')}
          style={{
            height: '100%',
            width: '100%',
            opacity: 0.5,
            alignSelf: 'center',
            position: 'absolute',
          }}
        />
          <Text style={styles.text}>Data</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={styles.tile}>
        <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={styles.tileProfile}
        >
          <ImageBackground
          source ={require('../assets/image/user.jpg')}
          style={{
            height: '100%',
            width: '100%',
            opacity: 0.5,
            alignSelf: 'center',
            position: 'absolute',
          }}
        />
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => userLogout()}
        style={styles.tileLogout}
        >
          <ImageBackground
          source ={require('../assets/image/logout.png')}
          style={{
            height: '100%',
            width: '100%',
            opacity: 0.5,
            alignSelf: 'center',
            position: 'absolute',
          }}
        />
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}

export default HomeScreen;
