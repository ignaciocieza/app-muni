//@ts-nocheck
import React from "react";
import useStyles from "./asideBar.styles";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetCurrents } from "../../../api/actions/commonActions";

export default function AsideBarIcon({
  isActive,
  Icon,
  rute,
  title,
  setIsActive,
}: {
  isActive: boolean | string;
  Icon: any;
  rute: string;
  title: string;
  setIsActive: (arg: string) => void;
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  return (
    <div
      className={
        isActive === rute ? classes.contentButtonActive : classes.contentButton
      }
      onClick={() => {
        setIsActive(rute);
        dispatch(resetCurrents());
        history.push(rute);
      }}
    >
      <Icon className={isActive === rute ? classes.iconActive : classes.icon} />
      <span className={classes.title}>{title}</span>
    </div>
  );
}
