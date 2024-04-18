import {Appearance, ColorSchemeName } from 'react-native';

export type AppColorScheme = 'light' | 'dark'
export type ThemePreference = AppColorScheme | 'system';

export function onChangeThemePreference(themePreference: ThemePreference): AppColorScheme {
  if(themePreference === 'system') {
    const colorScheme = Appearance.getColorScheme()
    return colorScheme ? colorScheme : 'light'
  }

  return themePreference
} 

export function onSystemChange(
  color: ColorSchemeName,
  themePreference: ThemePreference,
): AppColorScheme | null {
  if (themePreference === 'system') {
    return color ? color : 'light';
  }
  return null;
}