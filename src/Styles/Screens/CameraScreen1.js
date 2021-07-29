import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal : 20,
        paddingVertical : 20,
        backgroundColor: '#5F939A',
      },
      dropdown : {
        marginTop : 10
      },  
      options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
      },
      button: {
        // alignSelf : 'center',
        marginTop : 20,
        marginBottom : 10,
        padding : 15,
        width : '100%',
        backgroundColor : '#5F939A',
        borderRadius : 5
      },
      buttonWrap : {
        alignSelf : 'center',
        marginTop : 10,
        marginBottom : 10,
        padding : 15,
        width : '100%',
        backgroundColor : '#467fd0',
        borderRadius : 5
      },
      buttonInput : {
        alignSelf : 'center',
        color : '#fff'
      },
      imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
      instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
      },
});