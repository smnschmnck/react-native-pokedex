import { FC } from "react";
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
} from "react-native";

type ButtonProps = PressableProps & {
  title: string;
  fullWidth?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  isLoading?: boolean;
};

export const Button: FC<ButtonProps> = ({
  title,
  fullWidth,
  variant = "primary",
  isLoading,
  ...props
}) => {
  const buttonVariant = `${variant}Button` as const;
  const buttonTextVariant = `${variant}ButtonText` as const;

  type x = ActivityIndicatorProps;

  return (
    <Pressable
      {...props}
      style={({ pressed }) => ({
        ...styles.buttonBase,
        ...styles[buttonVariant],
        alignSelf: fullWidth ? "stretch" : "auto",
        opacity: pressed || isLoading ? 0.75 : 1,
      })}
      disabled={isLoading}
    >
      {!isLoading && (
        <Text
          style={{
            ...styles.buttonTextBase,
            ...styles[buttonTextVariant],
          }}
        >
          {title}
        </Text>
      )}
      {isLoading && (
        <ActivityIndicator
          color={variant === "primary" ? "white" : undefined}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    height: 36,
  },
  primaryButton: {
    backgroundColor: "#06f",
  },
  secondaryButton: {
    backgroundColor: "#efefef",
  },
  ghostButton: {
    backgroundColor: "transparent",
  },
  buttonTextBase: {
    fontWeight: "500",
  },
  primaryButtonText: {
    color: "white",
  },
  secondaryButtonText: {
    color: "#06f",
  },
  ghostButtonText: {
    color: "#06f",
  },
});
