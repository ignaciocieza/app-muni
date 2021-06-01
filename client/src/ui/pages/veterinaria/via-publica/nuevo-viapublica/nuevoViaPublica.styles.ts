import { makeStyles } from "@material-ui/core/styles";
import { boxShadow, colors } from "../../../../../constants";
const innerHeight = window.innerHeight;

const useStyles = makeStyles((theme) => ({
  form: {
    //height: `calc(${innerHeight}px * 3.5)`,
    marginLeft: "10%",
    paddingTop: "2%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      width: "100vw",
      //height: `calc(${innerHeight}px * 3)`,
      position: "absolute",
      top: `calc(${innerHeight}px * .15)`,
      margin: "1%",
    },
  },
  title: {
    paddingTop: "1%",
    marginBottom: "4%",
    fontSize: "1.2rem",
    alignSelf: "flex-start",
    fontWeight: 700,
    color: colors.blueOne,
    [theme.breakpoints.down("md")]: {
      margin: "0% 0% 9% 4%",
    },
  },
  subtitle: {
    margin: "1% 0 -1% 23%",
    fontSize: "0.9rem",
    fontWeight: 900,
    alignSelf: "flex-start",
    opacity: 0.54,
    [theme.breakpoints.down("md")]: {
      margin: "1% 0 0% 8%",
    },
  },
  textfield: {
    margin: "2%",
    width: "54%",
    boxShadow: "5px 5px 8px -6px rgba(0,0,0,0.65)",
    [theme.breakpoints.down("md")]: {
      width: "80%",
      margin: "4% 0% 4% 0%",
    },
  },
  formControl: {
    margin: "2%",
    width: "54%",
    boxShadow: "5px 5px 8px -6px rgba(0,0,0,0.65)",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
  },
  textArea: {
    margin: "2%",
    padding: " 1%",
    width: "90%",
    height: "14%",
    opacity: 0.5,
    boxShadow,
    borderRadius: 4,
    textAlign: "justify",
    fontSize: "1.5em",
    [theme.breakpoints.down("md")]: {
      width: "78%",
      height: "14%",
      padding: "2%",
    },
  },
  fecha: {
    width: "54%",
    boxShadow,
    [theme.breakpoints.down("md")]: {
      width: "78%",
    },
  },
  autoComplete: {
    marginTop: "2%",
    width: "54%",
    //boxShadow,
    [theme.breakpoints.down("md")]: {
      width: "78%",
    },
  },
  contentMaterialTable: {
    width: "85vw",
    alignSelf: "flex-start",
    marginLeft: 0,
    [theme.breakpoints.down("md")]: {
      width: "100vw",
      overflowX: "scroll",
    },
  },
  materialTable: {
    [theme.breakpoints.down("md")]: {
      width: "300vw",
    },
  },
  button: {
    margin: "3%",
    width: "14%",
    backgroundColor: colors.blueOne,
    [theme.breakpoints.down("md")]: {
      width: "60%",
      marginTop: "6%",
    },
  },
  buttonImprimir: {
    opacity: 0.8,
    [theme.breakpoints.down("md")]: {
      marginTop: "3%",
    },
  },
}));

export default useStyles;
