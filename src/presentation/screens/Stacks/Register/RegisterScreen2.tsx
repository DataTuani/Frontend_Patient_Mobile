import React, { useContext } from 'react'
import { View, StyleSheet, Text, Image, Dimensions, } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { globalColors, globalStyles, } from '../../../theme/theme';
import { PrimaryButton } from '../../../components/shared/PrimaryButton';
import { RootStackParams } from '../../../routes/StackNavigator';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { CustomInputRegister } from '../../../components/shared/CustomInput';
import { RegisterStepper } from '../../../components/shared/RegisterStepper';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRegisterStore } from '../../../../hooks/useRegisterStore';

const height = Dimensions.get('window').height;

export const RegisterScreen2 = () => {

  const navigator = useNavigation<NavigationProp<RootStackParams>>();
  
  const { colors } = useContext(ThemeContext);
  const styles = globalStyles(colors);
  const { updateFormData } = useRegisterStore();

  const RegisterSchema = Yup.object().shape({
    direccion: Yup.string().required('Direccion requerido'),
    telefono: Yup.string().min(8, 'Mínimo 8 caracteres').required('Telefono requerido'),
    cedula: Yup.string().min(16, 'Mínimo 16 caracteres').required('Cedula requerida'),
  })


  return (

    <Formik
      initialValues={{
        direccion: '',
        telefono: '',
        cedula: ''
      }}
      validationSchema={RegisterSchema}
      onSubmit={(values) => {
        updateFormData({
          direccion: values.direccion,
          telefono: values.telefono,
          cedula: values.cedula
        });
        navigator.navigate('Register3');
        console.log(values);
      }}
    >
      {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
        <View style={[styles.ContainerRe]}>

          <Text style={style.title}>Registrar</Text>
          <RegisterStepper currentStep={2} />
          <View style={style.card}>
            <View style={{ width: '90%' }}>
              <Text style={style.titleInfo}>Informacion Personal 2</Text>
            </View>
            <CustomInputRegister
              label='Direccion'
              placeholder='Ingresa tu direccion completa'
              value={values.direccion}
              onChangeText={handleChange('direccion')}
            />
            {touched.direccion && errors.direccion && (
              <Text style={{ color: 'red' }}>{errors.direccion}</Text>
            )}
            <CustomInputRegister
              label='Teléfono'
              placeholder='Digite numero de telefono'
              value={values.telefono}
              onChangeText={handleChange('telefono')}
            />
            {touched.telefono && errors.telefono && (
              <Text style={{ color: 'red' }}>{errors.telefono}</Text>
            )}
            <CustomInputRegister
              label='Cedula'
              placeholder='Numero de cedula'
              value={values.cedula}
              onChangeText={handleChange('cedula')}
            />
            {touched.cedula && errors.cedula && (
              <Text style={{ color: 'red' }}>{errors.cedula}</Text>
            )}
            <PrimaryButton
              onPress={() => handleSubmit()}
              label={isSubmitting ? 'Cargando...' : 'Siguiente'}
            />
            <View style={{ alignItems: 'center' }}>
              <Text style={{ marginTop: 60, fontSize: 16, color: colors.primary }}>¿Ya tienes una cuenta? {''}
                <Text style={{ fontWeight: 'bold', color: colors.secondary }}
                  onPress={() => navigator.navigate('Login')}
                >Inicia Sesion</Text>
              </Text>
            </View>
          </View>
        </View>
      )}
    </Formik>
  )
}

const style = StyleSheet.create({
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#003E6D'
  },
  titleInfo: {
    fontWeight: '600',
    textAlign: 'left',
    fontSize: 17,
    marginVertical: 7,
    color: globalColors.primary
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center'
  },
}
)