import React from 'react'
import { Text, View } from 'react-native'
import { globalStyles } from '../../../theme/theme';
import { HamburgerMenu } from '../../../components/shared/HamburgerMenu';

export const VirtualScreen = () => {
    return (
        <View style={globalStyles.container}>
            <HamburgerMenu />
            <Text>virtual line</Text>
        </View>
    )
}
