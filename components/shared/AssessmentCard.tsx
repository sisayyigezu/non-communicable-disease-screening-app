import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeProvider";

interface AssessmentCardProps extends TouchableOpacityProps {
  title: string;
  subtitle: string;
  tag: string;
  icon: keyof typeof MaterialIcons.glyphMap | React.ReactNode;
  backgroundColor: string;
  btnText:string;
  iconColor: string;
  tagBgColor: string;
  tagTextColor: string;
  buttonBgColor: string;
  buttonTextColor: string;
  buttonHoverColor?: string;
  overlayIcon?: keyof typeof MaterialIcons.glyphMap | React.ReactNode;
  overlayColor?: string;
}

export const AssessmentCard = ({
  title,
  subtitle,
  tag,
  btnText,
  icon,
  backgroundColor,
  iconColor,
  tagBgColor,
  tagTextColor,
  buttonBgColor,
  buttonTextColor,
  buttonHoverColor = buttonBgColor,
  overlayIcon,
  overlayColor = "#137fec",
  onPress,
  ...props
}: AssessmentCardProps) => {
  const { theme, fontScale } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: theme.card, borderColor: theme.cardBorder },
      ]}
      {...props}
    >
      {/* Overlay Icon (background watermark) */}
      {overlayIcon && (
        <View style={styles.overlayIconContainer}>
          {typeof overlayIcon === "string" ? (
            <MaterialIcons
              name={overlayIcon as keyof typeof MaterialIcons.glyphMap}
              size={120}
              color={overlayColor}
              style={styles.overlayIcon}
            />
          ) : (
            overlayIcon
          )}
        </View>
      )}

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.iconWrapper, { backgroundColor }]}>
            {typeof icon === "string" ? (
              <MaterialIcons
                name={icon as keyof typeof MaterialIcons.glyphMap}
                size={40}
                color={iconColor}
              />
            ) : (
              icon
            )}
          </View>
          <View style={[styles.tag, { backgroundColor: tagBgColor }]}>
            <Text
              style={[
                styles.tagText,
                { color: tagTextColor },
                { fontSize: styles.tagText.fontSize * fontScale },
              ]}
            >
              {tag}
            </Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              { fontSize: styles.title.fontSize * fontScale },
              { color: theme.textPrimary },
            ]}
          >
            {title}
          </Text>
          <Text
            style={[
              styles.subtitle,
              { fontSize: styles.subtitle.fontSize * fontScale },
              { color: theme.textPrimary },
            ]}
          >
            {subtitle}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: buttonBgColor, borderColor: theme.slate100 },
          ]}
          activeOpacity={0.8}
          onPress={onPress}
        >
          <Text
            style={[
              styles.buttonText,
              { color: buttonTextColor },
              { fontSize: styles.buttonText.fontSize * fontScale },
            ]}
          >
            {btnText}
          </Text>
          <MaterialIcons
            name="arrow-forward"
            size={20}
            color={buttonTextColor}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
    position: "relative",
  },
  overlayIconContainer: {
    position: "absolute",
    top: 16,
    right: 16,
    opacity: 0.1,
    pointerEvents: "none",
  },
  overlayIcon: {
    transform: [{ rotate: "12deg" }, { translateX: 16 }, { translateY: -16 }],
  },
  content: {
    gap: 16,
    zIndex: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 14,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  textContainer: {
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 24,
    color: "#64748b",
    lineHeight: 32,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "700",
  },
});

// import React from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
// import { useTheme } from './ThemeProvider';
// import { useNavigation } from '@react-navigation/native';

// type CardType = 'priority' | 'routine';

// interface AssessmentCardProps2 {
//   type: CardType;
//   title: string;
//   subtitle: string;
//   imageUrl: string;
//   onPress: () => void;
// }

// export const AssessmentCard2 = ({ type, title, subtitle, imageUrl, onPress }: AssessmentCardProps2) => {
//   const { theme:colors  } = useTheme();
//   // const navigation = useNavigation<any>();

//   const isPriority = type === 'priority';

//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       activeOpacity={0.95}
//       style={[
//         styles.container,
//         {
//           backgroundColor: colors.card,
//           borderColor: colors.cardBorder,
//           shadowColor: colors.shadow,
//         }
//       ]}
//     >
//       <View style={styles.content}>
//         <View style={[styles.mainContent, { flex: 2 }]}>
//           <View style={styles.header}>
//             {isPriority?
//             (<MaterialIcons
//               name={'favorite'}
//               size={24}
//               color={colors.primary}
//             />):(
//             <FontAwesome5
//               name={'stethoscope'}
//               size={24}
//               color={colors.slate500}
//             />)}
//             <Text style={[
//               styles.priorityBadge,
//               { color: isPriority ? colors.primary : colors.slate500 }
//             ]}>
//               {isPriority ? 'Priority' : 'Routine'}
//             </Text>
//           </View>
//           <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
//           <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
//           <TouchableOpacity
//             onPress={onPress}
//             style={[
//             styles.startButton,
//             isPriority && {
//               backgroundColor: colors.primary,
//               shadowColor: colors.primary,
//             }
//           ]}>
//             <Text style={[
//               styles.startButtonText,
//               isPriority && { color: '#fff' }
//             ]}>
//               Start Now
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.imageContainer}>
//           <Image
//             source={{ uri: imageUrl }}
//             style={styles.image}
//             // defaultSource={require('../assets/png')} // Add placeholder
//           />
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     borderRadius: 24,
//     padding: 20,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.06,
//     shadowRadius: 12,
//     elevation: 3,
//     overflow: 'hidden',
//   },
//   content: {
//     flexDirection: 'row',
//     alignItems: 'stretch',
//   },
//   mainContent: {
//     justifyContent: 'space-between',
//     gap: 20,
//     zIndex: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   priorityBadge: {
//     fontSize: 12,
//     fontWeight: '700',
//     textTransform: 'uppercase',
//     letterSpacing: 1,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '700',
//     lineHeight: 24,
//   },
//   subtitle: {
//     fontSize: 16,
//   },
//   startButton: {
//     alignSelf: 'flex-start',
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 12,
//     borderWidth: 1,
//     minWidth: 120,
//     alignItems: 'center',
//   },
//   startButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   imageContainer: {
//     position: 'absolute',
//     right: 0,
//     top: 20,
//     bottom: 20,
//     width: '33%',
//     borderRadius: 16,
//     overflow: 'hidden',
//     opacity: 0.9,
//   },
//   image: {
//     flex: 1,
//     width: '100%',
//   },
// });
