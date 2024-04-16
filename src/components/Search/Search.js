import { alpha, styled } from "@mui/material/styles";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha("rgba(234, 242, 254, 1)", 1),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

export default Search;
