import { StyleSheet } from 'react-native';
import StackNavigator from './StackNavigator';
import { UserProvider } from './screens/UserContext';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require('./assets/fonts/Inter-Regular.ttf'),
    "Agbalum-Regular": require('./assets/fonts/Agbalumo-Regular.ttf'),
    "KaiseiDecol-Regular" : require('./assets/fonts/KaiseiDecol-Regular.ttf'),
    "KaiseiDecol-Bold" : require('./assets/fonts/KaiseiDecol-Bold.ttf'),
    "Inter-Italic" : require('./assets/fonts/Inter-Italic.ttf'),
    "Inter-Bold" : require('./assets/fonts/Inter-Bold.ttf'),
  })
  return (
    <UserProvider>
      <StackNavigator />
    </UserProvider>
  );
}

const styles = StyleSheet.create({});
