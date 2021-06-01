import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import useStyles from "./listaViaPublica.styles";
import EditIcon from "@material-ui/icons/Edit";
import DetailsIcon from "@material-ui/icons/Details";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import {
  setCurrentRegistro,
  deleteRegistro,
} from "../../../../../api/actions/transporte/transportistaActions";
// import SnackBar from "../../../../widgets/snack-bar/SnackBar";
import Spinner from "../../../../widgets/with-spinner/Spinner";
import { parseDate, parseTime } from "../../../../../api/utils";
import { deleteRegistroViaPublica, setCurrentRegistroViaPublica } from "../../../../../api/actions/veterinaria/veterinariaActions";

const defaultCell = {
  cellStyle: {
    whiteSpace: "nowrap",
    textAlign: "center",
  },
  headerStyle: {
    textAlign: "center",
  },
};

export default function ListaViaPublica() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { registrosViaPublica } = useSelector(
    (state: any) => state.veterinaria
  );
  const { isFetchingRegistrosViaPublica } = useSelector(
    (state: any) => state.veterinaria
  );
  // const { errorDBtransporte } = useSelector(
  //   (state: any) => state.transportistas
  // );

  const classes = useStyles();

  const columns = [
    {
      title: "NÚMERO DE IDENTIFICACIÓN ANIMAL",
      field: "idAnimal",
      ...defaultCell,
    },
    {
      title: "FECHA",
      field: "fecha",
      render: (row: any) => <span>{parseDate(row["fecha"])}</span>,
      ...defaultCell,
    },
    {
      title: "HORA",
      field: "hora",
      render: (row: any) => <span>{parseTime(row["hora"])}</span>,
      ...defaultCell,
    },
    {
      title: "ESPECIE ANIMAL",
      field: "especieAnimal",
      ...defaultCell,
    },
    {
      title: "SEXO",
      field: "sexo",
      ...defaultCell,
    },
    {
      title: "LUGAR DE INTERVENCIÓN",
      field: "lugarIntervencion",
      ...defaultCell,
    },
    {
      title: "RECIBIDA POR",
      field: "recibidaPor",
      ...defaultCell,
    },
    {
      title: "APELLIDO Y NOMBRE",
      field: "apellidoNombre",
      ...defaultCell,
    },
    {
      title: "DNI",
      field: "dni",
      ...defaultCell,
    },
    {
      title: "DIRECCIÓN",
      field: "direccion",
      ...defaultCell,
    },
    {
      title: "TELÉFONOS",
      field: "telefonos",
      ...defaultCell,
    },
  ];

  if (isFetchingRegistrosViaPublica) {
    return <Spinner />;
  }

  return (
    <div className={classes.root}>
      {/* {errorDBtransporte && (
        <SnackBar
          message={errorDBtransporte}
          variant="error"
          hPosition="right"
          isResetErrors={true}
        />
      )} */}
      <MaterialTable
        title={"Administrar Cuidado Animal"}
        //@ts-ignore
        columns={columns}
        icons={{
          Delete: forwardRef((props, ref) => (
            <DeleteOutlineIcon {...props} ref={ref} />
          )),
        }}
        //@ts-ignore
        data={Object.values(registrosViaPublica).map(
          (item: any) => item.valuesForm
        )}
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
                dispatch(deleteRegistroViaPublica(oldData.idAnimal));
              }, 100);
            }),
        }}
        // detailPanel={[
        //   {
        //     tooltip: "Show Name",
        //     render: (rowData) => {
        //       // console.log(rowData);
        //       // console.log(registros[rowData.empresa].vehiculos);
        //       return (
        //         <Tabla
        //           title="VEHÍCULOS"
        //           data={registros[rowData.empresa].vehiculos}
        //           setData={setVehiculos}
        //           columns={columnsVehiculo}
        //         />
        //         // <span>hola</span>
        //       );
        //     },
        //   },
        // ]}
        actions={[
          {
            //icon: "edit",
            icon: EditIcon,
            tooltip: "Editar",
            onClick: (event, rowData) => {
              dispatch(setCurrentRegistroViaPublica(rowData.idAnimal));
              history.push("/veterinaria/viapublica/form");
            },
          },
          // {
          //   icon: DetailsIcon,
          //   tooltip: "Detalle",
          //   onClick: (event, rowData) => {
          //     // dispatch(setCurrentRegistro(rowData.idAnimal));
          //     // history.push(`/transportistas/detail/${rowData.idAnimal}`);
          //   },
          // },
        ]}
      />
    </div>
  );
}
