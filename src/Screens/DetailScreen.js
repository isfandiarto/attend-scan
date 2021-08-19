import React, {useState, useEffect} from 'react'
import { View, Text } from 'react-native'
import styles from '../Styles/Screens/DetailScreen';
import firestore from '@react-native-firebase/firestore';

const DetailScreen = ({route}) => {

    const {NPM, matkul, kelas} = route.params
    const [listKehadiran, setListKehadiran] = useState([])
    const [listPertemuan, setListPertemuan] = useState([])
    const [isFetched, setIsFetched] = useState(false)


    useEffect(() => {
        firestore()
        .collection('absen/' +matkul+ '/' +kelas+ '/' +NPM+ '/kehadiran')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                listPertemuan.push(doc.id)
                listKehadiran.push(doc.data())
            });
            setIsFetched(true)
        })
    }, [])
    
    console.log(listKehadiran)

if(isFetched){
    return (
        <View style={styles.container}>
            <Text>{NPM}</Text>
            {listKehadiran.map((data, index) => {
                return (
                <View style={styles.card} key={index}>
                    <Text>Pertemuan {data.minggu}</Text>
                    <Text>Status : {data.status ? 'Hadir' : 'Tidak Hadir'}</Text>
                    <Text>Keterangan : {'' ? 'Tidak ada Keterangan' : data.keterangan}</Text>
                </View>
              )})}
        </View>
    )
}else{
    return(
        <View>
            <Text>Loading...</Text>
        </View>
    )
}
    
}

export default DetailScreen
