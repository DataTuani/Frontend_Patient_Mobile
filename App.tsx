import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SideMenu } from './src/presentation/routes/SideMenuNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <SideMenu />
    </NavigationContainer>
  );
}

