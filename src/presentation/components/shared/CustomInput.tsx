import React from 'react'
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { globalColors } from '../../theme/theme';


//Input de login
interface CustomInputProps {
    label: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    value: string;
    onChangeText: (text: string) => void;
}

export const CustomInput = ({
    label, placeholder,
    secureTextEntry,
    value,
    onChangeText,

}: CustomInputProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label} </Text>

            <TextInput
                style={[styles.input,
                styles.outlined
                ]}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={onChangeText}
            />

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        width: '85%',
        marginVertical: 8
    },
    label: {
        fontSize: 14,
        color: globalColors.dark,
        marginBottom: 6,
        fontWeight: '400',
        textAlign: 'left'
    },

    input: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8,
        fontSize: 16,
    },
    outlined: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'transparent',
        color: globalColors.dark,

    }
})

//Input de registros
interface CustomInputRegisterProps {
    label: string;
    placeholder?: string;
    secureTextEntry?: boolean
    value: string;
    onChangeText: (text: string) => void;
    style?: {}
    style2?: {}
}

export const CustomInputRegister = ({
    label,
    placeholder,
    secureTextEntry = false,
    value,
    onChangeText,
    style = {},
    style2 = {}

}: CustomInputRegisterProps) => {
    return (
        <View style={stylesR.container}>
            <Text style={[stylesR.label, style2]}>{label} </Text>
            <TextInput style={[stylesR.input, style]}
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
        color: globalColors.dark,
        marginBottom: 6,
        fontWeight: '400',
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

//Input de contraseña

interface CustomInputPropsP {
    label: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    value: string;
    onChangeText: (text: string) => void;
    rightIcon?: React.ReactNode;
    style?: {}
}

export const CustomInputPas = ({
    label,
    placeholder,
    secureTextEntry,
    value,
    onChangeText,
    rightIcon,
    style
}: CustomInputPropsP) => {
    return (
        <View style={stylesPass.container}>
            <Text style={stylesPass.label}>{label}</Text>
            <View style={stylesPass.inputWrapper}>
                <TextInput
                    style={[stylesPass.input, style]}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    value={value}
                    onChangeText={onChangeText}
                />
                {rightIcon && <View style={stylesPass.iconContainer}>{rightIcon}</View>}
            </View>
        </View>
    );
};


const stylesPass = StyleSheet.create({
    container: {
        width: '85%'
    },
    label: {
        marginBottom: 5,
        fontSize: 14,
        color: "#333",
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,

    },
    input: {
        flex: 1,
        paddingVertical: 12,

    },
    iconContainer: {
        paddingHorizontal: 5,
    },
})