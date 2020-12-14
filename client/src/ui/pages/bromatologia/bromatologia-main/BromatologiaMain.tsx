import React, { useEffect } from "react";
//import { useSelector, useDispatch } from 'react-redux';
import CardPermisos from "../../../widgets/card-permiso/CardPermiso";
//import { setIsHeader } from '../../../api/actions/commonActions';
import useStyles from "./BromatologiaMain.styles";

export default function BromatologiaMain() {
  const classes = useStyles();
  //const { agente: { agente }, user: { admin } } = useSelector(state => state);
  //const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    //dispatch(setIsHeader(true))
  });

  return (
    <div className={classes.root}>
      <span className={classes.title}>BROMATOLOGÍA</span>
      <span className={classes.subtitle}>PANEL DE GESTIÓN DE BROMATOLOGÍA</span>
      <div className={classes.permisosContent}>
        <CardPermisos
          title="Bromatología"
          subtitle="Administrar Comercios"
          onClick={"/bromatologia/administrar"}
        />
        <CardPermisos
          title="Bromatología"
          subtitle="Administrar Claves"
          onClick={"/bromatologia/claves"}
        />
        <CardPermisos
          title="Bromatología"
          subtitle="Nueva Acta"
          onClick={"/bromatologia/form"}
        />
      </div>
    </div>
  );
}
