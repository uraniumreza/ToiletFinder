import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Footer, FooterTab, Button } from 'native-base';
import MapView from 'react-native-maps';
import firebase from 'firebase';
import Spinner from 'react-native-spinkit';
import geolib from 'geolib';

import Styles from './Styles';
// import { positions } from '../../constants/ToiletPositions';
import { DEFAULT_PADDING } from '../../constants/ConstantStrings';

export default class QuickFind extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      positions: undefined,
      position: undefined,
      selectedTab: '100m',
    };
  }

  componentWillMount() {
    this.getToiletPositions();
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          position: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
        });
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  getToiletPositions = () => {
    firebase
      .database()
      .ref('/toilets')
      .on('value', (snap) => {
        const items = [];
        snap.forEach((child) => {
          items.push({
            location: child.val(),
            _key: child.key,
          });
        });
        this.setState({ positions: items });
      });
  };

  fitAllMarkers = (coordinates) => {
    // const { positions } = this.state;
    // const coordinates = [];
    // positions.map((obj) => {
    //   coordinates.push(obj.location.coordinate);
    // });
    console.log(this);
    this.map.fitToCoordinates(coordinates, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  };

  render() {
    const { position, selectedTab, positions } = this.state;
    let collectionOfMarkers;
    let coordinates;
    console.log('>>', positions);

    if (position) {
      collectionOfMarkers = [];

      positions.map((obj, index) => {
        const { coordinate } = obj.location;
        coordinates = [position];
        const distance = geolib.getDistance(position, coordinate);
        // console.log(distance);
        if (selectedTab === '100m' && distance <= 100) {
          coordinates.push(coordinate);
          collectionOfMarkers.push(
            <MapView.Marker key={index} pinColor="#FF9800" coordinate={coordinate} />,
          );
        } else if (selectedTab === '500m' && distance <= 500) {
          coordinates.push(coordinate);
          collectionOfMarkers.push(
            <MapView.Marker key={index} pinColor="#FF9800" coordinate={coordinate} />,
          );
        } else if (selectedTab === '1km' && distance <= 1000) {
          coordinates.push(coordinate);
          collectionOfMarkers.push(
            <MapView.Marker key={index} pinColor="#FF9800" coordinate={coordinate} />,
          );
        } else if (selectedTab === '2km' && distance <= 2000) {
          coordinates.push(coordinate);
          collectionOfMarkers.push(
            <MapView.Marker key={index} pinColor="#FF9800" coordinate={coordinate} />,
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
        <MapView
          ref={(ref) => {
            this.map = ref;
          }}
          style={Styles.map}
          region={position}
        >
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
              onPress={() =>
                this.setState({ selectedTab: '100m' }, this.fitAllMarkers(coordinates))
              }
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
              onPress={() =>
                this.setState({ selectedTab: '500m' }, this.fitAllMarkers(coordinates))
              }
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
              onPress={() => this.setState({ selectedTab: '1km' }, this.fitAllMarkers(coordinates))}
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
              onPress={() => this.setState({ selectedTab: '2km' }, this.fitAllMarkers(coordinates))}
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
