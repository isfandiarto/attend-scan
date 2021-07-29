import React, {useState} from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper'
import styles from '../Styles/Screens/ProfileScreen';
import { firebase } from '@react-native-firebase/auth';

const ProfileScreen = () => {

    const user = firebase.auth().currentUser;
    const update = {
        displayName: 'asdasd',
        photoURL: '',
      };


    const [isChange, setIsChange] = useState(false)
    const [username, setUsername] = useState(user.displayName)
    const [email, setEmail] = useState(user.email)

    const updateProfile = async() => {
        await firebase.auth().currentUser.updateProfile({
            displayName: username,
            photoURL: '',
          });
        await firebase.auth().currentUser.updateEmail(email);
        alert('Data berhasil disimpan')
        console.log(user.displayName)
        setIsChange(false)
    }

    if(isChange) {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Nama</Text>
                <TextInput
                    style={styles.textInput}
                    mode = 'outlined'
                    style = {styles.textInput}
                    onChangeText = {(username) => setUsername(username)}
                    value = {username}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.textInput}
                    mode = 'outlined'
                    style = {styles.textInput}
                    onChangeText = {(email) => setEmail(email)}
                    value = {email}
                />
                <TouchableOpacity 
                style={styles.buttonWrap}
                onPress={() =>  updateProfile()}>
                <Text style={styles.button}>SIMPAN PERUBAHAN</Text>
                </TouchableOpacity>
            </View>
        )
    }else{
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Nama User : {user.displayName}</Text>
                <Text style={styles.text}>Email : {user.email}</Text>
                <TouchableOpacity 
                style={styles.buttonWrap}
                onPress={() => setIsChange(true)}>
                <Text style={styles.button}>UBAH PROFIL</Text>
                </TouchableOpacity>
            </View>
        )
    }
    
}

export default ProfileScreen
