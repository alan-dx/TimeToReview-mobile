import React from 'react';
import {Text, StatusBar} from 'react-native';

import AppStack from './src/routes/AppStack';

const App = () => {
  return (
    <>
      <AppStack />
      <StatusBar style='light' />
    </>
  )
}

export default App;