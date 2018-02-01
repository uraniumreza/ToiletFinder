import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import SplashScreen from './src/components/SplashScreen/SplashScreen';
import QuickFind from './src/components/QuickFind/QuickFind';
import MarkToilet from './src/components/MarkToilet/MarkToilet';

console.disableYellowBox = true;

const Stack = {
  SplashScreen: {
    screen: SplashScreen,
  },
  QuickFind: {
    screen: QuickFind,
  },
  MarkToilet: {
    screen: MarkToilet,
  },
};

const ToiletFinder = StackNavigator({ ...Stack });
export default ToiletFinder;

AppRegistry.registerComponent('ToiletFinder', () => ToiletFinder);
