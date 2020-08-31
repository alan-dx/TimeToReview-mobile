import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import ReviewsScreen from '../screens/ReviewsScreen';
import RoutineScreen from '../screens/RoutineScreen';
import SettingScreen from '../screens/SettingScreen';
import SubjectScreen from '../screens/SubjectScreen';
import PerformanceScreen from '../screens/PerformanceScreen';

const {Screen, Navigator} = createStackNavigator()

const AppRoutes = () => {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }} mode= 'card'>
                <Screen name="HomeScreen" component={HomeScreen} />
                <Screen name="ReviewsScreen" component={ReviewsScreen} />
                <Screen name="RoutineScreen" component={RoutineScreen} />
                <Screen name="SubjectScreen" component={SubjectScreen} />
                <Screen name="PerformanceScreen" component={PerformanceScreen} />
                <Screen name="SettingScreen" component={SettingScreen} />
            </Navigator>
        </NavigationContainer>
    );
}

export default AppRoutes;