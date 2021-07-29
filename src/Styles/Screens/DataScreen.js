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
        marginHorizontal: 10,
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
      card : {
        margin : 10,
        padding : 5,
        width : '100%',
        backgroundColor : '#fff'
      },
      buttonWrap : {
        margin : 50,
        alignSelf : 'center',
        padding : 15,
        width : 300,
        backgroundColor : '#467fd0',
        borderRadius : 5
      },
      button : {
        alignSelf : 'center'
      }
});
