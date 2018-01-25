import { AppRegistry, Dimensions } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import SplashScreen from './src/components/SplashScreen/SplashScreen';
import QuickFind from './src/components/QuickFind/QuickFind';

const { width } = Dimensions.get('window');

console.disableYellowBox = true;

const Stack = {
  SplashScreen: {
    screen: SplashScreen,
  },
  QuickFind: {
    screen: QuickFind,
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
