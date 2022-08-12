import React from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";

interface ISafeIconProps extends React.HTMLAttributes<HTMLImageElement> {
  icon?: string | OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  name?: string;
}

export default function SafeIcon({ icon, name, ...props }: ISafeIconProps) {
  return icon ? (
    typeof icon == "string" ? (
      <img src={icon} alt={name} {...props} />
    ) : (
      React.createElement(icon)
    )
  ) : null;
}
