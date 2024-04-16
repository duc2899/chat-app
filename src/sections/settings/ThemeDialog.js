import React from "react";
import { Button, Slide } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import useSettings from "../../hooks/useSettings";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ThemeDialog = ({ open, handleClose }) => {
  const MENU_LIST = [
    {
      key: 0,
      title: "Light",
      value: "light",
    },
    {
      key: 1,
      title: "Dark",
      value: "dark",
    },
  ];
  const { themeMode, onChangeMode } = useSettings();
  const [theme, setTheme] = React.useState(themeMode);

  const handleChange = (event) => {
    setTheme(event.target.value);
  };

  const handelApply = () => {
    onChangeMode(theme);
    handleClose();
  };
  const handelCloseDialog = () => {
    setTheme(themeMode);
    handleClose();
  };
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={handleClose}
      keepMounted
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Choose Theme"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <FormControl
            sx={{
              marginTop: "10px",
            }}
          >
            {MENU_LIST.map(({ key, title, value }) => (
              <RadioGroup
                key={key}
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={handleChange}
                value={theme}
              >
                <FormControlLabel
                  value={value}
                  control={<Radio />}
                  label={title}
                />
              </RadioGroup>
            ))}
          </FormControl>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handelCloseDialog}>Cancel</Button>
        <Button variant="contained" onClick={handelApply}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ThemeDialog;
