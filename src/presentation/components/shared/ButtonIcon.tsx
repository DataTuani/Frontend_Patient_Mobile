import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import { CustomIonicons } from './Custom_Ionicons'
import { globalColors } from '../../theme/theme'
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';


// interface PropsSetting {
//     title: string;
//     icon: string;
//     onPress: () => void;
//     isActive: boolean;
// }

// export const ButtonIcon = ({
//     title,
//     icon,
//     onPress,
//     isActive,

// }: PropsSetting) => {
//     return (

//         <TouchableOpacity
//             style={styles.settingButton}
//             onPress={() => { onPress }}>
//             <View style={styles.titleContainer}>
//                 <CustomIonicons
//                     name={icon}
//                     size={20}
//                     color={globalColors.light}
//                 />
//                 <Text style={styles.title}>{title}</Text>
//             </View>
//             <CustomIonicons
//                 name={isActive ? 'checkmark-circle-outline'
//                     : 'ellipse-outline'}
//                 size={20}
//                 color={isActive ? globalColors.success : globalColors.danger}
//             />
//         </TouchableOpacity>
//     )
// };

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
    isActivate = false,
    colors
}: PropsButton) => {
    return (

        <Pressable
            style={[styles.settingButton, { backgroundColor: isActivate ? colors : globalColors.light }]}
            onPress={() => { onPress }}
        >
            <View style={styles.titleContainer}>
                <MaterialIcons name={icon} size={50} color={isActivate ? 'white' : colors} />
                <Text style={{ textAlign: 'center', color: isActivate ? 'white' : globalColors.dark }}>{title}</Text>
            </View>
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
