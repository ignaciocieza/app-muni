//@ts-nocheck
import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import useStyles from "./listaTransportistas.styles";
import EditIcon from "@material-ui/icons/Edit";
import DetailsIcon from "@material-ui/icons/Details";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import {
  setCurrentRegistro,
  deleteRegistro,
} from "../../../../api/actions/transporte/transportistaActions";
import SnackBar from "../../../widgets/snack-bar/SnackBar";
import Spinner from "../../../widgets/with-spinner/Spinner";
//import { host } from "../../../../constants";

//const isSameHostName = window.location.host === host;
const isSameHostName = true;

export default function ListaTransportistas() {
  // const [isTablaCompleta, setIsTablaCompleta] = useState(false);
  const { registros } = useSelector((state: any) => state.transportistas);
  const { isFetchingRegistrosTransporte } = useSelector(
    (state: any) => state.transportistas
  );
  const { errorDBtransporte } = useSelector(
    (state: any) => state.transportistas
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const columns = [
    {
      title: "Empresa",
      field: "empresa",
      defaultSort: "asc",
      cellStyle: {
        whiteSpace: "nowrap",
        textAlign: "center",
      },
      headerStyle: {
        textAlign: "center",
      },
    },
    // { title: "Apellido y Nombre", field: "apellidoYNombre" },
    // { title: "CUIL - CUIT", field: "cuilCuit" },
    // { title: "Domicilio", field: "domicilio" },
    // { title: "Localidad", field: "localidad" },
    // {
    //   title: "Tipo Alimento A Transportar",
    //   field: "tipoAlimentoTransportar",
    //   render: (row: any) =>
    //     row["tipoAlimentoTransportar"]?.join?.(", ") ??
    //     row["tipoAlimentoTransportar"],
    // },
    // { title: "Telefono", field: "telefono" },
    // { title: "Nro. Habilitación SENASA", field: "nroSenasa" },
    // { title: "Nro. Habilitación Municipal", field: "nroMunicipal" },
    // {
    //   title: "Vencimiento",
    //   field: "vencimiento",
    //   render: (row: any) => <span>{parseDate(row["vencimiento"])}</span>,
    // },

    //Datos para el vehiculo y chofer /// Hacer dos listas: 1) Vehiculo 2)chofer
    // { title: "Dominio", field: "dominio" },
    // { title: "Marca", field: "marca" },
    // { title: "Modelo Año", field: "modeloAño" },
    // { title: "Equipo de Frio", field: "equipoFrio" },
  ];

  if (isFetchingRegistrosTransporte) {
    return <Spinner />;
  }

  return (
    <div className={classes.root}>
      {errorDBtransporte && (
        <SnackBar
          message={errorDBtransporte}
          variant="error"
          hPosition="right"
          isResetErrors={true}
        />
      )}
        {/* <div
        style={{
          position: "absolute",
          top: "11.5%",
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
        title={"Administrar Transportistas"}
        columns={columns}
        icons={{
          Delete: forwardRef((props, ref) => (
            <DeleteOutlineIcon {...props} ref={ref} />
          )),
        }}
        options={{
          //exporta solamente lo que se muestra en pantalla
          exportButton: true,
          //exportAllData: isTablaCompleta,
          exportAllData:true
        }}
        //@ts-ignore
        data={Object.values(registros).map((item: any) => item.valuesForm)}
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
        editable={isSameHostName &&{
          onRowDelete: (oldData: any) =>
            new Promise((resolve) => {
              setTimeout(() => {
                //@ts-ignore
                resolve();
                dispatch(deleteRegistro(oldData.empresa));
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
          isSameHostName && {
            //icon: "edit",
            icon: EditIcon,
            tooltip: "Editar",
            onClick: (event, rowData) => {
              dispatch(setCurrentRegistro(rowData.empresa));
              history.push("/transportistas/form");
            },
          },
          {
            icon: DetailsIcon,
            tooltip: "Detalle",
            onClick: (event, rowData) => {
              dispatch(setCurrentRegistro(rowData.empresa));
              history.push(`/transportistas/detail/${rowData.empresa}`);
            },
          },
        ]}
      />
    </div>
  );
}
