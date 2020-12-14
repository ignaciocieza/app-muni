import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import { Grid, TextField, Button, Tooltip } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import DateFnsUtils from "@date-io/date-fns";
import esLocale from "date-fns/locale/es";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  setCurrentPermiso,
  setPermisoBromatologia,
} from "../../../../api/actions/bromatologia/bromatologiaActions";
import useStyles from "./nuevaActa.styles";
import { useHistory } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  nombreComercial: Yup.string()
    .nullable(true)
    .required("Debe ingresar un Nombre Comercial"),
  rubro: Yup.string().nullable(true).required("Debe ingresar un rubro"),
  razonSocial: Yup.string()
    .nullable(true)
    .required("Debe ingresar una razón social"),
  domicilio: Yup.string().required("Debe ingresar un domicilio"),
  expediente: Yup.string().required("Debe ingresar un número de expediente"),
});

/**
 * (https://material-table.com/#/docs/features/editable)
 * @param param0
 */
export default function NuevaActa() {
  const classes = useStyles();
  const [status, setStatus] = useState("none");
  const { currentPermiso } = useSelector((state: any) => state.bromatologia);
  const { rubro } = useSelector((state: any) => state.bromatologia);
  const { nombreComercial } = useSelector((state: any) => state.bromatologia);
  const { razonSocial } = useSelector((state: any) => state.bromatologia);
  const dispatch = useDispatch();
  const history = useHistory();
  const auxInitialValues = currentPermiso?.valuesForm
    ? currentPermiso.valuesForm
    : {
        nombreComercial: "",
        rubro: "",
        razonSocial: "",
        domicilio: "",
        expediente: "",
        inicio: "",
        cese: "",
      };
  const columns = [
    {
      title: "Acta",
      field: "acta",
      //type: "numeric",
      align: "left",
    },
    {
      title: "Fecha",
      field: "fecha",
      type: "date",
      editComponent: (props: any) => {
        return (
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                required
                emptyLabel="Ingrese Fecha"
                format="dd/MM/yyyy"
                margin="normal"
                id="fecha-picker-inline"
                disablePast={true}
                name="fecha"
                invalidDateMessage="Formato de la Fecha Inválido"
                invalidLabel="Ingrese la fecha del Acta"
                value={props.value || ""}
                onChange={(e) => {
                  props.onChange(e);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                //className={classes.fecha}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        );
      },
    },
    {
      title: "INSPECCION REALIZADA",
      field: "inspeccionRealizada",
      editComponent: (props: any) => (
        <textarea
          required
          name="inspeccionRealizada"
          className={classes.textArea}
          placeholder="Detalles de la inspección"
          onChange={(e) => props.onChange(e.target.value)}
          value={props.value}
        />
      ),
    },
  ];
  const [data, setData] = useState(currentPermiso?.data ?? []);
  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    values,
  } = useFormik({
    initialValues: auxInitialValues,
    onSubmit: (valuesForm) => {
      console.log(status);
      dispatch(setPermisoBromatologia({ valuesForm, data }));
      dispatch(setCurrentPermiso(values.expediente));
      if (status === "guardar") {
        history.push("/bromatologia/administrar");
      }
      if (status === "imprimir") {
        history.push(`/bromatologia/detail/${values.expediente}`);
      }
    },
    validationSchema: LoginSchema,
  });

  return (
    <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
      <span className={classes.title}>FORMULARIO DE BROMATOLOGIA</span>
      <span className={classes.subtitle}>* NOMBRE COMERCIAL</span>
      <Autocomplete
        id="combo-box-demo"
        options={nombreComercial}
        className={classes.textfield}
        onChange={(event, newEvent) => {
          setFieldValue("nombreComercial", newEvent, true);
        }}
        value={values.nombreComercial}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            variant="outlined"
            error={!!errors.nombreComercial}
            helperText={errors.nombreComercial}
          />
        )}
      />
      <span className={classes.subtitle}>* RUBRO</span>
      <Autocomplete
        id="combo-box-rubro"
        options={rubro}
        className={classes.textfield}
        onChange={(event, newEvent) => {
          setFieldValue("rubro", newEvent, true);
        }}
        value={values.rubro}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            variant="outlined"
            error={!!errors.rubro}
            helperText={errors.rubro}
          />
        )}
      />
      <span className={classes.subtitle}>* RAZON SOCIAL</span>
      <Autocomplete
        id="combo-box-razonSocial"
        options={razonSocial}
        className={classes.textfield}
        onChange={(event, newEvent) => {
          setFieldValue("razonSocial", newEvent, true);
        }}
        value={values.razonSocial}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            variant="outlined"
            error={!!errors.razonSocial}
            helperText={errors.razonSocial}
          />
        )}
      />
      <span className={classes.subtitle}>* DOMICILIO</span>
      <TextField
        variant="outlined"
        required
        name="domicilio"
        value={values.domicilio}
        className={classes.textfield}
        onChange={handleChange}
        error={!!errors.domicilio}
        helperText={errors.domicilio}
      />
      <span className={classes.subtitle}>* EXPEDIENTE</span>
      <TextField
        variant="outlined"
        required
        name="expediente"
        value={values.expediente}
        className={classes.textfield}
        onChange={handleChange}
        error={!!errors.expediente}
        helperText={errors.expediente}
      />
      <span className={classes.subtitle}>INICIO</span>
      <TextField
        variant="outlined"
        name="inicio"
        value={values.inicio}
        className={classes.textfield}
        onChange={handleChange}
      />
      <span className={classes.subtitle}>CESE</span>
      <TextField
        variant="outlined"
        name="cese"
        value={values.cese}
        className={classes.textfield}
        onChange={handleChange}
      />
      <div className={classes.contentMaterialTable}>
        <div className={classes.materialTable}>
        <MaterialTable
          style={{ width: '100%'}}
          title=""
          //@ts-ignore
          columns={columns}
          data={data}
          localization={{
            body: {
              emptyDataSourceMessage: "No hay items para mostrar",
              deleteTooltip: "Borrar",
              editTooltip: "Editar",
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
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData: any) => {
              console.dir({ newData, oldData });
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);
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
                  resolve();
                }, 1000);
              }),
          }}
        />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "80%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tooltip title="Guardar e ir a Administrar Comercios">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<ArrowBackIosIcon />}
            type="submit"
            onClick={() => {
              //submitForm();
              setStatus("guardar");
              //history.push("/bromatologia/administrar");
            }}
          >
            Guardar
          </Button>
        </Tooltip>
        <Tooltip title="Ir a Imprimir">
          <Button
            variant="contained"
            color="secondary"
            className={classes.buttonImprimir}
            //style={{ opacity: 0.8 }}
            endIcon={<ArrowForwardIosIcon />}
            type="submit"
            onClick={() => {
              // dispatch(setPermisoBromatologia({ valuesForm:values, data }));
              // dispatch(setCurrentPermiso(values.expediente));
              //submitForm();
              setStatus("imprimir");
              //console.dir(submitCount)
              //history.push(`/bromatologia/detail/${values.expediente}`);
            }}
          >
            Imprimir
          </Button>
        </Tooltip>
      </div>
    </form>
  );
}
