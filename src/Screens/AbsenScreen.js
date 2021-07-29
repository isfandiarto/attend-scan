import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../Styles/Screens/AbsenScreen';

import firebase from './../../Firebase';
import firestore from '@react-native-firebase/firestore'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

export default function Absen() {
    const [nama, setNama] = useState('')
    const [npm, setNpm] = useState('')
    const [kelas, setKelas] = useState('')
    const [matkul, setMatkul] = useState('')
    const [listDataMhs, setListDataMhs] = useState([])
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
    ]);

    let dataMatkul = [{
        value : 'Matkul A',
    },{
        value : 'Matkul B',
    }];
    let dataKelas = [{
        value : '4IA11',
    },{
        value : '4IA12',
    }]

    useEffect(() => {
        getUser();
    }, []);

    getUser = async() => {
        const userDocument = await firestore().collection('mahasiswa').doc('8TbZa5Vgm1xMc733UTwo').onSnapshot(doc => {
           setNama(doc.data().nama);
           setNpm(doc.data().npm);
        })
        console.log(userDocument)
    }

    // const onPressHandle = () => {
    //     if(nama == ''){
    //         alert('Data yang dimasukkan belum sesuai');
    //         return false;
    //     }

    //     firebase.database().ref('/listDataMahasiswa/'+ matkul + '/' + kelas).push({
    //         npm : npm, 
    //         nama : nama,
    //         kelas : kelas,
    //         aktif : true
    //     }).then (()=>{
    //         alert('berhasil memasukkan data baru');
    //         let data = firebase.database().ref('/listDataMahasiswa');
    //         data.once('value').then(snapshot => {
    //             setListDataMhs(snapshot.val())
    //         })
    //         setNama('')
    //         setNpm('')
    //         setKelas('')
    //     }).catch((error)=>{
    //         alert(error)
    //     })  
    // }

    return (
        <View style={styles.container}>
            <Text>Data Mahasiswa</Text>
            <TextInput
                style = {styles.textInput}
                placeholder = "Masukkan Nama"
                onChangeText = {(nama) => setNama(nama)}
                value = {nama}
            />
            <TextInput
                style = {styles.textInput}
                placeholder = "Masukkan NPM"
                onChangeText = {(npm) => setNpm(npm)}
                value = {npm}
            />
            <TextInput
                style = {styles.textInput}
                placeholder = "Masukkan Mata Kuliah"
                onChangeText = {(matkul) => setMatkul(matkul)}
                value = {matkul}
            />
            <TextInput
                style = {styles.textInput}
                placeholder = "Masukkan Kelas"
                onChangeText = {(kelas) => setKelas(kelas)}
                value = {kelas}
            />
            <Button
                title='Input'
                onPress={() => {onPressHandle()}}
            />
            <Button
                title='test'
                onPress={console.log(listDataMhs)}
            />
        </View>
    )
}

