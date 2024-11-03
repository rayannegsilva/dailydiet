import { useState } from 'react';
import { Modal as RNModal, ModalProps as RNModalProps, StyleSheet, Alert, View } from 'react-native'
import { theme } from '../global/theme';
import { Text } from './ui/Typography/Text';

interface ModalProps extends RNModalProps {}

export function Modal(props: ModalProps ) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <RNModal
      animationType='fade'
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Messagem fechada.');
        setModalVisible(!modalVisible);
      }}
    >
      <View>
        <View>
          <Text>
            
          </Text>
        </View>
      </View>
    </RNModal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: theme.colors.gray[300]
  }
})