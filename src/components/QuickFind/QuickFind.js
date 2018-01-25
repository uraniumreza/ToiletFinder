import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import MapView from 'react-native-maps';
import Spinner from 'react-native-spinkit';
import geolib from 'geolib';

import Styles from './Styles';
import { positions } from '../../constants/ToiletPositions';

export default class QuickFind extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      position: undefined,
      selectedTab: '100m',
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          position: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          },
        });
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    const { position, selectedTab } = this.state;

    const collectionOfMarkers = [];

    if (position) {
      console.log('>>>>>>>>');
      let id = 0;
      positions.map((obj, index) => {
        const distance = geolib.getDistance(position, obj);
        console.log(distance);
        if (selectedTab === '100m' && distance <= 100) {
          collectionOfMarkers[id++] = (
            <MapView.Marker key={index} pinColor="#FF9800" coordinate={obj} />
          );
        } else if (selectedTab === '500m' && distance <= 500) {
          collectionOfMarkers[id++] = (
            <MapView.Marker key={index} pinColor="#FF9800" coordinate={obj} />
          );
        } else if (selectedTab === '1km' && distance <= 1000) {
          collectionOfMarkers[id++] = (
            <MapView.Marker key={index} pinColor="#FF9800" coordinate={obj} />
          );
        } else if (selectedTab === '2km' && distance <= 2000) {
          collectionOfMarkers[id++] = (
            <MapView.Marker key={index} pinColor="#FF9800" coordinate={obj} />
          );
        }
      });
    }

    // console.log(position);

    if (!position) {
      return <Spinner style={Styles.spinner} isVisible size={100} type="Bounce" color="#009688" />;
    }
    return (
      <View style={Styles.container}>
        <MapView style={Styles.map} region={position}>
          {collectionOfMarkers}
          <MapView.Marker
            pinColor="#F0FF"
            coordinate={position}
            title="My Location"
            description="Now I am here!"
          />
          {/* <MapView.Marker
            draggable
            pinColor="green"
            coordinate={position}
            onDragEnd={(e) => this.setState({ position: e.nativeEvent.coordinate })}
          /> */}
        </MapView>
        {/* <View style={Styles.footer}>
          <Text>Toilet Finder</Text>
        </View> */}
        <Footer>
          <FooterTab>
            <Button
              vertical
              style={{
                borderRightColor: '#FFF',
                height: 55,
                borderRightWidth: 1,
                backgroundColor: selectedTab === '100m' ? '#FF9800' : '#009688',
              }}
              active={selectedTab === '100m'}
              onPress={() => this.setState({ selectedTab: '100m' })}
            >
              <Text
                style={[Styles.footerText, { color: selectedTab === '100m' ? '#464646' : '#FFF' }]}
              >
                100m
              </Text>
            </Button>
            <Button
              vertical
              style={{
                borderRightColor: '#FFF',
                height: 55,
                borderRightWidth: 1,
                backgroundColor: selectedTab === '500m' ? '#FF9800' : '#009688',
              }}
              active={selectedTab === '500m'}
              onPress={() => this.setState({ selectedTab: '500m' })}
            >
              <Text
                style={[Styles.footerText, { color: selectedTab === '500m' ? '#464646' : '#FFF' }]}
              >
                500m
              </Text>
            </Button>
            <Button
              vertical
              style={{
                borderRightColor: '#FFF',
                height: 55,
                borderRightWidth: 1,
                backgroundColor: selectedTab === '1km' ? '#FF9800' : '#009688',
              }}
              active={selectedTab === '1km'}
              onPress={() => this.setState({ selectedTab: '1km' })}
            >
              <Text
                style={[Styles.footerText, { color: selectedTab === '1km' ? '#464646' : '#FFF' }]}
              >
                1km
              </Text>
            </Button>
            <Button
              vertical
              style={{
                height: 55,
                backgroundColor: selectedTab === '2km' ? '#FF9800' : '#009688',
              }}
              active={selectedTab === '2km'}
              onPress={() => this.setState({ selectedTab: '2km' })}
            >
              <Text
                style={[Styles.footerText, { color: selectedTab === '2km' ? '#464646' : '#FFF' }]}
              >
                2km
              </Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    );
  }
}
