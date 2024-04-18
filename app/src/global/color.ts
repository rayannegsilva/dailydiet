export const palette = {
  white: '#fff',
  red: {
    light: '#F4E6E7',
    mid: '#F3BABD',
    dark: '#BF3B44',
  },

  green: {
    light: '#E5F0DB',
    mid: '#CBE4B4',
    dark: '#639339',
  },

  gray: {
    '100': '#1B1D1E',
    '200': '#333638',
    '300': '#5C6265',
    '400': '#B9BBBC',
    '500': '#DDDEDF',
    '600': '#EFF0F0',
    '700': '#FAFAFA',
  },
}

const lightTheme = {
  ...palette,
  background: palette.gray[700],

  
}

const darkTheme: typeof lightTheme = {
  ...palette,
  background: palette.gray[100]
}

export const colors = {
  palette, lightTheme, darkTheme
}