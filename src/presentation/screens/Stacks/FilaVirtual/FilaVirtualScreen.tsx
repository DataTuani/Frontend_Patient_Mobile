import React, { useContext } from 'react'
import { View, Text , StyleSheet} from 'react-native'
import { ThemeContext } from '../../../../../context/ThemeContext';
import { globalStyles } from '../../../theme/theme';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../routes/StackNavigator';
import { ContainerCard } from '../../../components/shared/CustomCard';
import { PrimaryButton } from '../../../components/shared/PrimaryButton';

export const FilaVirtualScreen = () => {

    const { colors } = useContext(ThemeContext)
    const styles = globalStyles(colors);
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    return (
        <View style={styles.container}>
            <ContainerCard
                number={5}
                min={4}
                person_number={2}
                nameDoctor={'Leon Kennedy'}
                especialidad={'Rompe viejas'}
                hospital={'Aleman'}
                progress={0.8}
            />
            
                <PrimaryButton
                style={styleFila.button}
                    onPress={() => navigation.goBack()}
                    label={'Salir de esta fila'}
                />
        


        </View>
    )
}

const styleFila = StyleSheet.create({
    button:{
        alignSelf:'center'
    }
    
})
