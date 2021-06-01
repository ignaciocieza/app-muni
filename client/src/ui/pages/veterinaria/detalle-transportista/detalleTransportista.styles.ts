import { makeStyles } from "@material-ui/core/styles";
//import { colors } from "../../../../constants";
const borderStyle = "1px solid #A48C85";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "4% 0% 0% 10%",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      margin: " 8% 0% 0% 2%",
      overflow: "scroll",
    },
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    //gridTemplateRows: "repeat(12, 1fr)",
    gridGap: 5,
    outline: " 1px solid #A48C85",
    outlineOffset: 4,
    padding: "1%",
    // [theme.breakpoints.down("md")]: {
    //   width: "200vw",
    // },
  },
  button: {
    alignSelf: "center",
    marginTop: "1%",
    marginBottom: "1%",
    [theme.breakpoints.down("md")]: {
      marginTop: "10%",
    },
  },
  choferHeaderContainer: {
    gridRow: 2,
    borderTop: borderStyle,
    borderBottom: borderStyle,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.8em",
    textAlign: "center",
  },
  choferHeaderContent: {
    marginTop: "10%",
    marginBottom: "10%",
  },
  choferCell: {
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 10,
    //marginLeft: "15%",
    fontSize: "0.8em",
    justifySelf: "center",
  },
}));

export default useStyles;
