import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeProvider";

interface TextSizeSliderProps {
  value: number;
  label: string;
  description: string;
  onValueChange: (value: number) => void;
}

export const TextSizeSlider = ({
  value,
  label,
  description,
  onValueChange,
}: TextSizeSliderProps) => {
  const { theme, fontScale } = useTheme();
  const [sliderWidth, setSliderWidth] = useState(0);

  const handleLayout = (e: LayoutChangeEvent) => {
    setSliderWidth(e.nativeEvent.layout.width);
  };

  const handlePress = (e: any) => {
    if (sliderWidth > 0) {
      const x = e.nativeEvent.locationX;
      const newValue = Math.max(0, Math.min(1, x / sliderWidth));
      onValueChange(newValue);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
        {label}
      </Text>

      <View style={styles.previewCard}>
        <View
          style={[styles.previewContent, { backgroundColor: theme.background }]}
        >
          <Text
            style={[
              styles.previewText,
              { fontSize: 16 + value * 8, color: theme.textPrimary },
            ]}
          >
            {description}
          </Text>
        </View>
      </View>

      <View
        style={[styles.sliderContainer, { backgroundColor: theme.background }]}
      >
        <View
          style={[
            styles.sliderBox,
            { borderColor: theme.cardBorder, backgroundColor: theme.card },
          ]}
        >
          <MaterialIcons
            name="format-size"
            size={18}
            color={theme.textPrimary}
          />

          <TouchableWithoutFeedback onPress={handlePress}>
            <View style={[styles.trackContainer]} onLayout={handleLayout}>
              {/* Track Background */}
              <View
                style={[
                  styles.trackBackground,
                  { backgroundColor: theme.cardBorder },
                ]}
              />

              {/* Active Track */}
              <View
                style={[styles.trackActive, { width: `${value * 100}%` }]}
              />

              {/* Thumb */}
              <View style={[styles.thumb, { left: `${value * 100}%` }]}>
                <View style={styles.thumbInner} />
              </View>
            </View>
          </TouchableWithoutFeedback>

          <MaterialIcons
            name="format-size"
            size={28}
            color={theme.textPrimary}
          />
        </View>

        <Text
          style={[
            styles.valueText,
            { color: theme.textSecondary, fontSize: 14 * fontScale },
          ]}
        >
          {Math.round(100 + value * 100)}% (
          {value < 0.3 ? "Small" : value > 0.7 ? "Large" : "Medium"})
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  previewCard: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  previewContent: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  previewText: {
    color: "#0f172a",
    lineHeight: 24,
  },
  sliderContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  sliderBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  trackContainer: {
    flex: 1,
    height: 32, // Larger touch area
    justifyContent: "center",
    position: "relative",
  },
  trackBackground: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#e2e8f0",
    width: "100%",
  },
  trackActive: {
    position: "absolute",
    height: 6,
    borderRadius: 3,
    backgroundColor: "#137fec",
    left: 0,
  },
  thumb: {
    position: "absolute",
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -14, // Center thumb
  },
  thumbInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#137fec",
  },
  valueText: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 12,
  },
});
