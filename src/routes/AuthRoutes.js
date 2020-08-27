import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DecisionScreen from '../screens/DecisionScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const { Navigator, Screen } = createStackNavigator();

const AuthRoutes = () => {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }} mode= 'card'>
                <Screen name="Decision" component={DecisionScreen} />
                <Screen name="SignIn" component={SignInScreen} />
                <Screen name="SignUp" component={SignUpScreen} />
            </Navigator>
        </NavigationContainer>
    )
}

export default AuthRoutes;