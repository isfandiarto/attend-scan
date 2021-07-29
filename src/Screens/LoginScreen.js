import React, { useState, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, Image } from 'react-native'
import { TextInput } from 'react-native-paper'
import auth from '@react-native-firebase/auth'
import styles from '../Styles/Screens/LoginScreen';
import HomeScreen from '../Styles/Screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';


export default function LoginScreen({navigation}) {

    const [initializing, setInitializing] = useState(true)
    const [user, setUser] = useState()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isHidden, setIsHidden] = useState(true)

    
    useEffect(() => {
        // setUser()
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
      }

    // const logout = () => {
    //     auth()
    //         .signOut()
    //         .then(() => console.log('User signed out!'));
    // }

    const login = () => {
        if ( email === '' || password === '' ){
            alert('Email atau Password kosong!')
        }else{
            auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                navigation.navigate('Home')
                console.log('User account signed in!');
                console.log(user)
                
            })
            .catch(error => {
                if (error.code === 'auth/invalid-email') {
                    alert('Email yang dimasukkan tidak valid!')
                }else if (error.code === 'auth/user-not-found') {
                    alert('Email atau Password salah!')
                }else{
                    alert('Data yang dimasukkan belum tepat')
                }
            });
        }
    }
    
    if (initializing) return null;

        return (
            <View style={styles.container}>
                <Image 
                    source={require('../assets/logo/logo.png')}
                    style={styles.logo}
                />
                <TextInput
                    mode = 'flat'
                    style = {styles.textInput}
                    label = 'Email'
                    onChangeText = {(email) => setEmail(email)}
                    value = {email}
                />
                <TextInput
                    style = {styles.textInput}
                    mode = 'flat'
                    label = 'Password'
                    secureTextEntry={isHidden}
                    right={<TextInput.Icon onPress={() => setIsHidden(!isHidden)} name="eye" />}
                    onChangeText = {(password) => setPassword(password)}
                    value = {password}
                />
                <TouchableOpacity onPress={login} style={styles.buttonLoginWrap}>
                    <Text style={styles.buttonInput}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.buttonSignUpWrap}>
                    <Text style={styles.buttonInput}>SIGN UP</Text>
                </TouchableOpacity>
            </View>
        )
} 
