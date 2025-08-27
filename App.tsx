import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SideMenu } from './src/presentation/routes/SideMenuNavigator';
import ThemeProvider, { ThemeContext } from './context/ThemeContext';
import { globalColors } from './src/presentation/theme/theme';

export default function App() {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({currentTheme }) => (
          <NavigationContainer
            theme={currentTheme === 'light' ? DefaultTheme : DarkTheme}
          >
            <SideMenu />
          </NavigationContainer>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>


  );
}

