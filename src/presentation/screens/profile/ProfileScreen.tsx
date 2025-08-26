import React from 'react'
import { Text, View } from 'react-native'
import { globalStyles } from '../../theme/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PrimaryButton } from '../../components/shared/PrimaryButton'
import { DrawerActions, useNavigation } from '@react-navigation/native'

export const ProfileScreen = () => {

    const { top } = useSafeAreaInsets();
    const navigation = useNavigation();
    console.log(top);

    return (
        <View style={globalStyles.container}>
            <Text>Profile Screen</Text>
            <PrimaryButton
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
                label='Menu'
            />
        </View>
    )
}
