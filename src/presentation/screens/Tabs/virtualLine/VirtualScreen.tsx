import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { globalStyles } from '../../../theme/theme';
import { HamburgerMenu } from '../../../components/shared/HamburgerMenu';
import { ThemeContext } from '../../../../../context/ThemeContext';

export const VirtualScreen = () => {

    const {colors} = useContext(ThemeContext);
    const styles = globalStyles(colors);

    return (
        <View style={styles.container}>
            <HamburgerMenu />
            <Text>virtual line</Text>
        </View>
    )
}
 