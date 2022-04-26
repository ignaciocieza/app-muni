import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getDataBromatologia,
  setIsFetchingBromatologia,
} from "../../../../api/actions/bromatologia/bromatologiaActions";
import { isMobile } from "../../../../constants";
//import { useSelector, useDispatch } from 'react-redux';
import CardPermisos from "../../../widgets/card-permiso/CardPermiso";
//import { setIsHeader } from '../../../api/actions/commonActions';
import useStyles from "./BromatologiaMain.styles";

export default function BromatologiaMain() {
  const classes = useStyles();
  const dispatch = useDispatch();
  //const { rubro } = useSelector((state: any) => state.bromatologia);

  useEffect(() => {
    window.scrollTo(0, 0);
    //dispatch(setIsHeader(true))

    //if (!rubro.length) {
    dispatch(setIsFetchingBromatologia(true));
    dispatch(getDataBromatologia());
  }, []);

  return (
    <div className={classes.root}>
      <span className={classes.title}>BROMATOLOGÍA</span>
      <span className={classes.subtitle}>PANEL DE GESTIÓN DE BROMATOLOGÍA</span>
      <div className={classes.permisosContent}>
        <CardPermisos
          title="Ver Comercios"
          subtitle="Lista de todos los Comercios"
          onClick={"/bromatologia/administrar"}
        />
        {isMobile ? null : (
          <>
            <CardPermisos
              title="Valor Único"
              subtitle="Para Razón Social, Rubro y Nombre Comercial"
              onClick={"/bromatologia/claves"}
            />
            <CardPermisos
              title="Nuevo Comercio"
              subtitle="Agregar un nuevo Comercio"
              onClick={"/bromatologia/form"}
            />
          </>
        )}
        <CardPermisos
          title="Historial"
          subtitle="Ver comercios que han cesado"
          onClick={"/bromatologia/historial"}
        />
      </div>
    </div>
  );
}
