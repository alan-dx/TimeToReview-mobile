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
import BePremiumScreen from '../screens/BePremiumScreen';
import UpdatesScreen from '../screens/UpdatesScreen';
import DoubtsScreen from '../screens/DoubtsScreen';

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
                <Screen 
                    name="ReviewsScreen" 
                    component={ReviewsScreen}
                    options={({ navigation, route }) => ({
                        headerShown: true,
                        header: () => <Header route={route} navigation={navigation} title="REVISÕES" color="#F5F5F5" />
                      })}
                    // options={{
                    //     headerShown: true,
                    //     header: () => <Header title="REVISÕES" color="#F5F5F5" />
                    // }}
                
                />
                <Screen 
                    name="RoutineScreen" 
                    component={RoutineScreen} 
                    options={{
                        headerShown: true,
                        header: () => <Header title="ROTINAS" color="#F5F5F5" />
                    }} 
                />
                <Screen 
                    name="SubjectScreen" 
                    component={SubjectScreen} 
                    options={{
                        headerShown: true,
                        header: () => <Header title="MATÉRIAS" color="#F5F5F5" />
                    }} 
                />
                <Screen 
                    name="PerformanceScreen" 
                    component={PerformanceScreen}
                    options={{
                        headerShown: true,
                        header: () => <Header title="DESEMPENHO" color="#F5F5F5" />
                    }} 
                />
                <Screen 
                    name="SettingScreen" 
                    component={SettingScreen}
                    options={{
                        headerShown: true,
                        header: () => <Header title="CONFIGURAÇÕES" color="#F5F5F5" />
                    }} 
                />
                <Screen 
                    name="UpdatesScreen" 
                    component={UpdatesScreen}
                    options={{
                        headerShown: true,
                        header: () => <Header title="ATUALIZAÇÕES" color="#F5F5F5" />
                    }}
                />
                <Screen 
                    name="DoubtsScreen" 
                    component={DoubtsScreen}
                    options={{
                        headerShown: true,
                        header: () => <Header title="TIRA DÚVIDAS" color="#F5F5F5" />
                    }}
                />
                <Screen 
                    name="BePremiumScreen" 
                    component={BePremiumScreen}
                    options={{
                        headerShown: true,
                        header: () => <Header title="SEJA PREMIUM" color="#F5F5F5" />
                    }} 
                />
                <Screen 
                    name="AddScreen" 
                    component={AddScreen} 
                />
                <Screen 
                    name="EditScreen" 
                    component={EditScreen} 
                />
                <Screen 
                    name="AddSubjectScreen" 
                    component={AddSubjectScreen} 
                />
                <Screen 
                    name="EditSubjectScreen" 
                    component={EditSubjectScreen}
                />
                <Screen 
                    name="AllReviewsScreen" 
                    component={AllReviewsScreen}
                    options={{
                        headerShown: true,
                        header: () => <Header title="TODAS REVISÕES" color="#F5F5F5" />
                    }} 
                />
            </Navigator>
        </NavigationContainer>
    );
}

export default AppRoutes;