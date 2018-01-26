import React, { Component } from 'react';
import { View, Text, ScrollView, Platform, UIManager, LayoutAnimation } from 'react-native';
import { List, ListItem, Switch, Body, Right, ActionSheet, Root, Button } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StarRating from 'react-native-star-rating';
import firebase from 'firebase';
import MapView from 'react-native-maps';
import Spinner from 'react-native-spinkit';
import PropTypes from 'prop-types';

import Styles from './Styles';
import { DEFAULT_PADDING } from '../../constants/ConstantStrings';

const BUTTONS = ['Public', 'Restaurant', 'Shopping Center', 'Gas Station', 'Cancel'];
const DESTRUCTIVE_INDEX = 4;
const CANCEL_INDEX = 4;

export default class MarkToilet extends Component {
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
      position: undefined,
      currentPosition: undefined,
      starCount: 3.5,
      disabledAccess: false,
      free: false,
      selectedType: undefined,
    };
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
          currentPosition: {
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

    ActionSheet.actionsheetInstance = null;
  }

  onStarRatingPress = (rating) => {
    this.setState({
      starCount: rating,
    });
  };

  handleAdd = () => {
    const {
      free, disabledAccess, starCount, selectedType, position,
    } = this.state;

    const data = {
      free,
      disabledAccess,
      rating: starCount,
      placeType: selectedType,
      coordinate: {
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
    };

    firebase
      .database()
      .ref('/toilets')
      .push(data, (error) => {
        if (error) alert('Internal Server Error!');
        else {
          alert('Congratulations! You have successfully marked a location!');
          this.setState({
            starCount: 3.5,
            disabledAccess: false,
            free: false,
            selectedType: undefined,
            position: this.state.currentPosition,
          });
        }
      });
  };

  fitAllMarkers = () => {
    this.map.fitToCoordinates([this.state.position, this.state.position], {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  };

  handleCancel = () => {
    const { goBack } = this.props.navigation;
    goBack(null);
  };

  render() {
    const {
      position, currentPosition, disabledAccess, free, selectedType,
    } = this.state;

    if (!currentPosition) {
      return <Spinner style={Styles.spinner} isVisible size={100} type="Bounce" color="#009688" />;
    }
    return (
      <Root>
        <View>
          <View style={Styles.container}>
            <MapView
              ref={(ref) => {
                this.map = ref;
              }}
              style={Styles.map}
              region={position}
            >
              <MapView.Marker
                draggable
                pinColor="green"
                coordinate={position}
                onDragEnd={(e) => {
                  e.nativeEvent.coordinate.latitudeDelta = 0.01;
                  e.nativeEvent.coordinate.longitudeDelta = 0.01;
                  this.setState({ position: e.nativeEvent.coordinate }, () => this.fitAllMarkers());
                }}
              />
            </MapView>
          </View>
          <ScrollView>
            <List>
              <ListItem>
                <Body>
                  <Text style={Styles.listText}>Free</Text>
                </Body>
                <Right>
                  <Switch
                    onValueChange={(value) => this.setState({ free: value })}
                    style={{ padding: 3 }}
                    value={free}
                  />
                </Right>
              </ListItem>
              <ListItem>
                <Body>
                  <Text style={Styles.listText}>Disabled Access</Text>
                </Body>
                <Right>
                  <Switch
                    onValueChange={(value) => this.setState({ disabledAccess: value })}
                    style={{ padding: 3 }}
                    value={disabledAccess}
                  />
                </Right>
              </ListItem>
              <ListItem>
                <Body>
                  <Text style={Styles.listText}>Rating</Text>
                </Body>
                <Right>
                  <StarRating
                    starSize={22}
                    starColor="#009688"
                    disabled={false}
                    maxStars={5}
                    rating={this.state.starCount}
                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                  />
                </Right>
              </ListItem>
              <ListItem>
                <Body>
                  <Text style={Styles.listText}>Place Type</Text>
                </Body>
                <Right
                  style={{
                    flex: 1,
                    width: 'auto',
                  }}
                >
                  {(!selectedType || selectedType === 'Cancel') && (
                    <Icon
                      onPress={() =>
                        ActionSheet.show(
                          {
                            options: BUTTONS,
                            cancelButtonIndex: CANCEL_INDEX,
                            destructiveButtonIndex: DESTRUCTIVE_INDEX,
                            title: 'Place Type',
                          },
                          (buttonIndex) => {
                            this.setState({ selectedType: BUTTONS[buttonIndex] });
                          },
                        )
                      }
                      name="keyboard-arrow-right"
                      size={22}
                    />
                  )}
                  {selectedType &&
                    selectedType !== 'Cancel' && (
                      <Text style={[Styles.listText, { fontStyle: 'italic', color: '#009688' }]}>
                        {selectedType}
                      </Text>
                    )}
                </Right>
              </ListItem>
            </List>
            <View style={{ marginTop: 15 }} />
            <View style={Styles.buttonsContainer}>
              <Button style={Styles.button} block info onPress={() => this.handleCancel()}>
                <Text style={Styles.buttonText}>CANCEL</Text>
              </Button>
              <View style={{ marginTop: 20 }} />
              <Button style={Styles.button} block info onPress={() => this.handleAdd()}>
                <Text style={Styles.buttonText}>ADD</Text>
              </Button>
            </View>
            <View style={{ marginTop: 15 }} />
          </ScrollView>
        </View>
      </Root>
    );
  }
}

MarkToilet.propTypes = {
  navigation: PropTypes.object.isRequired,
};
