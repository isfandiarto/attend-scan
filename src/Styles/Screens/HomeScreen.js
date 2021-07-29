import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex : 1, 
    backgroundColor: '#5F939A'
  },
  userBanner : {
    height : 120,
    justifyContent : 'center',
    alignItems : 'center'
  },
  title : {
    fontSize : 25
  },
  text : {
    fontWeight : 'bold',
    fontSize : 30
  },
  tile: {
    flex : 1,
    flexDirection : 'row'
  },
  tileScan : {
    backgroundColor : 'red',
    flex : 1,
    margin : 3,
    borderRadius : 10,
    justifyContent : 'center',
    alignItems : 'center'
  },
  tileData : {
    backgroundColor : 'green',
    flex : 1,
    margin : 3,
    borderRadius : 10,
    justifyContent : 'center',
    alignItems : 'center'
  },
  tileProfile : {
    backgroundColor : 'blue',
    flex : 1,
    margin : 3,
    borderRadius : 10,
    justifyContent : 'center',
    alignItems : 'center'
  },
  tileLogout : {
    backgroundColor : 'orange',
    flex : 1,
    margin : 3,
    borderRadius : 10,
    justifyContent : 'center',
    alignItems : 'center'
  }
});
