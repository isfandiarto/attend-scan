import React, { useState, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper'
import auth from '@react-native-firebase/auth'
import styles from '../Styles/Screens/SignUpScreen';
import HomeScreen from '../Styles/Screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';


export default function LoginScreen({navigation}) {

    const [initializing, setInitializing] = useState(true)
    const [user, setUser] = useState()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
      }
    
    useEffect(() => {
        setUser()
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const createUser = () => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                alert('Account successfully registered');
                console.log('User account created & signed in!');
                auth()
                    .signOut()
                    .then(() => console.log('User signed out!'));
                setEmail('')
                setPassword('')
                navigation.navigate('Login')
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }
 
    if (initializing) return null;

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Sign Up</Text>
                <TextInput
                style = {styles.textInput}
                mode = 'flat'
                placeholder = "Email"
                onChangeText = {(email) => setEmail(email)}
                value = {email}
            />
            <TextInput
                style = {styles.textInput}
                mode = 'flat'
                placeholder = "Password"
                onChangeText = {(password) => setPassword(password)}
                value = {password}
            />
                <TouchableOpacity onPress={createUser} style={styles.buttonSignUpWrap}>
                    <Text style={styles.buttonInput}>SIGN UP</Text>
                </TouchableOpacity>
            </View>
        )
} 