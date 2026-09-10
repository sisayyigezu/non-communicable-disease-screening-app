import { MaterialIcons as Icon } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contexts/ThemeProvider";

type GenderSelectorProps = {
  value: number | null;
  options: {
      label: string;
      value: number;
      icon?: React.ReactNode;
    }[];
  onSelect: (value: number) => void;
};

export const GenderSelector = ({ value, options, onSelect }: GenderSelectorProps) => {
  const { fontScale, theme } = useTheme();
  return (
    <View style={{ flexDirection: "row", gap: 16, width: "100%" }}>
      {options.map((g) => (
        <TouchableOpacity
          key={g.value}
          onPress={() => onSelect(g.value)}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: value === g .value? "#137fec" : "#f1f5f9",
            backgroundColor: theme.background,
          }}
        >
          <Icon
            name={g.value === 0 ? "male" : "female"}
            size={40}
            color={value === g.value ? "#137fec" : "#94a3b8"}
          />
          <Text
            style={[
              {
                marginTop: 12,
                fontSize: 24 * fontScale,
                fontWeight: value === g.value ? "700" : "500",
                color: value === g.value ? "#137fec" : theme.textPrimary,
              },
            ]}
          >
            {g.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
