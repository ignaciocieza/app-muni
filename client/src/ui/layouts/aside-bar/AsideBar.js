import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Hidden } from "@material-ui/core";
//import HomeIcon from "@material-ui/icons/Home";
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import useStyles from "./asideBar.styles";
import AsideBarIcon from "./AsideBarIcon";
import PetsIcon from '@material-ui/icons/Pets';

export default function AsideBar() {
  const [isActive, setIsActive] = useState(false);
  const { admin } = useSelector((state) => state.user);
  
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    setIsActive(location.pathname);
  }, [location]);

  if (!admin) {
    return null;
  }

  return (
    <Hidden smDown>
      <div className={classes.root}>
        <AsideBarIcon
          isActive={isActive}
          Icon={FastfoodIcon}
          rute={"/home"}
          title="Bromatología"
          setIsActive={setIsActive}z
        />
         <AsideBarIcon
          isActive={isActive}
          Icon={LocalShippingIcon}
          rute={"/transportistas/main"}
          title="Transportistas"
          setIsActive={setIsActive}
        />
         {/* <AsideBarIcon
          isActive={isActive}
          Icon={PetsIcon}
          rute={"/veterinaria/viapublica/main"}
          title="Cuidado Animal"
          setIsActive={setIsActive}
        /> */}
      </div>
    </Hidden>
  );
}
