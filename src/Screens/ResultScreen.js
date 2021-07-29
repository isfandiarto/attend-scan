import React, {useState} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper'
import styles from '../Styles/Screens/ResultScreen';
import firestore from '@react-native-firebase/firestore';

export default function ResultScreen({route, navigation}) {
    const [hadir, setHadir] = useState()
    const [name, setName] = useState()
    const [keterangan, setKeterangan] = useState('')

    const {text} = route.params
    const {kelas} = route.params
    const {matkul} = route.params
    
    const {pertemuan} = route.params
    const NPM = text.slice(0, 8);
    //JANGAN LUPA DIGANTI

    //SEE IF THE INPUT WAS REGISTERED
    firestore()
    .collection('absen/' +matkul+ '/' +kelas+ '/' +NPM+ '/kehadiran')
    .doc('pertemuan ' + pertemuan)
    .get()
    .then(documentSnapshot => {
        console.log('User exists: ', documentSnapshot.exists);
        if (documentSnapshot.exists) {
            console.log('User data: ', documentSnapshot.data());
        }else{
            alert('Data tidak ditemukan! Pastikan Mata Kuliah, Kelas, dan Sesi Pertemuan Sesuai. Hasil scan = ' +NPM)
            console.log(NPM)
            navigation.navigate('Camera1');
        }
    })

    // firestore()
    //     .collection('mahasiswa')
    //     .doc(NPM)
    //     .get()
    //     .then(documentSnapshot => {
    //         console.log(documentSnapshot.data().nama);
    //         setName(documentSnapshot.data().nama)
    //     })
    firestore()
          .collection('mahasiswa').doc(NPM)
          .get()
          .then(documentSnapshot => {
                setName(documentSnapshot.data().nama);
          });
    

    const updateAbsen = () => {
            firestore()
                .collection('absen/' +matkul+ '/' +kelas+ '/' +NPM+ '/kehadiran')
                .doc('pertemuan ' + pertemuan)
                .update({
                    status : true,
                    keterangan : keterangan
                })
                .then(() => {
                    setHadir(!hadir)
                    console.log('User updated!');
                    alert('Data berhasil di update!')
                    navigation.navigate('Camera1');
                });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>NPM : {NPM}</Text>
            <Text style={styles.text}>Nama : {name}</Text>
            <Text style={styles.text}>Kelas : {kelas}</Text>
            <Text style={styles.text}>Mata Kuliah : {matkul}</Text>
            <Text style={styles.text}>Pertemuan ke : {pertemuan}</Text>
            <TextInput
                    mode = 'flat'
                    style = {styles.textInput}
                    label = 'Tambah Keterangan'
                    onChangeText = {(keterangan) => setKeterangan(keterangan)}
                    value = {keterangan}
                />
            <TouchableOpacity 
                style={styles.buttonWrap}
                onPress={() => {updateAbsen()}}>
                <Text style={styles.button}>Konfirmasi Absen!</Text>
            </TouchableOpacity>
        </View>
    )
}
