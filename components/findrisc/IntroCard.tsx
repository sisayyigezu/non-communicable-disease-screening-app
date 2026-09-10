import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "../../contexts/ThemeProvider";

type IntroCardProps = {
  title: string;
  discussion: string;
};
export const IntroCard = ({ title, discussion }: IntroCardProps) => {
  const { fontScale, theme } = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.background,
        padding: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.cardBorder,
        marginHorizontal: 16,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 20 }}>
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 999,
            backgroundColor: "#137fec1a",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name="health-and-safety" size={30} color="#137fec" />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 20 * fontScale,
              fontWeight: "700",
              color: theme.textPrimary,
              marginBottom: 8,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 16 * fontScale,
              color: theme.textPrimary,
              lineHeight: 24,
            }}
          >
            {discussion}
          </Text>
        </View>
      </View>
    </View>
  );
};
