import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { Button, Root } from 'native-base';
import Spinner from 'react-native-spinkit';
import firebase from 'firebase';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Styles from './Styles';

export default class SplashScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      home: false,
    };
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDCvBZUVHBbsEDtf3Q-lldVlQFRMBXblac',
      authDomain: 'toiletfinder-193210.firebaseapp.com',
      databaseURL: 'https://toiletfinder-193210.firebaseio.com',
      projectId: 'toiletfinder-193210',
      storageBucket: 'toiletfinder-193210.appspot.com',
      messagingSenderId: '627387251144',
    });
    setTimeout(() => {
      this.setState({ home: true });
    }, 800);
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
