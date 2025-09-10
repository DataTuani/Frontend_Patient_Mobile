import { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet, Text, View } from 'react-native';
import { globalColors } from '../../theme/theme';


interface DropdownProps {
  title: string;
  items: { label: string; value: string }[];
  value: string | number;
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


interface DropdownPropsN {
  title: string;
  items: { label: string; value: number }[];
  value: number;
  setValue: (val: number | ((prev: number) => number)) => void;
  placeholder?: string;
}

export const CustomDropdownNumber = ({
  title,
  items,
  value,
  setValue,
  placeholder = 'Seleccione...',
}: DropdownPropsN) => {
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
  );
};

/*Dropdown items */

interface DropdownPropsItems {
  title: string;
  items: { label: string; value: string }[];
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
  placeholder?: string;
  multiple?: boolean
}


export const CustomDropdownItems = ({
  title,
  items,
  value,
  setValue,
  placeholder = 'Seleccione...',

}: DropdownPropsItems) => {

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

        mode='BADGE'
        multiple={true}
        min={0}
        max={items.length}

        badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#2a9d8f", "#1d3557"]}
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