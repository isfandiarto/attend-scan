import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  NativeModules
} from 'react-native';
import { RNCamera as Camera } from 'react-native-camera';
import Toast, {DURATION} from 'react-native-easy-toast'

import styles from '../Styles/Screens/CameraScreen';
import OpenCV from '../NativeModules/OpenCV';
import CircleWithinCircle from '../assets/svg/CircleWithinCircle';

export default class CameraScreen extends Component {
  constructor(props) {
    super(props);

    this.takePicture = this.takePicture.bind(this);
    this.checkForBlurryImage = this.checkForBlurryImage.bind(this);
    this.proceedWithCheckingBlurryImage = this.proceedWithCheckingBlurryImage.bind(this);
    this.repeatPhoto = this.repeatPhoto.bind(this);
    this.usePhoto = this.usePhoto.bind(this);
  }

  state = {
    cameraPermission: false,
    photoAsBase64: {
      content: '',
      isPhotoPreview: false,
      photoPath: '',
    },
    newImage : '',
    isConverted : false
  };

  checkForBlurryImage(imageAsBase64) {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'android') {
        OpenCV.testF(imageAsBase64, error => {
          // error handling
        }, msg => {
          resolve(msg);
        });
      } else {
        OpenCV.checkForBlurryImage(imageAsBase64, (error, dataArray) => {
          resolve(dataArray[0]);
        });
      }
    });
  }

  proceedWithCheckingBlurryImage() {
    const { content, photoPath } = this.state.photoAsBase64;

    this.checkForBlurryImage(content).then(blurryPhoto => {
      // if (blurryPhoto) {
        this.state.isConverted = true;
        console.log('berhasil');
        this.state.newImage = blurryPhoto;
        this.refs.toast.show('Photo is blurred!',DURATION.LENGTH_SHORT);
        // return this.repeatPhoto();
      // }else{
        // console.log(blurryPhoto)
        // this.refs.toast.show('Photo is clear!', DURATION.LENGTH_SHORT);
        // this.setState({ photoAsBase64: { ...this.state.photoAsBase64, isPhotoPreview: true, photoPath } });
      // }
    }).catch(err => {
      console.log('err', err)
    });
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 1, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.setState({
        ...this.state,
        photoAsBase64: { content: data.base64, isPhotoPreview: false, photoPath: data.uri },
      });
      this.proceedWithCheckingBlurryImage();
    }
  }


  repeatPhoto() {
    this.setState({
      ...this.state,
      photoAsBase64: {
        content: '',
        isPhotoPreview: false,
        photoPath: '',
      },
      isConverted : false
    });
  }

  usePhoto() {
    // do something, e.g. navigate
  }


  render() {
    if (this.state.isConverted) {
      return (
        <View style={styles.container}>
          <Toast ref="toast" position="center" />
          <Image
            source={{ uri: `data:image/png;base64,${this.state.newImage}` }}
            style={styles.imagePreview}
          />
          <View style={styles.repeatPhotoContainer}>
            <TouchableOpacity onPress={this.repeatPhoto}>
              <Text style={styles.photoPreviewRepeatPhotoText}>
                Repeat photo
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.usePhotoContainer}>
            <TouchableOpacity onPress={this.usePhoto}>
              <Text style={styles.photoPreviewUsePhotoText}>
                Use photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }else{
      return (
        <View style={styles.container}>
          <Camera
            ref={cam => {
              this.camera = cam;
            }}
            style={styles.preview}
          >
            <View style={styles.takePictureContainer}>
              <TouchableOpacity onPress={this.takePicture}>
                <View>
                  <CircleWithinCircle />
                </View>
              </TouchableOpacity>
            </View>
          </Camera>
          <Toast ref="toast" position="center" />
        </View>
      );
    }
  }
}


AppRegistry.registerComponent('CameraScreen', () => CameraScreen);