// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ThemeSettings from "./components/settings";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { HideSnakeBar } from "./redux/slices/app";
function App() {
  const { open, message, severity } = useSelector(
    (store) => store.app.snackBar
  );
  const dispatch = useDispatch();
  const vertical = "top";
  const horizontal = "center";
  return (
    <>
      <ThemeProvider>
        <ThemeSettings>
          {" "}
          <Router />{" "}
        </ThemeSettings>
      </ThemeProvider>
      {message && open && (
        <Snackbar
          anchorOrigin={{
            vertical: vertical,
            horizontal: horizontal,
          }}
          open={open}
          autoHideDuration={4000}
          key={vertical + horizontal}
          onClose={() => {
            dispatch(HideSnakeBar());
          }}
        >
          <Alert
            onClose={() => {
              dispatch(HideSnakeBar());
            }}
            severity={severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default App;
