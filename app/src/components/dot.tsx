import { View } from "react-native";

interface DotProps {
  color: string
  size: number
}

export function Dot({ color, size }: DotProps) {
  return (
    <View 
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        borderRadius: size / 2
      }}
    />
  )
}