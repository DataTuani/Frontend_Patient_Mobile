import { Ionicons } from '@expo/vector-icons';

interface Props {
  name: string;
  size?: number;
  color?: string;
}

export const CustomIonicons = ({ name, size = 20, color = 'black' }: Props) => {
  return (
    <Ionicons name={name} size={size} color={color} />
  )
}
