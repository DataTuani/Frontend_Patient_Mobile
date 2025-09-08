import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { type RootStackParams } from '../../routes/StackNavigator';
import { Header, } from '../../components/shared/HamburgerMenu';
import { useContext } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';
import { globalColors, globalStyles } from '../../theme/theme';

export const HomeScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { colors } = useContext(ThemeContext);
    const styles = globalStyles(colors);

    return (
        <View style={styles.container}>
            <Header />
            <View style={{ marginTop: 20 }}>
                <Text style={[style.TextStyle, { color: '#042558' }]}>Bienvenido a SINAES</Text>
                <Text style={{ color: '042558' }}>En SIANES pensamos en tí y en tu familia.</Text>
            </View>
            <TouchableOpacity style={style.cardAgendar}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={style.circlePlus}>
                        <Text style={style.plus}>+</Text>
                    </View>
                    <View style={{ marginLeft: 12 }}>
                        <Text style={style.cardTitle}>Agendar consulta</Text>
                        <Text style={style.cardSubtitle}>Agenda una consulta médica.</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={style.row}>
                {/* Medicamentos */}
                <View >
                    <View>
                        <Text>Pendientes</Text>
                    </View>

                    <Text>MedicamentosPendientes</Text>
                    <Text>Mis medicamentos</Text>
                    <Text>Medicamentos para hoy</Text>
                </View>

                {/* Teleconsultas */}

                <View>

                </View>
            </View>
        </View >
    )
}

const style = StyleSheet.create({
    TextStyle: {
        fontSize: 45,
        fontWeight: 'bold'
    },
    cardAgendar: {
        backgroundColor: globalColors.light,
        borderRadius: 12,
        padding: 18,
        marginTop: 20,
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 2, height: 2
        },
        shadowRadius: 0,
        elevation: 5
    },
    circlePlus: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#E91E63',
        justifyContent: 'center',
        alignItems: 'center',

    },
    plus: {
        fontWeight: "bold",
        fontSize: 24,
        color: '#fff'
    },
    cardTitle: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: 'center'
    },
    cardSubtitle: {
        fontSize: 12,
        textAlign: 'center',
        color: globalColors.gray,
        marginTop: 4
    },
    row: {
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:20
    },

})