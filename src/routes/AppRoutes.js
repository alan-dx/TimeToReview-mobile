import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';

const {Screen, Navigator} = createStackNavigator()

const AppRoutes = () => {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }} mode= 'card'>
                <Screen name="HomeScreen" component={HomeScreen} />
            </Navigator>
        </NavigationContainer>
    );
}

export default AppRoutes;