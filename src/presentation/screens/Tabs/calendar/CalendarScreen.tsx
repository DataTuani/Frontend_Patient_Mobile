import React from 'react';
import {  Text, View } from 'react-native'
import { globalStyles } from '../../../theme/theme'
import { HamburgerMenu } from '../../../components/shared/HamburgerMenu';
import { useContext } from 'react';
import { ThemeContext } from '../../../../../context/ThemeContext';

export const CalendarScreen = () => {

const  {colors} = useContext(ThemeContext);
const styles = globalStyles(colors);


  return (
    <View style={styles.container}>
      <HamburgerMenu />
      <Text> CalendarScreen</Text>
    </View>
  )
}
