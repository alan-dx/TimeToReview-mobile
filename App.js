import React from 'react';
import {Text, StatusBar} from 'react-native';

import AppStack from './src/routes/AppStack';
import { AuthProvider } from './src/contexts/auth';

const App = () => {
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#FCFCFC"/>
      <AppStack />
    </AuthProvider>
  )
}

export default App;