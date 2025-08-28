import React from 'react'
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { globalColors } from '../../theme/theme';


interface CustomInputProps {
    label: string;
    placeholder?: string;
    variant?: 'filled' | 'outlined';
    secureTextEntry?:boolean;
    // value: string;
    // onChangeText: (text: string) => void;

}

export const CustomInput = ({
    label, placeholder, variant = 'outlined',
    secureTextEntry = false
    
}: CustomInputProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label} </Text>
            <TextInput
                style={[styles.input,
                variant === 'filled' ? styles.filled : styles.outlined
                ]}
                placeholder={placeholder}
                secureTextEntry = {secureTextEntry}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 8
    },
    label: {
        fontSize: 14,
        color: globalColors.primary,
        marginBottom: 6,
        fontWeight:'bold',
        textAlign: 'left'
    },
    input: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8,
        fontSize: 16
    },
    filled: {
        backgroundColor: globalColors.primary,
        color: "#fff",
    },
    outlined: {
        borderWidth: 1,
        borderColor: globalColors.primary,
        backgroundColor: 'transparent',
        color: globalColors.dark
    }
})