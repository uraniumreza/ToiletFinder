/**
 * Mobile Application For duMedico(Patient)
 * Product Developed By: Dubin Labs Ltd.
 * StyleSheet for SplashScreen || Author: Nayeem Reza
 * https://github.com/mostafiz93/DuMedi
 */

import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  imgBackground: {
    width,
    height,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    opacity: 1,
  },
  container: {
    position: 'absolute',
    bottom: 30,
    marginLeft: width * 0.5 - 20,
  },
});
