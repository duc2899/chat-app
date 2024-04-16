import { styled } from "@mui/material/styles";
const SearchIconWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  pointerEvent: "none",
  padding: theme.spacing(0, 2),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default SearchIconWrapper;
