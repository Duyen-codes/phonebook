import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const Person = ({ person, handleRemove, handleSaveEdited }) => {
  const [isEditing, setisEditing] = useState(false);
  const [name, setName] = useState(person.name);
  const [number, setNumber] = useState(person.number);

  const handleEdit = (id) => {
    const editedPerson = { name, number };
    handleSaveEdited(id, editedPerson);
    setisEditing(false);
  };
  return (
    <>
      {!isEditing && (
        <div>
          <span>
            <IconButton>
              <AccountBoxIcon />
            </IconButton>
            {person.name}: {person.number}
          </span>

          <Tooltip title="Edit" onClick={() => setisEditing(!isEditing)}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" onClick={() => handleRemove(person.id)}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}
      {isEditing && (
        <Box sx={{ marginBottom: "2px" }}>
          <TextField
            id="name"
            label="Name"
            sx={{ mx: 2 }}
            variant="outlined"
            type="text"
            defaultValue={person.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Number"
            type="tel"
            defaultValue={person.number}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <Box sx={{ marginTop: "10px" }}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              size="small"
              sx={{ mx: "5px" }}
              onClick={() => handleEdit(person.id)}
            >
              Save
            </Button>
            <Button
              variant="contained"
              startIcon={<ClearIcon />}
              size="small"
              onClick={() => setisEditing(!isEditing)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Person;
