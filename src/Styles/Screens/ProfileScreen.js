import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,justifyContent : 'center',
    backgroundColor: '#5F939A'
  },

  text: {
    fontSize : 16,
    margin : 10,
    marginHorizontal : 40
  },
  label : {
    marginTop : 20,
    marginBottom : -5,
    marginHorizontal : 40,
  },
  textInput : {
    marginVertical : 5,
    marginHorizontal : 40,
    fontSize : 16,
    backgroundColor : '#5F939A',   
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
