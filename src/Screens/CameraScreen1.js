import React, {useState} from 'react';
import {AppRegistry, Button, StyleSheet, Text, View, Image, Platform, SafeAreaView, TouchableOpacity} from 'react-native';
import { Provider, TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import ImagePicker from 'react-native-image-crop-picker';
import ProgressCircle from 'react-native-progress/Circle';
import TesseractOcr, {
  LANG_ENGLISH,
  useEventListener,
} from 'react-native-tesseract-ocr';
import styles from '../Styles/Screens/CameraScreen1';
import OpenCV from '../NativeModules/OpenCV'
import Toast, {DURATION} from 'react-native-easy-toast';

const DEFAULT_HEIGHT = 200;
const DEFAULT_WIDTH = 800;
const defaultPickerOptions = {
  cropping: true,
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WIDTH,
  includeBase64 : true
};

function CameraScreen1({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imgSrc, setImgSrc] = useState(null);
  const [text, setText] = useState('');
  const [isScanned, setIsScanned] = useState(false);
  const [base64, setBase64] = useState()
  const [procImg, setProcImg] = useState(null)
  const [isCaptured, setIsCaptured] = useState(false)
  const [showDropDownMatkul, setShowDropDownMatkul] = useState(false);
  const [showDropDownKelas, setShowDropDownKelas] = useState(false);
  const [showDropDownPertemuan, setShowDropDownPertemuan] = useState(false);
  const [matkul, setMatkul] = useState()
  const [kelas, setKelas] = useState()
  const [pertemuan, setPertemuan] = useState()
  
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

  const pertemuanList = [
    { label: "1", value: "1" },

    { label: "2", value: "2" },

    { label: "3", value: "3" },
  ];

  useEventListener('onProgressChange', (p) => {
    setProgress(p.percent / 100);
  });

  const recognizeTextFromImage = async (dataImg) => {
    setIsLoading(true);
      try {
        const tesseractOptions = {};
        const recognizedText = await TesseractOcr.recognize(
          dataImg,
          LANG_ENGLISH,
          tesseractOptions,
        );
        setText(recognizedText);
        setIsScanned(true);
        goToResultScreen(recognizedText, kelas, matkul, pertemuan);
      } catch (err) {
        console.error(err);
        setText('');
      }
    setIsLoading(false);
    setProgress(0);
    setIsCaptured(false);
  };

  const recognizeFromCamera = async (options = defaultPickerOptions) => {
    if (matkul == null || kelas == null || pertemuan == null){
      alert('Data belum lengkap')
    }else{
      try {
        const image = await ImagePicker.openCamera(options);
        setIsCaptured(true);
        setImgSrc({uri: image.path});
        setBase64(image.data)
        grayImage(image.data)
      } catch (err) {
        if (err.message !== 'User cancelled image selection') {
          console.error(err);
        }
      }
    }
  };

  const grayImage = (data) => {
      proceedToGetGrayImage(data);
  }
  const blurImage = () => {
    proceedToGetBlurImage();
}

  //OPENCV GRAYSCALE---------------------------------------------------
  const getGrayImage = (base64) => {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'android') {
        console.log(base64);
        OpenCV.getGrayImage(
          base64,
          error => {
            // error handling
          },
          msg => {
            resolve(msg);
          },
        );
      } else {
        OpenCV.getGrayImage(imageAsBase64, (error, dataArray) => {
          resolve(dataArray[0]);
        });
      }
    });
  }

const proceedToGetGrayImage = (data) => {
    getGrayImage(data).then(processedImg => {
        setProcImg(processedImg);
        // toast.show('Photo is blurred!',DURATION.LENGTH_SHORT);
      })
      .catch(err => {
        console.log('err', err);
      });
  }

const goToResultScreen = (text, kelas, matkul, pertemuan) => {
  navigation.navigate('Result', { text : text, kelas : kelas, matkul : matkul, pertemuan : pertemuan})
}

if(isCaptured){
    return(
        <View style={styles.container}>
            {imgSrc && (
            <View style={styles.imageContainer}>
              <Image style={style.image} source={imgSrc} />
              {/* <Image style={style.image} source={{ uri: `data:image/png;base64,${procImg}` }} /> */}
              {isLoading ? (
                <ProgressCircle showsText progress={progress} />
              ) : (
                <Text>{text}</Text>
              )}
            </View>
          )}
          <View style={styles.button}>
            <TouchableOpacity style={styles.buttonWrap}
              onPress={()=> {recognizeTextFromImage(procImg)}}
            >
              <Text style={styles.buttonInput}>SCAN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonWrap}
              onPress={()=> {recognizeFromCamera()}}
            >
              <Text style={styles.buttonInput}>AMBIL GAMBAR ULANG</Text>
            </TouchableOpacity>
            </View>
            <Toast ref={(toast) => toast = toast}/>
        </View>
    )
}else{
    return (
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
              <DropDown
                label={"Pertemuan ke-"}
                mode={"outlined"}
                value={pertemuan}
                setValue={setPertemuan}
                list={pertemuanList}
                visible={showDropDownPertemuan}
                showDropDown={() => setShowDropDownPertemuan(true)}
                onDismiss={() => setShowDropDownPertemuan(false)}
                dropDownContainerMaxHeight = {100}
                dropDownStyle = {styles.dropdown}
                inputProps={{
                  right: <TextInput.Icon name={"menu-down"} />,
                }}
              />
                  <View style={styles.button}>
                    <TouchableOpacity style={styles.buttonWrap}
                      onPress={()=> {recognizeFromCamera()}}
                    >
                      <Text style={styles.buttonInput}>AMBIL GAMBAR</Text>
                    </TouchableOpacity>
                  </View>
            </SafeAreaView>
          </Provider>
      );
}
  
}

const style = StyleSheet.create({
  image: {
    marginVertical: 15,
    height: DEFAULT_HEIGHT / 2.5,
    width: DEFAULT_WIDTH / 2.5,
  },
})

AppRegistry.registerComponent('CameraScreen1', () => CameraScreen1);

export default CameraScreen1;