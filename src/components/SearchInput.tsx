import React from "react";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";

interface ISearchInputProps {
  q: string;
  qChange: (newQ: string) => void;
}

export default function SearchInput({ q, qChange }: ISearchInputProps) {
  return (
    <>
      <FormControl variant="standard">
        <Input
          value={q}
          onChange={(e) => qChange(e.target.value)}
          placeholder="Search"
          startAdornment={
            <>
              {q.length > 0 ? (
                <InputAdornment
                  sx={{ cursor: "pointer" }}
                  onClick={() => qChange("")}
                  position="start"
                >
                  <SearchOffIcon />
                </InputAdornment>
              ) : (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )}
            </>
          }
        />
      </FormControl>
    </>
  );
}
