import { makeStyles } from "@material-ui/core/styles";
import { boxShadow } from "../../../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1% 1% 0 8%",
    [theme.breakpoints.down("md")]: {
      margin: "5% 1% 0 1%",
    },
  },
  image: {
    cursor: "pointer",
    boxShadow,
    width: 50,
    borderRadius: "50%",
    height: 50,
  },
}));

export default useStyles;
