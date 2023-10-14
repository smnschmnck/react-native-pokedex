import { Link } from "expo-router";
import { FC, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

export const BackButton: FC = () => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Link href=".." asChild>
      <Pressable
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        style={styles.backButtonPressable}
      >
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={isPressed ? "#efefef" : "black"}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </Svg>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  backButtonPressable: {
    justifyContent: "center",
    alignItems: "center",
    height: 28,
    width: 28,
  },
});
