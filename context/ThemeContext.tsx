import React, { createContext, ReactNode, useState } from 'react';
import { themeColors } from '../src/presentation/theme/themeColors';

export type ThemeContextType = {
    currentTheme: 'light' | 'dark';
    colors: typeof themeColors.light,
    toggleTheme: (newTheme: 'light' | 'dark') => void;
}

export const ThemeContext = React.createContext<ThemeContextType>({
    currentTheme: 'light',
    colors: themeColors.light,
    toggleTheme: () => { } 
});

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const toggleTheme = (newTheme: 'light' | 'dark') => {
        setTheme(newTheme);
    }

    return (
        <ThemeContext.Provider value={{
            currentTheme: theme,
            colors: themeColors[theme],
            toggleTheme
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;