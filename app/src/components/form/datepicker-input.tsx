import dayjs from 'dayjs';
import { Platform, Pressable, View } from 'react-native';
import { TextInput } from './text-input';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { useState } from 'react';
import { theme } from '../../global/theme';
import { Text } from '../ui/Typography/Text';

export interface DatePickerProps {
  label: string
  value?: Date
  onChange?: (date: Date) => void
  mode: 'date' | 'time'
  error?: string
}

const config = {
  ios: {
    date: {
      display: 'inline'
    },
    time: {
      display: 'spinner'
    }
  },
  android: {
    date: {
      display: 'inline'
    },
    time: {
      display: 'default'
    }
  }
} as const

export function DatePickerInput ({ label, value, mode, onChange, error}: DatePickerProps) {
  const [visible, setVisible] = useState(false)
  
  const platform = config[Platform.OS as 'ios' | 'android'][mode]

  const formattedDate = value
    ? dayjs(value).format(mode === 'date' ? 'DD/MM/YYYY' : 'HH:mm')
    : '';

  const handleConfirm = (date: Date) => {
    setVisible(false)
    onChange(date)
  }

  return (
    <View>
      <Pressable 
        onPress={() => setVisible(true)}
      >   
        <TextInput
          pointerEvents='none'
          label={label}
          value={formattedDate}
          caretHidden
          showSoftInputOnFocus={false}
        />
        {error && 
          <Text size={"sm"} color="red.dark">
            {error}
          </Text>
        }
      </Pressable>

      <DateTimePicker
        locale='pt_BR'
        isVisible={visible}
        mode={mode}
        date={value}
        isDarkModeEnabled={false}
        display={platform.display}
        themeVariant='light'
        accentColor={theme.colors.green.dark}
        confirmTextIOS='Confirmar'
        cancelTextIOS='Cancelar'
        onConfirm={handleConfirm}
        onCancel={() => setVisible(false)}
         modalStyleIOS={{ paddingBottom: 18 }}
        pickerComponentStyleIOS={{ paddingBottom: 6 }}
      />
    </View>
  )
}