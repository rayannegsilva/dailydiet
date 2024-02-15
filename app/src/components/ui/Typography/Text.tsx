import { Path, getByPath } from 'dot-path-value';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { Theme, theme } from '../../../global/theme';

export type TextProps = RNTextProps & {
  size?: keyof Theme['fontSizes'] | Theme['fontSizes'][keyof Theme['fontSizes']];
  weight?: 'regular' | 'bold';
  color?: Exclude<Path<Theme['colors']>, 'red' | 'green' | 'gray'> | (string & {});
}

export function Text({ weight="regular", size="md", color, style, ...rest }: TextProps) {
  return (
    <RNText
      style={[
        styles.base,
        weight && styles[weight],
        color && {color: getByPath(theme.colors, color as any) ?? color },
        {fontSize: typeof size === 'number' ? size : theme.fontSizes[size]},
        style
      ]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  base: {
    color: theme.colors.gray[200]
  },
  regular: {
    fontFamily: theme.fonts.regular,
  },
  bold: {
    fontFamily: theme.fonts.bold,
  },
})