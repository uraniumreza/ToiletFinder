import React, { Component } from 'react';
import { View, Text, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Footer, FooterTab, Button } from 'native-base';
import MapView from 'react-native-maps';
import firebase from 'firebase';
import Spinner from 'react-native-spinkit';
import geolib from 'geolib';

import Styles from './Styles';
// import { MARKERS } from '../../constants/ToiletPositions';
import { DEFAULT_PADDING } from '../../constants/ConstantStrings';

export default class QuickFind extends Component {
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
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
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

  getToiletPositions() {
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
  }

  fitAllMarkers = (coordinates) => {
    if (this.map) {
      // console.log('--->', this.map);
      this.map.fitToCoordinates(coordinates, {
        edgePadding: DEFAULT_PADDING,
        animated: true,
      });
    }
  };

  renderMarkers = () => {
    const { selectedTab, position, positions } = this.state;
    // let collectionOfMarkers;
    // let coordinates;
    const collectionOfMarkers = [];
    const coordinates = [];
    // console.log('>>', coordinates);
    coordinates.push(position);
    positions.map((obj, index) => {
      // console.log(obj);
      const {
        coordinate, disabledAccess, free, placeType, rating,
      } = obj.location;
      const distance = geolib.getDistance(position, coordinate);
      // console.log(coordinate);
      if (selectedTab === '100m' && distance <= 100) {
        coordinates.push(coordinate);
        collectionOfMarkers.push(
          <MapView.Marker
            title={placeType}
            description={`${disabledAccess ? 'Disabled Access | ' : ''} ${
              free ? 'FREE | ' : ''
            } Rating: ${rating}/5`}
            key={index}
            pinColor="#FF9800"
            coordinate={coordinate}
          />,
        );
      } else if (selectedTab === '500m' && distance <= 500) {
        coordinates.push(coordinate);
        collectionOfMarkers.push(
          <MapView.Marker
            title={placeType}
            description={`${disabledAccess ? 'Disabled Access | ' : ''} ${
              free ? 'FREE | ' : ''
            } Rating: ${rating}/5`}
            key={index}
            pinColor="#FF9800"
            coordinate={coordinate}
          />,
        );
      } else if (selectedTab === '1km' && distance <= 1000) {
        coordinates.push(coordinate);
        collectionOfMarkers.push(
          <MapView.Marker
            title={placeType}
            description={`${disabledAccess ? 'Disabled Access | ' : ''} ${
              free ? 'FREE | ' : ''
            } Rating: ${rating}/5`}
            key={index}
            pinColor="#FF9800"
            coordinate={coordinate}
          />,
        );
      } else if (selectedTab === '2km' && distance <= 2000) {
        coordinates.push(coordinate);
        collectionOfMarkers.push(
          <MapView.Marker
            title={placeType}
            description={`${disabledAccess ? 'Disabled Access | ' : ''} ${
              free ? 'FREE | ' : ''
            } Rating: ${rating}/5`}
            key={index}
            pinColor="#FF9800"
            coordinate={coordinate}
          />,
        );
      }
    });

    // console.log(coordinates, '<<');

    this.fitAllMarkers(coordinates);

    return collectionOfMarkers;
  };

  render() {
    const { position, selectedTab, positions } = this.state;

    if (!position || !positions) {
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
          {this.renderMarkers()}
          <MapView.Marker
            pinColor="#F0FF"
            coordinate={position}
            title="My Location"
            description="Now I am here!"
          />
        </MapView>

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
