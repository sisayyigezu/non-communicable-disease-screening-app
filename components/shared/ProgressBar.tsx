import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ProgressBarProps = {
  progress: number;
  label?: string;
  part?: number;
  totalParts?: number;
};

export const ProgressBar = ({ progress, label, part, totalParts }: ProgressBarProps) => (
  <View style={styles.container}>
    <View style={styles.header}>
      {label && <Text style={styles.label}>{label}</Text>}
      {part && totalParts && (
        <Text style={styles.partText}>Part {part} of {totalParts}</Text>
      )}
      <Text style={styles.percent}>{Math.round(progress)}%</Text>
    </View>
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${progress}%` }]} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingBottom: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  label: { fontSize: 16, fontWeight: '600', color: '#137fec', textTransform: 'uppercase' },
  partText: { fontSize: 16, color: '#64748b' },
  percent: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  track: { height: 6, backgroundColor: '#e2e8f0', borderRadius: 999 },
  fill: { height: 6, backgroundColor: '#137fec', borderRadius: 999 },
});
