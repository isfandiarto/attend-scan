/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import LoginScreen from './src/Screens/LoginScreen';
import AbsenScreen from './src/Screens/AbsenScreen';
import CameraScreen1 from './src/Screens/CameraScreen1'
import DataScreen from './src/Screens/DataScreen';
import {name as appName} from './app.json';
import { Provider as PaperProvider } from 'react-native-paper'

export default function Main() {
    return(
        <PaperProvider>
            <App/>
        </PaperProvider>
    )
}

AppRegistry.registerComponent(appName, () => Main);
