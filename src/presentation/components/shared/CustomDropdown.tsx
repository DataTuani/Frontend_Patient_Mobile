
import DropDownPicker from 'react-native-dropdown-picker';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { globalColors } from '../../theme/theme';
import React, { useState } from 'react';

import { Ionicons } from '@expo/vector-icons';

interface Option {
  label: string;
  value: string;
  color?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}


interface CustomRadioButtonProps {
  title: string;
  options: Option[];
  value: string | null;
  setValue: (value: string) => void;
}


export const CustomRadioButton = ({
  title,
  options,
  value,
  setValue
}: CustomRadioButtonProps) => {


  return (
    <View style={{ marginVertical: 10, marginRight: 75 }}>
      <Text style={{ fontSize: 14, marginBottom: 5, fontWeight: '400' }}>{title}</Text>
      <View style={{ flexDirection: "row", alignItems: 'center' }}>
        {options.map((e) => {
          const selected = value === e.value;
          return (
            <Pressable
              key={e.value}
              style={styleBox.option}
              onPress={() => setValue(e.value)}
            >
              <Ionicons
                name={e.icon || 'person-circle'}
                size={20}
                color={selected ? e.color || '#007AFF' : '#999'}
              />
              <View style={[
                styleBox.radio,
                { borderColor: e.color || '#007AFF' },
                selected && {
                  backgroundColor: e.color || "#007AFF"
                },
              ]} />
              <Text style={{ fontSize: 15 }}>{e.label}</Text>
            </Pressable>
          )
        })}
      </View>
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
        dropDownDirection="TOP"
        badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#2a9d8f", "#1d3557"]}
      />
    </View>
  )
}


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
    <View style={[styles.container, { zIndex: 2000 }]}>
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
        dropDownDirection='TOP'
      />
    </View>

  )
}




const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginVertical: 8,

  },
  label: {
    fontSize: 14,
    color: globalColors.dark,
    marginBottom: 6,
    fontWeight: '400',
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

const styleBox = StyleSheet.create({

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },

  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    marginHorizontal: 6
  }

})