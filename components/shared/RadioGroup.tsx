import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contexts/ThemeProvider";

type RadioOption = {
  label: string;
  value: number;
  description?: string;
  icon?: React.ReactNode;
};

type RadioGroupProps = {
  options: RadioOption[];
  value: number | null;
  onChange: (value: number) => void;
};

export const RadioGroup = ({ options, value, onChange }: RadioGroupProps) => {
  const { fontScale, theme } = useTheme();
  return (
    <View>
      {options.map((opt) => (
        <TouchableOpacity
          key={opt.value + opt.label}
          onPress={() => onChange(opt.value)}
          style={[
            styles.option,
            value === opt.value && styles.selected,
            { backgroundColor: theme.background },
          ]}
        >
          <View
            style={[styles.radio, value === opt.value && styles.radioFilled]}
          >
            {value === opt.value && <View style={styles.radioDot} />}
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              height: 106,
            }}
          >
            {opt.icon && (
              <View
                style={{
                  width: 70,
                  height: 90,
                  marginRight: 12,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {opt.icon}
              </View>
            )}
            <View
              style={{
                // flex: 1,
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  styles.label,
                  { fontSize: styles.label.fontSize * fontScale },
                  { color: theme.textPrimary },
                ]}
              >
                {opt.label}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
    marginBottom: 12,
  },
  selected: {
    borderColor: "#137fec",
    backgroundColor: "#137fec0d",
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#cbd5e1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  radioFilled: { borderColor: "#137fec", backgroundColor: "#137fec" },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#fff" },
  label: {
    fontSize: 22,
    fontWeight: "500",
    color: "#334155",
    maxWidth: "85%",
    minWidth: "70%",
  },
  description: {
    fontSize: 18,
    color: "#64748b",
    marginTop: 2,
    maxWidth: "70%",
  },
});
