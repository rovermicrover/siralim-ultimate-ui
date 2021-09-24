import React from "react";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import chunk from "../lib/chunk";

interface ITagsPillsProps {
  tags: string[];
  rows?: number;
  spacing?: number;
  justifyContent?: string;
}

export default function TagsPills({
  tags,
  rows = 5,
  spacing = 1,
  justifyContent = "center",
}: ITagsPillsProps) {
  return (
    <Stack spacing={spacing} justifyContent={justifyContent}>
      {chunk(tags, rows).map((r, i) => (
        <Stack
          key={i}
          direction="row"
          spacing={spacing}
          justifyContent={justifyContent}
        >
          {r.map((t: string) => (
            <Chip key={t} label={t} />
          ))}
        </Stack>
      ))}
    </Stack>
  );
}
