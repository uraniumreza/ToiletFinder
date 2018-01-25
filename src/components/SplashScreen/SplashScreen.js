import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Spinner from 'react-native-spinkit';

import Styles from './Styles';

export default class SplashScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <Image source={require('../../assets/icons/toilet.png')} style={Styles.imgBackground} />
        <View style={Styles.container}>
          <Spinner isVisible size={50} type="ThreeBounce" color="#FFF" />
        </View>
      </View>
    );
  }
}
