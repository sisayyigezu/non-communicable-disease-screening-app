import React from "react";
import { ThemeProvider } from "@/components";
import { TextProvider } from "@/contexts/TextContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { LangContextProvider } from "@/contexts/LangContext";
export default function TabLayout() {
  return (
    <ThemeProvider>
      <LangContextProvider>
        <TextProvider>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarItemStyle: {
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              },
              tabBarStyle: {
                backgroundColor: "#137fecff",
                borderRadius: 20,
                paddingVertical: 10,
                marginHorizontal: 0,
                marginBottom: 40,
                height: 52,
                position: "absolute",
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#cbc9dfff",
              },
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <MaterialIcons
                    name="home"
                    size={focused ? 34 : 30}
                    color={focused ? "#000" : "#555"}
                  />
                ),
              }}
            />
            <Tabs.Screen name="forms/findrisc_form" options={{ href: null }} />
            <Tabs.Screen name="forms/thyroid_test" options={{ href: null }} />
            <Tabs.Screen
              name="chatbot"
              options={{
                title: "Chat",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <MaterialIcons
                    name="chat"
                    size={focused ? 34 : 30}
                    color={focused ? "#000" : "#555"}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="settings"
              options={{
                title: "Settings",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <MaterialIcons
                    name="settings"
                    size={focused ? 34 : 30}
                    color={focused ? "#000" : "#555"}
                  />
                ),
              }}
            />
            <Tabs.Screen name="forms/celiac_disease_symptoms" options={{ href: null }} />

          </Tabs>
        </TextProvider>
      </LangContextProvider>
    </ThemeProvider>
  );
}
