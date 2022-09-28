import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { Paper } from "@mui/material";

const PersonForm = (props) => {
  const { newName, handleNameChange, newNumber, handlePhoneChange, addPerson } =
    props;
  return (
    <Paper
      action=""
      onSubmit={addPerson}
      component="form"
      sx={{
        px: "2rem",
        paddingBottom: "2rem",
        paddingTop: "1px",
        marginTop: "2rem",
      }}
    >
      <h2>Add New Contact</h2>
      <TextField
        margin="normal"
        value={newName}
        onChange={handleNameChange}
        id="name"
        name="name"
        type="text"
        required
        label="Name"
        placeholder="e.g. James Bond"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PermIdentityIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <div>
        <TextField
          margin="normal"
          value={newNumber}
          onChange={handlePhoneChange}
          name="number"
          id="number"
          type="text"
          required
          label="Number"
          placeholder="e.g. 041-3171234"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIphoneIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </div>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        type="submit"
        size="small"
      >
        Add
      </Button>
    </Paper>
  );
};

export default PersonForm;
