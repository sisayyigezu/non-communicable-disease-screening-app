import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contexts/ThemeProvider";

export function BMICalculator({
  value,
  onChange,
  items,
}: {
  value: number | null;
  onChange: (value: number | null) => void;
  items: {
    label: string;
    value: number;
    icon?: React.ReactNode;
  }[];
}) {
  const { fontScale, theme } = useTheme();
  const [weight, setWeight] = useState<string>(""); // weight in kilograms
  const [height, setHeight] = useState<string>(""); // height in centimeters
  const [BMIRange, setBMIRange] = useState<string>(
    "Please Enter Height and Weight",
  );
  const calculate = ({
    onChange,
  }: {
    onChange: (i: number | null) => void;
  }) => {
    const hght = Number(height);
    const wght = Number(weight);
    if (hght > 0 && wght >= 0) {
      const bmi = wght / (hght * hght);
      if (bmi < 25) {
        onChange(0);
      } else if (bmi <= 30) {
        onChange(1);
      } else if (bmi > 30) {
        onChange(3);
      } else {
        onChange(null);
      }
    }
  };
  useEffect(() => {
    if (value !== null) {
      const label = items.filter((opt) => opt.value === value)[0]?.label;
      setBMIRange(label);
    } else setBMIRange("Please Enter Height and Weight");
  }, [items, value]);

  return (
    <View
      style={{
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: 5,
        backgroundColor: theme.background,
      }}
    >
      <View
        style={[
          {
            display: "flex",
            flexDirection: "row",
            borderRadius: 8,
          },
        ]}
      >
        <Text
          style={{
            fontSize: 22 * fontScale,
            fontWeight: 600,
            minWidth: "30%",
            color: theme.textPrimary,
          }}
        >
          Your Weight(kg):{" "}
        </Text>
        <TextInput
          placeholder={"00"}
          keyboardType="numeric"
          value={weight.toString()}
          onChangeText={(text: string) => setWeight(text)}
          style={{
            minHeight: 50,
            minWidth: 70,
            paddingVertical: 5,
            outline: "blue",
            fontSize: 22,
            borderRadius: 8,
            borderWidth: 3,
            borderColor: "#e2e8f5",
            color: theme.textPrimary,
          }}
        />
        <Text
          style={{
            fontSize: 22 * fontScale,
            fontWeight: 600,
            color: theme.textPrimary,
          }}
        >
          Kg
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontSize: 22 * fontScale,
            fontWeight: 600,
            color: theme.textPrimary,
          }}
        >
          Your height(m):
        </Text>
        <TextInput
          placeholder="00"
          keyboardType="numeric"
          value={height.toString()}
          onChangeText={(text: string) => setHeight(text)}
          style={{
            minHeight: 50,
            minWidth: 70,
            paddingVertical: 5,
            fontSize: 22,
            borderRadius: 8,
            borderWidth: 3,
            borderColor: "#e2e8f5",
            color:theme.textPrimary
          }}
        />
        <Text
          style={{
            fontSize: 22 * fontScale,
            fontWeight: 600,
            marginLeft: 5,
            color: theme.textPrimary,
          }}
        >
          m
        </Text>
      </View>
      <TouchableOpacity
        style={[
          {
            borderColor: theme.cardBorder,
            borderWidth: 2,
            minWidth: "40%",
            width: "45%",
            maxWidth: "60%",
            borderRadius: 10
          },
        ]}
      >
        <Text
          style={{
            fontSize: 22 * fontScale,
            fontWeight: 600,
            color: "#137fec",
            textAlign:"center",
          }}
          onPress={() => calculate({ onChange })}
        >
          Calculate
        </Text>
      </TouchableOpacity>
      <View
        style={[
          {
            // flex: 1,
            paddingVertical: 15,
            height:40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            borderWidth: 2,
            borderColor: value !== null ? "#137fec" : "#e2e8f0",
            backgroundColor: value !== null ? "#137fec1a" : "#fff",
          },
        ]}
      >
        {BMIRange && (
          <Text
            style={[
              {
                height: 40,
                fontSize: 24,
                fontWeight: "600",
                color: value !== null ? "#137fec" : "#64748b",
              },
            ]}
          >
            {BMIRange}
          </Text>
        )}
      </View>
    </View>
  );
}
