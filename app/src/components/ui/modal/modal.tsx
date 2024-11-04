import { useState } from 'react';
import { Modal as RNModal, ModalProps as RNModalProps, StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import { theme } from '../../../global/theme';
import { Text } from '../Typography/Text';
import { Button } from '../buttons';

interface ModalProps extends RNModalProps {
  onExcluded: () => void
  onGoOut: () => void
  closeModal: () => void;
}

export function Modal({ onExcluded, onGoOut, closeModal, ...rest}: ModalProps) {
  return (
    <RNModal
      animationType='slide'
      statusBarTranslucent
      transparent={true}
      {...rest}
      >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <View style={styles.content}>
              <Text size='sm' weight='bold'>Deseja realmente excluir o registro da refeição?</Text>
              <View style={styles.wrapped}>
                <Button 
                  variant='outlined'
                  title='Cancelar'
                  onPress={onGoOut}
                />
                <Button 
                  onPress={onExcluded}
                  title='Sim, excluir'
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: theme.colors.overlay
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: '100%'
  },
  content: {
    padding: 32,
    borderRadius: 8,
    backgroundColor: theme.colors.white,
    gap: 32
  },
  wrapped: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
  }
})