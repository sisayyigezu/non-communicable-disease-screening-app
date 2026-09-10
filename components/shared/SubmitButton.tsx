import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type SubmitButtonProps = {
  onPress: () => void;
  title: string;
  disabled?: boolean;
};

export const SubmitButton = ({ onPress, title, disabled }: SubmitButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={[styles.button, disabled && styles.disabled]}
  >
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#137fec',
    flexDirection: 'row',
    paddingVertical: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    shadowColor: '#137fec',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 32,
  },
  disabled: { backgroundColor: '#94a3b8' },
  text: { fontSize: 20, fontWeight: '700', color: '#fff' },
});