import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import AppRoute from './src/routes/AppRoute';
import {Provider as PaperProvider} from 'react-native-paper/';
import Material from 'react-native-vector-icons/MaterialIcons'
const App = () => {
  return (
    <PaperProvider settings={{icon: props => <Material {...props}/>}}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar />
        <AppRoute />
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;
