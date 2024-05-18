import { Stack, TextField } from "@mui/material";
import React, { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

const RHFCodes = ({ inputs = [], keyName = "", ...other }) => {
  const codeRef = useRef(null);
  const { control } = useFormContext();
  const handelChangeInput = (e, handelChange) => {
    const { maxLength, value, name } = e.target;
    const fieldIndex = Number(name.replace(keyName, ""));
    if (value.length > maxLength) {
      e.target.value = value[0];
    }
    if (value.length >= maxLength && fieldIndex <= 6 && fieldIndex >= 1) {
      handelNextField(fieldIndex + 1);
    } else {
      handelNextField(fieldIndex - 1);
    }
    handelChange(e);
  };
  const handelNextField = (i) => {
    const nextField = document.querySelector(`input[name=${keyName}${i}]`);
    if (nextField) nextField.focus();
  };
  return (
    <Stack
      direction={"row"}
      spacing={2}
      justifyContent={"center"}
      ref={codeRef}
    >
      {inputs.map((name, i) => (
        <Controller
          key={name}
          name={`${keyName}${i + 1}`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              InputProps={{
                sx: {
                  width: {
                    xs: 36,
                    sm: 56,
                  },
                  height: {
                    xs: 36,
                    sm: 56,
                  },
                  "& input": {
                    p: 0,
                    textAlign: "center",
                  },
                },
              }}
              inputProps={{
                maxLength: 1,
                type: "number",
              }}
              {...field}
              fullWidth
              error={!!error}
              {...other}
              autoFocus={i === 0}
              onChange={(e) => {
                handelChangeInput(e, field.onChange);
              }}
              onFocus={(e) => e.currentTarget.select()}
            />
          )}
        ></Controller>
      ))}
    </Stack>
  );
};

export default RHFCodes;
