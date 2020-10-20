import React, { useContext, useEffect } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthContext from '../contexts/auth';

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
import PreLoadScreen from '../screens/PreLoadScreen';
import AllReviewsScreen from '../screens/AllReviewsScreen';
import Header from '../components/Header';

const {Screen, Navigator} = createStackNavigator()

const AppRoutes = () => {

    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }} mode= 'card'>
                <Screen 
                    name="PreLoadScreen" 
                    component={PreLoadScreen} 
                />
                <Screen 
                    name="HomeScreen" 
                    component={HomeScreen} 
                    options={{
                        headerShown: true,
                        header: () => <Header title="MENU" showLogout color="#F5F5F5" />
                    }}
                />
                <Screen name="ReviewsScreen" component={ReviewsScreen} />
                <Screen name="RoutineScreen" component={RoutineScreen} />
                <Screen name="SubjectScreen" component={SubjectScreen} />
                <Screen name="PerformanceScreen" component={PerformanceScreen} />
                <Screen name="SettingScreen" component={SettingScreen} />
                <Screen name="AddScreen" component={AddScreen} />
                <Screen name="EditScreen" component={EditScreen} />
                <Screen name="AddSubjectScreen" component={AddSubjectScreen} />
                <Screen name="EditSubjectScreen" component={EditSubjectScreen} />
                <Screen name="AllReviewsScreen" component={AllReviewsScreen} />
            </Navigator>
        </NavigationContainer>
    );
}

export default AppRoutes;