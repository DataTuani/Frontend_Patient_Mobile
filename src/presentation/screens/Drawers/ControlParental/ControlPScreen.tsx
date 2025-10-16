import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, Pressable, TextInput, Image } from 'react-native';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../routes/StackNavigator';
import { globalStyles, globalColors } from '../../../theme/theme';
import { ButtonCitas } from '../../../components/shared/PrimaryButton';


export const ControlPScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const { colors } = useContext(ThemeContext);
  const styles = globalStyles(colors);

  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <View style={[styles.container]}>


      <View style={stylesP.imageContainer}>
        <Image 
        source={require('../../../assets/telefono.png')}
        /> 
      </View>

      {/* Titulo */}
      <Text style={stylesP.title}>Código OTP</Text>

      <Text style={stylesP.subtitle}>Por favor, ingrése el codigo para continuar.</Text>

      {/* Inputs OTP */}
      <View style={stylesP.otpContainer}>
        {otp.map((digit, index) => ( 
          <TextInput
            key={index}
            style={stylesP.otpInput}
            value={digit}
            onChangeText={(value) => handleChange(value, index)}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </View>

      {/* Reenviar */}
      <Text style={stylesP.resendText}>
        ¿El código no fue enviado?{" "}
        <Text style={stylesP.resendLink}>REENVIAR</Text>
      </Text>

      {/* Botón */}
      <ButtonCitas
        label="Siguiente"
        onPress={() => console.log("Verificar OTP:", otp.join(""))}
        style={stylesP.button}
      />
    </View>
  );
};

const stylesP = StyleSheet.create({

  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    color: globalColors.primary,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: globalColors.gay_2,
    textAlign: "center",
    marginHorizontal: 10,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 30,
  },
  otpInput: {
    width: 50,
    height: 60,
    borderWidth: 1,
    borderColor: globalColors.gray,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    color: globalColors.dark,
  },
  resendText: {
    textAlign: "center",
    fontSize: 13,
    color: globalColors.dark,
  },
  resendLink: {
    color: globalColors.primary,
    fontWeight: "bold",
  },
  button: {
    marginTop: 30,
  },
});
