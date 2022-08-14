import React from "react";

import Chip from "@mui/material/Chip";

interface ITagsPillsProps {
  tags: string[];
  spacing?: string;
}

export default function TagsPills({ tags, spacing = '8px' }: ITagsPillsProps) {
  return (
    <div style={{ marginBottom: spacing}}>
      {tags.map((t: string) => (
        <Chip sx={{ margin: `${spacing} ${spacing} 0px 0px`}} key={t} label={t} />
      ))}
    </div>
  );
}
