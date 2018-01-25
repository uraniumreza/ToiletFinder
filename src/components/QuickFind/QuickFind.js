import React, { Component } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import Spinner from 'react-native-spinkit';
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
    const collectionOfMarkers = [];
    positions.map((obj, index) => {
      console.log(obj);
      collectionOfMarkers[index] = <MapView.Marker pinColor="#FF0" coordinate={obj} />;
    });

    console.log(collectionOfMarkers);

    const { position } = this.state;
    if (!position) {
      return <Spinner style={Styles.spinner} isVisible size={100} type="Bounce" color="#009688" />;
    }
    return (
      <View style={Styles.container}>
        <MapView style={Styles.map} region={position}>
          {collectionOfMarkers}
          <MapView.Marker pinColor="#F0FF" coordinate={position} />
        </MapView>
      </View>
    );
  }
}
