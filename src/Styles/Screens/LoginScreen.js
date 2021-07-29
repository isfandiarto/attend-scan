import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#5F939A'
      },
    text : {
        alignSelf : 'center',

    },  
    textInput : {
        marginVertical : 10,
        marginHorizontal : 50,
        backgroundColor : '#5F939A',
            
      },
    buttonLoginWrap : {
        alignSelf : 'center',
        marginTop : 10,
        marginBottom : 10,
        padding : 15,
        width : 300,
        backgroundColor : '#467fd0',
        borderRadius : 5
      },
    buttonSignUpWrap : {
        alignSelf : 'center',
        marginTop : 10,
        marginBottom : 10,
        padding : 15,
        width : 300,
        backgroundColor : '#5F939A',
        borderRadius : 25
    },
    buttonInput : {
        alignSelf : 'center',
        color : '#fff',
    },
    logo : {
      marginTop : -70,
      marginBottom : 30,
      height : 250,
      width : 200,
      alignSelf : 'center',
    }
})