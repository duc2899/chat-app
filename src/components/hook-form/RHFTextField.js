import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";

RHFTextField.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFTextField({
  name,
  helperText,
  disabled = false,
  ...other
}) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error ? error.message : helperText}
          {...other}
          disabled={disabled}
        />
      )}
    ></Controller>
  );
}
