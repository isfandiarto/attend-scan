import React, { useState } from 'react'
import styles from '../Styles/Screens/DataScreen';
import {AppRegistry, Button, StyleSheet, Text, View, Image, Platform, SafeAreaView, TouchableOpacity} from 'react-native';
import { Provider, TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { firebase } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import { getDefaultWatermarks } from 'istanbul-lib-report';

const DataScreen = ({navigation}) => {

    
    const [listItems, setListItems] = useState([])
    const [listBio, setListBio] = useState([])
    const [isFetched, setIsFetched] = useState(false)
    const [isGetSearched, setIsGetSearched] = useState(false)

    const getData = async() =>{
        // setListBio([])
        // setListItems([])
        await firestore()
        .collection('absen/' +matkul+ '/' + kelas)
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                listItems.push(doc.id);
              });
        })
        listItems.forEach(async(value) => {
          await firestore()
          .collection('mahasiswa').doc(value)
          .get()
          .then(documentSnapshot => {
              listBio.push(documentSnapshot.data());
              // console.log(documentSnapshot.data());
          });
        });
        setIsGetSearched(true)
    }

    const fetched = () => {
      setIsFetched(true)
    }

    const clearData = () => {
        console.log(listItems) 
        console.log(listBio)
        setListBio([])
        setListItems([])
        setIsFetched(false)
        setIsGetSearched(false)
    }

    const [showDropDownMatkul, setShowDropDownMatkul] = useState(false);
    const [showDropDownKelas, setShowDropDownKelas] = useState(false);
    const [matkul, setMatkul] = useState()
    const [kelas, setKelas] = useState()
    const [isListed, setIsListed] = useState(false)
    
    const matkulList = [
        { label: "Matkul A", value: "Matkul A" },
    
        { label: "Matkul B", value: "Matkul B" },
    
        { label: "Matkul C", value: "Matkul C" },
      ]
    
    const kelasList = [
        { label: "4IA10", value: "4IA10" },
    
        { label: "4IA11", value: "4IA11" },
    
        { label: "4IA12", value: "4IA12" },
      ];

    if (isFetched) {
      return (
        <View style={styles.container}>
            <Provider>
            <SafeAreaView style={styles.container}>
              <TouchableOpacity 
                style={styles.buttonWrap}
                onPress={() =>  clearData()}>
                <Text style={styles.button}>CLEAR DATA</Text>
              </TouchableOpacity>
              {listBio.map(bio => {
                return (
                <TouchableOpacity 
                  style={styles.card}
                  onPress={() => navigation.navigate('Detail', {NPM : bio.NPM, matkul : matkul, kelas : kelas})}
                >
                  <Text>Nama : {bio.nama}</Text>
                  <Text>NPM : {bio.NPM}</Text>
                  <Text>Kelas : {bio.kelas}</Text>
                </TouchableOpacity>
              )})}
              </SafeAreaView>
            </Provider>
        </View>
    )
    } return (
        <View style={styles.container}>
            <Provider>
            <SafeAreaView style={styles.container}>
            <DropDown
                label={"Mata Kuliah"}
                mode={"outlined"}
                value={matkul}
                setValue={setMatkul}
                list={matkulList}
                visible={showDropDownMatkul}
                showDropDown={() => setShowDropDownMatkul(true)}
                onDismiss={() => setShowDropDownMatkul(false)}
                dropDownContainerMaxHeight = {100}
                dropDownStyle = {styles.dropdown}
                inputProps={{
                  right: <TextInput.Icon name={"menu-down"} />,
                }}
              />
              <DropDown
                label={"Kelas"}
                mode={"outlined"}
                value={kelas}
                setValue={setKelas}
                list={kelasList}
                visible={showDropDownKelas}
                showDropDown={() => setShowDropDownKelas(true)}
                onDismiss={() => setShowDropDownKelas(false)}
                dropDownContainerMaxHeight = {100}
                dropDownStyle = {styles.dropdown}
                inputProps={{
                  right: <TextInput.Icon name={"menu-down"} />,
                }}
              />
              {isGetSearched ? 
              <TouchableOpacity 
                style={styles.buttonWrap}
                onPress={() =>  fetched()}>
                <Text style={styles.button}>TAMPILKAN</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity 
                style={styles.buttonWrap}
                onPress={() =>  getData()}>
                <Text style={styles.button}>CARI DATA</Text>
              </TouchableOpacity>
              
              }
              </SafeAreaView>
            </Provider>
        </View>
    )  
}

export default DataScreen
