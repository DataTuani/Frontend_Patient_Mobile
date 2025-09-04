import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { CustomIonicons } from './Custom_Ionicons'
import { globalColors } from '../../theme/theme'


interface PropsSetting {
    title: string;  
    icon: string;
    onPress: () => void;
    isActive: boolean;
}

export const ButtonIcon = ({
    title,
    icon,
    onPress,
    isActive
}: PropsSetting) => {
    return (

        <TouchableOpacity
            style={styles.settingButton}
            onPress={() => { onPress }}>
            <View style={styles.titleContainer}>
                <CustomIonicons
                    name={icon}
                    size={20}
                    color={globalColors.light}
                />
                <Text style={styles.title}>{title}</Text>
            </View>
            <CustomIonicons
                name={isActive ? 'checkmark-circle-outline'
                    : 'ellipse-outline'}
                size={20}
                color={isActive ? globalColors.success : globalColors.danger}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    settingButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: globalColors.primary,
        padding: 20,
        borderRadius: 10,
        marginBottom: 10
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: globalColors.light
    }
})
