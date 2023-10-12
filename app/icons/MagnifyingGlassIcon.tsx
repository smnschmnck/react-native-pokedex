import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { SvgProps } from "./svgProps";

export const MagnifyingGlassIcon: FC<SvgProps> = ({
  width = 20,
  height = 20,
  color = "currentColor",
}) => (
  <Svg
    fill="none"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke={color}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </Svg>
);
