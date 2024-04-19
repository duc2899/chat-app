import { faker } from "@faker-js/faker";
import {
  Autocomplete,
  Avatar,
  Box,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

RHFAutoCompleted.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFAutoCompleted({
  name,
  label,
  helperText,
  ...other
}) {
  const { control, setValue } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          multiple
          id="tags-standard"
          {...field}
          fullWidth
          onChange={(event, newValue) =>
            setValue(name, newValue, { shouldValidate: true })
          }
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                srcSet={option.avatar}
                src={option.avatar}
                alt=""
                style={{
                  borderRadius: "50%",
                }}
              />
              <Typography variant="subtitle2">{option.name}</Typography>
            </Box>
          )}
          {...other}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!error}
              helperText={error ? error.message : helperText}
            />
          )}
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                avatar={<Avatar alt={option.name} src={option.avatar} />}
                variant="outlined"
                label={option.name}
                key={index}
                {...getTagProps({ index })}
              />
            ))
          }
        />
      )}
    ></Controller>
  );
}
