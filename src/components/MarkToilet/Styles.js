import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    height: height * 0.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  spinner: {
    marginLeft: width * 0.5 - 50,
    marginTop: height * 0.5 - 50,
  },
  listText: {
    fontSize: 17,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    margin: 10,
    textAlign: 'center',
  },
  button: {
    width: (width - 45) / 2,
    height: 50,
    borderRadius: 6,
    backgroundColor: '#546E7A',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
  },
});
