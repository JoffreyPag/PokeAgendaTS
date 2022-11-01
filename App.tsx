import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import AppRoute from './src/routes/AppRoute';

const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar/>
      <AppRoute/>
    </SafeAreaView>
  );
};

export default App;
