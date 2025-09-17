import React, { useRef } from 'react'
import { Text, StyleSheet, Pressable } from 'react-native'
import { globalColors } from '../../theme/theme'
import { MaterialIcons } from '@expo/vector-icons';


interface PropsButton {
  
    title: string;
    icon: React.ComponentProps<typeof MaterialIcons>["name"];
    colors?: string;
    onPress: () => void;
    isActivate?: boolean;
    
}

export const ButtonIcons = ({
   
    title,
    icon,
    onPress,
    colors,
    isActivate = false,

}: PropsButton) => {

    return (
        <Pressable
            onPress={() => onPress()}
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isActivate ? colors : "#f2f2f2",
                padding: 15,
                borderRadius: 10,
                marginBottom: 15,
            }}
        >
            <MaterialIcons
                name={icon}
                size={22}
                color={isActivate ? "#fff" : "#000"}
                style={{ marginRight: 10 }}
            />
            <Text
                style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: isActivate ? "#fff" : "#000",
                }}
            >
                {title}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    settingButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: globalColors.dark,
        borderRadius: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
})
