import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import { deletePermiso, setCurrentPermiso } from "../../../../api/actions/bromatologia/bromatologiaActions";
//import Spinner from '../../../widgets/with-spinner/Spinner';
import useStyles from "./administrarActas.styles";

export default function AdministrarActas() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { permisos } = useSelector((state: any) => state.bromatologia);
  const classes = useStyles();
  const columns = [
    { title: "Nombre Comercial", field: "nombreComercial" },
    { title: "Rubro", field: "rubro" },
    { title: "Razon Social", field: "razonSocial" },
    { title: "Domicilio", field: "domicilio" },
    { title: "Expediente", field: "expediente" },
  ];

  if (!permisos) {
    return null;
  }

  return (
    <div className={classes.root}>
      {/*(isFetchingMerge) ? <Spinner /> : (*/}
      <MaterialTable
        title="Administrar Actas"
        columns={columns}
        //@ts-ignore
        data={Object.values(permisos).map((item: any) => item.valuesForm)}
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
                resolve();
                dispatch(deletePermiso(oldData.expediente))
              }, 100);
            }),
        }}
        actions={[
          {
            icon: "edit",
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
            icon: "details",
            tooltip: "Detalle",
            onClick: (event, rowData) => {
              dispatch(setCurrentPermiso(rowData.expediente))
              history.push(`/bromatologia/detail/${rowData.expediente}`);
            },
          },
        ]}
      />
    </div>
  );
}
