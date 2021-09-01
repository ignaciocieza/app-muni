import React, { forwardRef } from "react";
import MaterialTable from "material-table";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import useStyles from "../../pages/transportistas/nuevo-transportista/nuevoTransportista.styles";
import { colors, isMobile } from "../../../constants";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

export default function Tabla({
  title,
  data,
  setData,
  columns,
}: {
  title?: string;
  data: any;
  setData: React.Dispatch<any>;
  columns: any;
}) {
  const classes = useStyles();
  //const [selectedRow, setSelectedRow] = useState(false);

  return (
    <>
      <span className={classes.title}>{title}</span>
      <div className={classes.contentMaterialTable}>
        <div className={classes.materialTable}>
          <MaterialTable
            style={{ width: "100%" }}
            title=""
            //@ts-ignore
            columns={columns}
            data={data}
            // data={[
            //   { inspeccionRealizada: "si" },
            //   { inspeccionRealizada: "no" },
            // ]}
            icons={{
              Add: forwardRef((props, ref) => (
                <AddBoxIcon
                  style={{ fontSize: "2.5rem", color: colors.blueOne }}
                  {...props}
                  ref={ref}
                />
              )),
              Delete: forwardRef((props, ref) => (
                <DeleteOutlineIcon {...props} ref={ref} />
              )),
              Check: forwardRef((props, ref) => (
                <CheckIcon {...props} ref={ref} />
              )),
              Clear: forwardRef((props, ref) => (
                <CloseIcon {...props} ref={ref} />
              )),
            }}
            //onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
            options={{
              //actionsColumnIndex: -1,
              addRowPosition: "first",
              toolbarButtonAlignment: isMobile ? "left" : "right",
              searchFieldAlignment: isMobile ? "left" : "right",
              //exportButton: true,
              //paging: false,
              tableLayout: "auto",
              // rowStyle: rowData => ({
              //   backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
              // })
            }}
            localization={{
              body: {
                emptyDataSourceMessage: "No hay items para mostrar",
                deleteTooltip: "Borrar",
                editTooltip: "Editar",
                addTooltip: "Agregar",
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
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    setData([...data, newData]);
                    //@ts-ignore
                    resolve();
                  }, 1000);
                }),
              onRowUpdate: (newData, oldData: any) => {
                //console.dir({ newData, oldData });
                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    //@ts-ignore
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);
                    //@ts-ignore
                    resolve();
                  }, 1000);
                });
              },
              onRowDelete: (oldData: any) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData([...dataDelete]);
                    //@ts-ignore
                    resolve();
                  }, 1000);
                }),
            }}
          />
        </div>
      </div>
    </>
  );
}
