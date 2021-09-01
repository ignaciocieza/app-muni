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
import { parseDate, getFechaActa, sortByDateTwo } from "../utils";

function capitalizeFirstLetter(string) {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
}

/**
 * https://github.com/mbrn/material-table/issues/2557
 * @returns
 */
export default function AdministrarActas() {
  //const [isTablaCompleta, setIsTablaCompleta] = useState(false);
  const { permisos } = useSelector((state: any) => state.bromatologia);
  const { isFetchingBromatologia } = useSelector(
    (state: any) => state.bromatologia
  );
  const { errorDB } = useSelector((state: any) => state.bromatologia);
  const classes = useStyles();

  const columns = [
    {
      title: "Estado Comercio",
      field: "estadoComercio",
      headerStyle: {
        whiteSpace: "nowrap",
      },
      render: (row: any) =>row["estadoComercio"].toUpperCase()
    },
    {
      title: "Razon Social",
      field: "razonSocial",
      headerStyle: {
        whiteSpace: "nowrap",
      },
      render: (row: any) =>row["razonSocial"].toUpperCase()
    },
    {
      title: "Rubro",
      //field: "rubro",
      field: "rubroAux",
      render: (row: any) =>row["rubroAux"].toUpperCase(),
      headerStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Domicilio",
      field: "domicilio",
      headerStyle: {
        whiteSpace: "nowrap",
      },
      render: (row: any) =>row["domicilio"].toUpperCase()
    },
    {
      title: "Nombre Comercial",
      field: "nombreComercial",
      //export: false,
      headerStyle: {
        whiteSpace: "nowrap",
      },
      render: (row: any) =>row["nombreComercial"].toUpperCase()
    },
    // {
    //   title: "Fecha Antigua",
    //   field: "fechaActaAntigua",
    //   headerStyle: {
    //     whiteSpace: "nowrap",
    //   },
    //   customSort: (row, rowTwo) =>
    //     sortByDateTwo(row.fechaActaAntiguaSort, rowTwo.fechaActaAntiguaSort),
    //   // render: (row: any) => {
    //   //   return <span>{parseDate(row.fechaActaAntigua)}</span>;
    //   // },
    // },
    {
      title: "Fecha Reciente",
      field: "fechaActaUltima",
      headerStyle: {
        whiteSpace: "nowrap",
      },
      customSort: (row, rowTwo) =>
        sortByDateTwo(row.fechaActaUltimaSort, rowTwo.fechaActaUltimaSort),
      // render: (row: any) => {
      //   return <span>{parseDate(row.fechaActaUltima)}</span>;
      // },
    },
    {
      title: "Detalle Acta",
      //export: false,
      field: "detalleActaUltima",
      headerStyle: {
        whiteSpace: "nowrap",
      },
      render: (row: any) =>row["detalleActaUltima"].toUpperCase()
    },
    {
      title: "Expediente",
      field: "expediente",
      headerStyle: {
        whiteSpace: "nowrap",
      },
    },
  ];
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

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
      {/* <div
        style={{
          position: "absolute",
          top: "9.5%",
          right: "1.5%",
          display: "flex",
          zIndex: 1000,
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "1em", marginRight: 5 }}>
          Exportar tabla completa?
        </span>
        <input
          type="checkbox"
          name="isTablaCompleta"
          checked={isTablaCompleta}
          onChange={() => {
            setIsTablaCompleta((prev) => !prev);
          }}
        ></input>
      </div> */}
      <MaterialTable
        title={
          location.pathname === "/bromatologia/historial"
            ? "Historial Comercios"
            : "Administrar Comercios Activos"
        }
        columns={columns}
        options={{
          exportButton: true,
          //exportAllData: isTablaCompleta,
          exportAllData: true,
          filtering: true,
          // exportPdf: (tableColumns, tableData) => {
          //   console.log({ tableColumns, tableData });
          // },
        }}
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
                .map((item: any) => {
                  const auxUltima = getFechaActa(item.data, "ultima");
                  //const auxAntigua = getFechaActa(item.data, "antigua");

                  ///Formato para generar pdf
                  return {
                    ...item.valuesForm,
                    nombreComercial: capitalizeFirstLetter(
                      item.valuesForm.nombreComercial.toLocaleLowerCase()
                    ),
                    domicilio: capitalizeFirstLetter(
                      item.valuesForm.domicilio.toLocaleLowerCase()
                    ),
                    estadoComercio: capitalizeFirstLetter(
                      item.valuesForm.estadoComercio.toLocaleLowerCase()
                    ),
                    razonSocial: capitalizeFirstLetter(
                      item.valuesForm.razonSocial.toLocaleLowerCase()
                    ),
                    fechaActaUltima: parseDate(auxUltima?.fecha),
                    fechaActaUltimaSort: auxUltima?.fecha,
                    detalleActaUltima: capitalizeFirstLetter(
                      auxUltima?.inspeccionRealizada.toLocaleLowerCase()
                    ),
                    // fechaActaAntigua: parseDate(auxAntigua?.fecha),
                    // fechaActaAntiguaSort: auxAntigua?.fecha,
                    rubroAux:
                      item.valuesForm["rubro"]
                        ?.join?.(", ")
                        .toLocaleLowerCase() ??
                      capitalizeFirstLetter(
                        item.valuesForm["rubro"].toLocaleLowerCase()
                      ),
                  };
                })
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
            exportTitle: "Exportar",
            exportCSVName: "Exportar como CSV",
            exportPDFName: "Exportar como PDF",
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
