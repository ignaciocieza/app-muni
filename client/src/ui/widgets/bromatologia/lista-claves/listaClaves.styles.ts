import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../../../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "50vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  contentButton: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      alignItems: "center",
    },
  },
  paper: {
    alignSelf: "center",
    padding: "2%",
    width: "25%",
    height: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    overflowY: "scroll",
    [theme.breakpoints.down("md")]: {
      width: "80%",
      height: "100%",
    },
  },
  textfield: {
    margin: "2%",
    //width: "54%",
    boxShadow: "5px 5px 8px -6px rgba(0,0,0,0.65)",
    [theme.breakpoints.down("md")]: {
      width: "80%",
      margin: "4% 0% 4% 0%",
    },
  },
  button: {
    margin: "3%",
    //width: "14%",
    backgroundColor: colors.blueOne,
    [theme.breakpoints.down("md")]: {
      width: "60%",
      marginTop: "6%",
    },
  },
}));

export default useStyles;
