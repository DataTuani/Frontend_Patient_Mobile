import React from 'react'
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { globalColors } from '../../theme/theme';


interface CustomInputProps {
    label: string;
    placeholder?: string;
    variant?: 'filled' | 'outlined';
    secureTextEntry?: boolean;
    value: string;
    onChangeText: (text: string) => void;
}

export const CustomInput = ({
    label, placeholder, variant = 'outlined',
    secureTextEntry = false,
    value,
    onChangeText

}: CustomInputProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label} </Text>
            <TextInput
                style={[styles.input,
                variant === 'filled' ? styles.filled : styles.outlined
                ]}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={onChangeText}
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
        fontWeight: 'bold',
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

interface CustomInputRegisterProps {
    label: string;
    placeholder?: string;
    secureTextEntry?: boolean
    value: string;
    onChangeText: (text: string) => void;
}

export const CustomInputRegister = ({
    label,
    placeholder,
    secureTextEntry = false,
    value,
    onChangeText

}: CustomInputRegisterProps) => {
    return (
        <View style={stylesR.container}>
            <Text style={stylesR.label}>{label} </Text>
            <TextInput style={stylesR.input}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={onChangeText}
            >
            </TextInput>

        </View>
    )
}


const stylesR = StyleSheet.create({
    container: {
        width: '90%',
        marginVertical: 5,
    },
    label: {
        fontSize: 14,
        color: globalColors.primary,
        marginBottom: 6,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 12,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: 'white',
        elevation: 10,
        borderColor: globalColors.light

    }
})
