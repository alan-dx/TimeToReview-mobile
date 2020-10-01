import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import ReviewsScreen from '../screens/ReviewsScreen';
import RoutineScreen from '../screens/RoutineScreen';
import SettingScreen from '../screens/SettingScreen';
import SubjectScreen from '../screens/SubjectScreen';
import PerformanceScreen from '../screens/PerformanceScreen';
import AddScreen from '../screens/AddScreen';
import EditScreen from '../screens/EditScreen';
import AddSubjectScreen from '../screens/AddSubjectScreen';
import EditSubjectScreen from '../screens/EditSubjectScreen';

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
                <Screen name="AddScreen" component={AddScreen} />
                <Screen name="EditScreen" component={EditScreen} />
                <Screen name="AddSubjectScreen" component={AddSubjectScreen} />
                <Screen name="EditSubjectScreen" component={EditSubjectScreen} />
            </Navigator>
        </NavigationContainer>
    );
}

export default AppRoutes;