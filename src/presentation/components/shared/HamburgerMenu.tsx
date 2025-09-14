import { DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { Pressable, Image, StyleSheet, View, Text } from 'react-native';
import { CustomIonicons } from './Custom_Ionicons';
import { RootStackParams } from '../../routes/StackNavigator';
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
                </View>
            )
        })
    }, []);

    return <></>
}

export const Header = () => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={styles.logoContainer}>
                    <Image
                        style={{ width: 60, height: 60, resizeMode: "contain", marginLeft: 15 }}
                        source={require('../../assets/sinaes-logo.png')}
                    />
                    <Image
                        style={{ width: 140, height: 180, resizeMode: 'contain' }}
                        source={require('../../assets/sinaes.png')}
                    />
                </View>
            ),
            headerRight: () => (
                <View style={styles.header}>
                    <View style={styles.iconsContainer}>
                        <Pressable style={styles.headerOption} onPress={() => console.log("hola")}>
                            <CustomIonicons
                                name={"notifications-outline"}
                                color={globalColors.gray}
                                size={26}
                            />
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>1</Text>
                            </View>
                        </Pressable>
                    </View>
                    <View style={styles.iconsContainer}>
                        <Pressable style={styles.headerOption} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}>
                            <CustomIonicons
                                name={"person-circle-outline"}
                                color={globalColors.gray}
                                size={30}
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
    header: {
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 30,
        gap: 5,
    },
    headerOption: {
        position: "relative",
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: "red",
        borderRadius: 10,
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: "bold"

    }
});