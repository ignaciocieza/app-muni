//@ts-nocheck
import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import MaterialTable from "material-table";
import {
  deletePermiso,
  setCurrentPermiso,
} from "../../../../api/actions/bromatologia/bromatologiaActions";
//import Spinner from '../../../widgets/with-spinner/Spinner';
import useStyles from "./administrarActas.styles";
import EditIcon from "@material-ui/icons/Edit";
import DetailsIcon from "@material-ui/icons/Details";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Spinner from "../../../widgets/with-spinner/Spinner";
import SnackBar from "../../../widgets/snack-bar/SnackBar";

export default function AdministrarActas() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { permisos } = useSelector((state: any) => state.bromatologia);
  const { isFetchingBromatologia } = useSelector(
    (state: any) => state.bromatologia
  );
  const { errorDB } = useSelector((state: any) => state.bromatologia);
  const classes = useStyles();
  const columns = [
    { title: "Estado Comercio", field: "estadoComercio" },
    { title: "Razon Social", field: "razonSocial" },
    {
      title: "Rubro",
      field: "rubro",
      render: (row: any) => row["rubro"]?.join?.(", ") ?? row["rubro"],
    },
    { title: "Domicilio", field: "domicilio" },
    { title: "Nombre Comercial", field: "nombreComercial" },
    { title: "Expediente", field: "expediente" },
  ];

  if (location.pathname === "/bromatologia/historial") {
    columns.splice(1, 0, { title: "Cese", field: "cese", type: "date" });
  }

  if (isFetchingBromatologia) {
    return <Spinner />;
  }

  return (
    <div className={classes.root}>
      {errorDB && (
        <SnackBar
          message={errorDB}
          variant="error"
          hPosition="right"
          isResetErrors={true}
        />
      )}
      <MaterialTable
        title={
          location.pathname === "/bromatologia/historial"
            ? "Historial Comercios"
            : "Administrar Comercios Activos"
        }
        columns={columns}
        icons={{
          Delete: forwardRef((props, ref) => (
            <DeleteOutlineIcon {...props} ref={ref} />
          )),
        }}
        //@ts-ignore
        data={
          permisos
            ? Object.values(permisos)
                .filter((item: any) => {
                  if (location.pathname === "/bromatologia/historial") {
                    return (
                      item.valuesForm.estadoComercio.toLowerCase() === "cese"
                    );
                  } else {
                    return (
                      item.valuesForm.estadoComercio.toLowerCase() !== "cese"
                    );
                  }
                })
                .map((item: any) => item.valuesForm)
            : []
        }
        //data={[{},{}]}
        //options={{ pageSize: 10 }}
        localization={{
          body: {
            emptyDataSourceMessage: "No hay items para mostrar",
            deleteTooltip: "Borrar",
            editRow: {
              deleteText: "¿Desea borrar definitivamente?",
              saveTooltip: "Aceptar",
              cancelTooltip: "Cancelar",
            },
          },
          header: {
            actions: "Acciones",
          },
          pagination: {
            labelRowsSelect: "renglones",
          },
          toolbar: {
            searchPlaceholder: "Buscar...",
          },
        }}
        editable={{
          onRowDelete: (oldData: any) =>
            new Promise((resolve) => {
              setTimeout(() => {
                //@ts-ignore
                resolve();
                dispatch(deletePermiso(oldData.expediente));
              }, 100);
            }),
        }}
        actions={[
          {
            //icon: "edit",
            icon: EditIcon,
            tooltip: "Editar",
            onClick: (event, rowData) => {
              dispatch(setCurrentPermiso(rowData.expediente));
              history.push("/bromatologia/form");
            },
          },
          // {
          //     icon: 'delete',
          //     tooltip: 'Borrar',
          //     onClick: (event, rowData) => {
          //         dispatch(deleteUser(rowData.dni));
          //         //console.dir(rowData.dni);
          //         //history.push('/');
          //     }
          // },
          {
            //icon: "details",
            icon: DetailsIcon,
            tooltip: "Detalle",
            onClick: (event, rowData) => {
              dispatch(setCurrentPermiso(rowData.expediente));
              history.push(`/bromatologia/detail/${rowData.expediente}`);
            },
          },
        ]}
      />
    </div>
  );
}
