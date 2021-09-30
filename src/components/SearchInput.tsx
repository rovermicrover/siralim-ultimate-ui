import React from "react";
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const pathname = location.pathname;
  const searchType = pathname.replaceAll("/", "").replaceAll("-", " ");
  const SearchLabelText = `Search ${searchType}`;

  return (
    <>
      <FormControl variant="standard">
        <Input
          value={q}
          onChange={(e) => qChange(e.target.value)}
          placeholder={SearchLabelText}
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
