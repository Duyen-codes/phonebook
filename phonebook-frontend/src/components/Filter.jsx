import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";

const Filter = ({ search, handleSearch }) => {
  return (
    <Paper
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 300 }}
    >
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        value={search}
        onChange={handleSearch}
        placeholder="Search by name or number..."
        inputProps={{ "aria-label": "search by name or number..." }}
      />
    </Paper>
  );
};

export default Filter;
