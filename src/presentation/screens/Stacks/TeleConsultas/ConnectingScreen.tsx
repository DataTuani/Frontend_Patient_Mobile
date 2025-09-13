import { NavigationProp,  useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react'
import { SafeAreaView, Text, Image, Dimensions, StyleSheet } from 'react-native'
import { RootStackParams } from '../../../routes/StackNavigator';
import { globalColors } from '../../../theme/theme';


export const ConnectingScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    // const styles = globalStyles(colors);

    const { height } = Dimensions.get('window');


    return (
        <SafeAreaView style={styles.container}>

            <Image
                source={require('../../../assets/Camara.png')}
                style={[{ marginTop: height * 0.03, width: 140, height: 140 }]}
                resizeMode="contain"
            />
            <Text style={{ fontSize: 30, fontWeight: '700', marginTop: 15, color: '#003E6D' }}>Conectando</Text>
            <Text style={{ fontSize: 20, marginTop: 5, textAlign: 'center' }}>Por favor espera mientras se conecta</Text>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        paddingHorizontal:24,
        paddingBottom:24,
        backgroundColor:globalColors.light
    }
})