import React from "react";

import Chip from "@mui/material/Chip";

interface ITagsPillsProps {
  tags: string[];
  spacing?: number;
}

export default function TagsPills({ tags, spacing = 8 }: ITagsPillsProps) {
  return (
    <div>
      {tags.map((t: string) => (
        <Chip sx={{ marginRight: `${spacing}px` }} key={t} label={t} />
      ))}
    </div>
  );
}
