import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getDataTransporte,
  setIsFetchingTransporte,
} from "../../../../api/actions/transporte/transportistaActions";
import CardPermisos from "../../../widgets/card-permiso/CardPermiso";
//import { setIsHeader } from '../../../api/actions/commonActions';
import useStyles from "./transportistasMain.styles";

export default function TransportistasMain() {
  const classes = useStyles();
  //const { empresas } = useSelector((state: any) => state.transportistas);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    //dispatch(setIsHeader(true))
    //if (!empresas.length) {
      dispatch(setIsFetchingTransporte(true));
      dispatch(getDataTransporte());
    
  }, []);

  return (
    <div className={classes.root}>
      <span className={classes.title}>TRANSPORTISTAS</span>
      <span className={classes.subtitle}>
        PANEL DE GESTIÓN DE TRASNPORTISTAS DE ALIMENTOS
      </span>
      <div className={classes.permisosContent}>
        <CardPermisos
          title="Ver Transportistas"
          subtitle="Lista de todos los Transportistas"
          onClick={"/transportistas/administrar"}
        />
        <CardPermisos
          title="Valor Único"
          subtitle="Para Localidad, Tipo de Alimentos a Transportar y Empresa"
          onClick={"/transportistas/claves"}
        />
        <CardPermisos
          title="Nuevo Transportista"
          subtitle="Agregar un nuevo Transportista"
          onClick={"/transportistas/form"}
        />
      </div>
    </div>
  );
}
