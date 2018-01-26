import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  LayoutAnimation,
  Platform,
  UIManager,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import { Button, Root } from 'native-base';
import Spinner from 'react-native-spinkit';
import firebase from 'firebase';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

import Styles from './Styles';

export default class SplashScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.state = {
      home: false,
    };
  }

  componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyDCvBZUVHBbsEDtf3Q-lldVlQFRMBXblac',
        authDomain: 'toiletfinder-193210.firebaseapp.com',
        databaseURL: 'https://toiletfinder-193210.firebaseio.com',
        projectId: 'toiletfinder-193210',
        storageBucket: 'toiletfinder-193210.appspot.com',
        messagingSenderId: '627387251144',
      });
    }

    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
      this.setState({ home: true });
    }, 500);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    const currentTime = moment();
    let duration;
    const { lastPress } = this.state;
    if (lastPress) duration = moment.duration(currentTime.diff(lastPress)).asSeconds();
    if (duration < 2.5) {
      BackHandler.exitApp();
    } else {
      this.setState({ lastPress: currentTime });
      ToastAndroid.show('Please tap BACK again to exit!', ToastAndroid.SHORT);
      return true;
    }
  }

  render() {
    const { home } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <Root>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image source={require('../../assets/icons/toilet.png')} style={Styles.imgBackground} />
          <Text style={Styles.title}>Toilet Finder</Text>
          {home && (
            <View>
              <View style={{ marginTop: 50 }} />
              <Button style={Styles.button} block info onPress={() => navigate('QuickFind')}>
                <MaterialIcons name="location-searching" size={30} color="#fff" align="left" />
                <Text style={Styles.buttonText}>QUICK FIND</Text>
              </Button>
              <View style={{ marginTop: 20 }} />
              <Button style={Styles.button} block info onPress={() => navigate('MarkToilet')}>
                <Ionicons name="md-bookmark" size={30} color="#fff" align="left" />
                <Text style={Styles.buttonText}>MARK TOILET</Text>
              </Button>
            </View>
          )}
          {!home && (
            <View style={Styles.container}>
              <Spinner isVisible size={50} type="ThreeBounce" color="#009688" />
            </View>
          )}
        </View>
      </Root>
    );
  }
}

SplashScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
