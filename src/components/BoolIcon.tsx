import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";

interface IBoolIconProps {
  bool: boolean;
  title: string;
}

export default function BoolIcon({ bool, title }: IBoolIconProps) {
  const titleAccess = `${title} is ${bool ? "true" : "false"}`;
  const props = { titleAccess };
  return bool ? (
    <CheckIcon color="success" {...props} />
  ) : (
    <DoNotDisturbIcon color="error" {...props} />
  );
}
