import { AppRegistry, Dimensions } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import SplashScreen from './src/components/SplashScreen/SplashScreen';
// import HomePage from './src/components/HomePage/HomePage';
// import SideMenu from './src/components/SideMenu/SideMenu';
// import Location from './src/components/Location/Location';
// import Map from './src/components/Location/Map';
// import About from './src/components/About/About';

const { width } = Dimensions.get('window');

console.disableYellowBox = true;

const Stack = {
  SplashScreen: {
    screen: SplashScreen,
  },
};

const DrawerRoutes = {
  Home: {
    screen: StackNavigator(Stack, { initialRouteName: 'SplashScreen' }),
  },
};

const duMedico = StackNavigator(
  {
    Drawer: {
      name: 'Drawer',
      screen: DrawerNavigator(DrawerRoutes, {
        drawerWidth: width * 0.65,
        // contentComponent: SideMenu,
      }),
    },
    ...Stack,
  },
  {
    drawerWidth: 300,
    headerMode: 'none',
  },
);

export default duMedico;

AppRegistry.registerComponent('duMedico', () => duMedico);
