import { DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { CustomIonicons } from './Custom_Ionicons';
import { RootStackParams } from '../../routes/StackNavigator';
import { ButtonIcon } from './ButtonIcon';
import { globalColors } from '../../theme/theme';

export const HamburgerMenu = () => {

    const navigation = useNavigation();


    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View>
                    <Pressable
                        style={{ marginLeft: 15 }}
                        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}>
                        <CustomIonicons
                            name="menu-outline"
                            size={30}
                        />
                    </Pressable>
                    <HeaderLeftOptions />
                </View>
            )
        })
    }, []);

    return <></>
}



export const HeaderLeftOptions = () => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.header}>
                    <View style={styles.iconsContainer}>
                        <Pressable style={styles.headerOption} onPress={() => { /* TODO: handle notifications press */ }}>
                            <CustomIonicons
                                name={"notifications-outline"}
                                color={globalColors.dark}
                                size={25}
                            />
                        </Pressable>
                    </View>
                </View>
            ),
        });
    }, []);
    return <></>;
};

const styles = StyleSheet.create({
    headerOption: {
        position: "relative",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 30,
        gap: 5,
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});