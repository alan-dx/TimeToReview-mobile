import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DecisionScreen from '../screens/DecisionScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import Header from '../components/Header';

const { Navigator, Screen } = createStackNavigator();

const AuthRoutes = () => {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false}} mode='card'>
                <Screen 
                    name="Decision" 
                    options={{headerShown: false}} 
                    component={DecisionScreen} 
                />
                <Screen 
                    name="SignIn" 
                    options={{headerShown: true, header: () => <Header title="LOGIN" color="#FFF" />}} 
                    component={SignInScreen} 
                />
                <Screen 
                    name="SignUp" 
                    options={{headerShown: true, header: () => <Header title="CADASTRO" color="#FFF" />}} 
                    component={SignUpScreen} 
                />
            </Navigator>
        </NavigationContainer>
    )
}

export default AuthRoutes;