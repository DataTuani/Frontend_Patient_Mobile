import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { globalStyles } from '../../theme/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PrimaryButton } from '../../components/shared/PrimaryButton'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { ThemeContext } from '../../../../context/ThemeContext'

export const ProfileScreen = () => {

    const { top } = useSafeAreaInsets();
    const navigation = useNavigation();
    console.log(top);
    const  {colors} = useContext(ThemeContext);
    const styles = globalStyles(colors);

    return (
        <View style={styles.container
            
        }>
            <Text>Profile Screen</Text>
            <PrimaryButton
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
                label='Menu'
            />
        </View>
    )
}
