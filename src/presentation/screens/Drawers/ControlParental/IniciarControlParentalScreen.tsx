import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../../../../context/ThemeContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ControlParentalStackParams } from '../../../routes/StackNavigator';
import { globalColors, globalStyles } from '../../../theme/theme';
import { View, StyleSheet, Modal, Text } from 'react-native';
import { ButtonCitas } from '../../../components/shared/PrimaryButton';

export const IniciarControlParentalScreen = () => {

    const navigation = useNavigation<NavigationProp<ControlParentalStackParams>>();
    const { colors } = useContext(ThemeContext);
    const styles = globalStyles(colors);
    const [modalVisible, setModalVisible] = useState(false);


    return (
        <View style={styles.container}>
            <ButtonCitas
                label='Conectar cuenta existente'
                onPress={() => navigation.navigate("ControlParental")}
                style={stylesP.button}
            />

            <ButtonCitas
                label='Generar codigo OTP'
                onPress={() => {
                    setModalVisible(true);
                }}
                style={stylesP.buttonSecond}
                style2={{ color: globalColors.gay_2 }}
            />

            <Modal
                visible={modalVisible}
                transparent
                animationType='slide'
                onRequestClose={() => setModalVisible(false)}
            >
                <View
                    style={stylesP.ModalStyle}
                >
                    <View style={stylesP.ModalStyleSub}>
                        <Text 
                        style={{
                            fontWeight:'bold',
                            textAlign:'center',
                            marginBottom:20
                        }}
                        >Codigo Generado</Text>
                    
                    <Text>Codigo:</Text>
                    </View>

                </View>

            </Modal>
        </View>


    );
};

const stylesP = StyleSheet.create({
    button: {
        marginTop: 50,
    },
    buttonSecond: {
        backgroundColor: globalColors.light,
        borderColor: globalColors.tertiary,
        borderWidth: 1

    },

    ModalStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"

    },
    ModalStyleSub: {
        backgroundColor: globalColors.light,
        padding: 20,
        borderRadius: 12,
        width: "85%",
        elevation: 5
    }
}); 