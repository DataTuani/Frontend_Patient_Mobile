import { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet, Text, View } from 'react-native';
import { globalColors } from '../../theme/theme';

interface DropdownProps {
  title: string;
  items: { label: string; value: string }[];
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
  placeholder?: string;
}

export const CustomDropdown = ({
  title,
  items,
  value,
  setValue,
  placeholder = 'Seleccione...',
}: DropdownProps) => {

  const [open, setOpen] = useState(false);
  const [localItems, setLocalItems] = useState(items);


  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={localItems}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setLocalItems}
        placeholder={placeholder}
        style={styles.DropDownStyles}
      />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginVertical: 8
  },
  label: {
    fontSize: 14,
    color: globalColors.primary,
    marginBottom: 6,
    fontWeight: 'bold',
    textAlign: 'left'
  },

  DropDownStyles: {
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    borderColor: '#fff'
  }
})