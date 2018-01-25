/**
 * Mobile Application For duMedico(Patient)
 * Product Developed By: Dubin Labs Ltd.
 * StyleSheet for SplashScreen || Author: Nayeem Reza
 * https://github.com/mostafiz93/DuMedi
 */

import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  imgBackground: {
    width: 150,
    height: 150,
  },
  container: {
    position: 'absolute',
    bottom: 30,
    marginLeft: width * 0.5 - 20,
  },
  title: {
    fontSize: 30,
    color: '#464646',
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    margin: 10,
    textAlign: 'center',
  },
  button: {
    width: width - 50,
    height: 50,
    borderRadius: 6,
    backgroundColor: '#546E7A',
  },
});
