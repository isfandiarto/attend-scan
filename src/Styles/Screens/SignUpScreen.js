import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#5F939A'
      },
      text : {
          alignSelf : 'center',
          color : '#fff',
          fontSize : 25,
          marginTop : 150,
          marginBottom : 30
      },
      textInput : {
          marginVertical : 10,
          marginHorizontal : 50,
          width : 300,
          backgroundColor : '#5F939A',
      },
      buttonSignUpWrap : {
        alignSelf : 'center',
        marginTop : 10,
        marginBottom : 10,
        padding : 15,
        width : 300,
        backgroundColor : '#467fd0',
        borderRadius : 5
    },
      buttonInput : {
          alignSelf : 'center',
          color : '#fff',
      }
})