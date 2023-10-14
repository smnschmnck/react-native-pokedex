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
  disabled,
  ...props
}) => {
  const buttonVariant = `${variant}Button` as const;
  const buttonTextVariant = `${variant}ButtonText` as const;

  return (
    <Pressable
      {...props}
      style={({ pressed }) => ({
        ...styles.buttonBase,
        ...styles[buttonVariant],
        alignSelf: fullWidth ? "stretch" : "auto",
        opacity: pressed || isLoading || disabled ? 0.5 : 1,
      })}
      disabled={isLoading || disabled}
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
