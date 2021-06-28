import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataTransporte,
  setIsFetchingTransporte,
} from "../../../../api/actions/transporte/transportistaActions";
import CardPermisos from "../../../widgets/card-permiso/CardPermiso";
//import { setIsHeader } from '../../../api/actions/commonActions';
import useStyles from "./veterinariaMain.styles";

export default function VeterinariaMain() {
  const classes = useStyles();
  const { empresas } = useSelector((state: any) => state.transportistas);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    //dispatch(setIsHeader(true))
    // if (!empresas.length) {
    //   dispatch(setIsFetchingTransporte(true));
    //   dispatch(getDataTransporte());
    // }
  }, []);

  return (
    <div className={classes.root}>
      <span className={classes.title}>CUIDADO ANIMAL</span>
      <span className={classes.subtitle}>PANEL DE GESTIÓN DE CUIDADO ANIMAL</span>
      <div className={classes.permisosContent}>
        <CardPermisos
          title="Intervención en vía pública"
          subtitle="Ver lista de Solicitudes"
          onClick={"/veterinaria/viapublica/lista"}
        />
        <CardPermisos
          title="Valor Único"
          subtitle="Para Raza y Color de animales"
          onClick={"/veterinaria/viapublica/claves"}
        /> 
        <CardPermisos
          title="Nueva Solicitud"
          subtitle="Agregar una solicitud de Intervención en vía pública"
          onClick={"/veterinaria/viapublica/form"}
        />
      </div>
    </div>
  );
}
