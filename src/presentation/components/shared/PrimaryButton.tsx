import React from 'react'
import { Pressable, Text, StyleSheet, View } from 'react-native'
import { globalColors, globalStyles } from '../../theme/theme'
import { useContext } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';

interface Props {
    onPress: () => void;
    label: string;
    style?: {};

}

interface ButtonProps {
    onPress: () => void;
    title: string;
    variant?: 'filled' | 'outlined';
}

export const PrimaryButton = ({ onPress, label, style = {} }: Props) => {

    const { colors } = useContext(ThemeContext);
    const styles = globalStyles(colors);

    return (
        <Pressable
            onPress={() => onPress()}
            style={[styles.primaryButtom, style]}>
            <Text style={{ color: colors.text, fontSize: 17, fontWeight: 'bold' }}>{label}</Text>
        </Pressable>
    )
}


export const ButtonLogin = ({
    title,
    onPress,
    variant = 'filled'
}: ButtonProps) => {
    return (
        <Pressable
            style={[styles.button, variant === 'outlined' ? styles.outlined : styles.filled]}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.text,
                    variant === 'outlined' ? styles.outlinedText : styles.filledText
                ]}
            >
                {title}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '70%',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop:30
    },
    filled: {
        backgroundColor: globalColors.tertiary,
    },
    outlined: {
        borderWidth: 1,
        borderColor: '#042558',
        backgroundColor: 'transparent',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    filledText: {
        color: '#fff'
    },
    outlinedText: {
        color: '042558'
    }
})


{/*Button Citas */ }

interface PropsButtonCita {
    label: string;
    onPress: () => void;
    style?: {}
}

export const ButtonCitas = ({
    label,
    onPress,
    style = {}
}: PropsButtonCita) => {
    return (
        <View style={{ marginTop: 20, width: '80%' }}>
            <Pressable
                style={[
                    { backgroundColor: globalColors.tertiary },
                    {
                        padding: 15,
                        borderRadius: 10,
                        alignItems: "center",
                        marginLeft: 70,
                    },
                    style
                ]}
                onPress={() => onPress()}
            >
                <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16, textAlign: 'center' }}>
                    {label}
                </Text>
            </Pressable>
        </View>
    )
}
