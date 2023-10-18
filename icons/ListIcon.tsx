import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { SvgProps } from "./svgProps";

export const ListIcon: FC<SvgProps> = ({
  width = 20,
  height = 20,
  color = "currentColor",
}) => (
  <Svg viewBox="0 0 24 24" fill={color} height={height} width={width}>
    <Path
      fillRule="evenodd"
      d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
      clipRule="evenodd"
    />
  </Svg>
);
