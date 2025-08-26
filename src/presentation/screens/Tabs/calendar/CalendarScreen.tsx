import {  Text, View } from 'react-native'
import { globalStyles } from '../../../theme/theme'
import { HamburgerMenu } from '../../../components/shared/HamburgerMenu';

export const CalendarScreen = () => {




  return (
    <View style={globalStyles.container}>
      <HamburgerMenu />
      <Text> CalendarScreen</Text>
    </View>
  )
}
