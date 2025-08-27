import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { Pressable, Text } from 'react-native';
import { CustomIonicons } from './Custom_Ionicons';

export const HamburgerMenu = () => {

    const navigation = useNavigation();


    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Pressable
                    style={{ marginLeft: 15 }}
                    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}>
                    <CustomIonicons
                        name="menu-outline"
                        size={30}
                    />
                </Pressable>

)
        })
    }, []);

    return <></>
}
