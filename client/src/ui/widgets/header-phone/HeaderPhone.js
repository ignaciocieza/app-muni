import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  resetCurrents,
  setIsHeader,
  logout,
} from "../../../api/actions/commonActions";
import {
  SwipeableDrawer,
  IconButton,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import PetsIcon from "@material-ui/icons/Pets";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import useStyles from "./headerPhone.styles";

const itemList = [
  {
    text: "Bromatología",
    route: "/home",
    icon: <FastfoodIcon />,
  },
  {
    text: "Transportistas",
    route: "/transportistas/main",
    icon: <LocalShippingIcon />,
  },
  // {
  //   text: "Cuidado Animal",
  //   route: "/veterinaria/viapublica/main",
  //   icon: <PetsIcon />,
  // },
];

export default function HeaderPhone() {
  const [state, setState] = useState(false);
  const history = useHistory();
  const {
    user: { admin },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {admin ? (
        <React.Fragment>
          <List>
            {admin &&
              itemList.map((item) => (
                <ListItem
                  key={item.text}
                  button
                  onClick={() => {
                    setState(false);
                    dispatch(resetCurrents());
                    history.push(item.route);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
          </List>
          <Divider />
          <List>
            <ListItem
              button
              onClick={() => {
                setState(false);
                dispatch(logout());
                history.push("/signout");
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Salir" />
            </ListItem>
          </List>
        </React.Fragment>
      ) : (
        <List>
          <ListItem
            button
            onClick={() => {
              setState(false);
              dispatch(setIsHeader(false));
              dispatch(resetCurrents());
              history.push("/");
            }}
          >
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary="Entrar" />
          </ListItem>
        </List>
      )}
    </div>
  );

  return (
    <React.Fragment>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        edge="start"
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor={"left"}
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </React.Fragment>
  );
}
