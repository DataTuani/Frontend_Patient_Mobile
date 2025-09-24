import React from 'react'
import { Ionicons,  MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';
import { View } from 'react-native';


interface Props {
  name: string;
  size?: number;
  color?: string;
  style?:{}
}

export const CustomIonicons = ({ name, size = 20, color, style={} }: Props) => {

  const { currentTheme, toggleTheme } = useContext(ThemeContext);
  const themeColor = currentTheme === 'light' ? 'black' : 'white';

  return (
    <Ionicons name={name} size={size} color={color ?? themeColor} style={style}/>
  )
}

export const CustomFontIcon = ({ name, size = 20, color, style={} }: Props) => {

  const { currentTheme, toggleTheme } = useContext(ThemeContext);
  const themeColor = currentTheme === 'light' ? 'black' : 'white';

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MaterialCommunityIcons name={name} size={size} color={color} style={style} />
    </View>
  )
}
