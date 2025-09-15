import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';

interface Props {
  name: string;
  size?: number;
  color?: string;
}

export const CustomIonicons = ({ name, size = 20, color  }: Props) => {

  const { currentTheme, toggleTheme } = useContext(ThemeContext);
  const themeColor = currentTheme === 'light' ? 'black' : 'white';

  return (
    <Ionicons name={name} size={size} color={color ?? themeColor} />
  )
}
