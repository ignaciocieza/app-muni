import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  TextField,
  Button,
  Tooltip,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
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
import { parseDate, sortByDate } from "../utils";
import AutocompleteCustom from "../../../widgets/bromatologia/autocomplete-valorunico/AutocompleteCustom";
import Tabla from "../../../widgets/tabla-nuevo/Tabla";
import SnackBar from "../../../widgets/snack-bar/SnackBar";
import {
  setNombreComercial,
  setRazonSocial,
} from "../../../../api/actions/bromatologia/bromatologiaActions";
import { nanoid } from "nanoid";

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

const filter = createFilterOptions();

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
  const { errorDB } = useSelector((state: any) => state.bromatologia);
  const dispatch = useDispatch();

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
      defaultSort: "asc",
      customSort: sortByDate,
      render: (row: any) => <span>{parseDate(row["fecha"])}</span>,
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
                //disablePast={true}
                name="fecha"
                invalidDateMessage="Formato de la Fecha Inválido"
                invalidLabel="Ingrese la fecha del Acta"
                value={props.value || " "}
                onKeyPress={function (e) {
                  e.preventDefault();
                }}
                onChange={(e) => {
                  ///console.log(e)
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
  const { handleChange, handleSubmit, setFieldValue, errors, values } =
    useFormik({
      initialValues: currentPermiso?.valuesForm
        ? currentPermiso.valuesForm
        : {
            estadoComercio: "NO HABILITADOS",
            razonSocial: "",
            rubro: "",
            domicilio: "",
            nombreComercial: "",
            clave: "",
            expediente: `FaltaExpediente${nanoid(5)}`,
            inicio: "",
            cese: "",
          },
      onSubmit: (valuesForm) => {
        dispatch(
          setNombreComercial([...nombreComercial, valuesForm.nombreComercial])
        );
        //dispatch(setRubro([...rubro, valuesForm.rubro]));
        dispatch(setRazonSocial([...razonSocial, valuesForm.razonSocial]));
        dispatch(setPermisoBromatologia({ valuesForm, data }, status));
        dispatch(setCurrentPermiso(values.expediente));
      },
      validationSchema: LoginSchema,
    });

  return (
    <form
      className={classes.form}
      onSubmit={function (e) {
        e.preventDefault();
        handleSubmit(e);
      }}
      autoComplete="off"
    >
      {errorDB && (
        <SnackBar
          message={errorDB}
          variant="error"
          hPosition="right"
          isResetErrors={true}
        />
      )}
      <span className={classes.title}>FORMULARIO DE BROMATOLOGIA</span>
      <span className={classes.subtitle}>ESTADO COMERCIO</span>
      <Tooltip
        disableFocusListener={true}
        disableHoverListener={!!values.clave}
        title="Debe ingresar una clave para poder habilitar el comercio"
      >
        <FormControl
          variant="outlined"
          className={classes.formControl}
          disabled={!values.clave}
        >
          <Select
            value={values.estadoComercio}
            name="estadoComercio"
            onChange={handleChange}
            //label="Para habilitarse complete el campo clave"
          >
            <MenuItem value={"HABILITADOS"}>HABILITADOS</MenuItem>
            <MenuItem value={"NO HABILITADOS"}>NO HABILITADOS</MenuItem>
            <MenuItem value={"APÍCOLA"}>APÍCOLA</MenuItem>
            <MenuItem value={"ESCUELAS Y CENTROS"}>ESCUELAS Y CENTROS</MenuItem>
            <MenuItem value={"PRODUCTORES ARTESANALES"}>
              PRODUCTORES ARTESANALES
            </MenuItem>
            <MenuItem value={"CARRO GASTRONÓMICO"}>CARRO GASTRONÓMICO</MenuItem>
            <MenuItem value={"CESE"}>CESE</MenuItem>
          </Select>
        </FormControl>
      </Tooltip>
      <span className={classes.subtitle}> CLAVE</span>
      <TextField
        variant="outlined"
        name="clave"
        value={values.clave}
        className={classes.textfield}
        onChange={handleChange}
      />
      <span className={classes.subtitle}>* RAZÓN SOCIAL</span>
      <Autocomplete
        id="combo-box-razonSocial"
        options={razonSocial}
        className={classes.textfield}
        onChange={(event, newEvent) => {
          //setFieldValue("razonSocial", newEvent, true);
          setFieldValue(
            "razonSocial",
            newEvent?.replace?.("Agregar:", "").trim().toUpperCase(),
            true
          );
        }}
        value={values.razonSocial}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          // Suggest the creation of a new value
          if (params.inputValue !== "" && !filtered.length) {
            filtered.push(`Agregar: ${params.inputValue}`);
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        freeSolo
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
      <span className={classes.subtitle}>* RUBRO</span>
      <AutocompleteCustom
        //isCanAdd
        options={rubro}
        error={errors.rubro}
        className={classes.textfield}
        setFieldValue={setFieldValue}
        fieldName="rubro"
        values={values.rubro}
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
      <span className={classes.subtitle}>* NOMBRE COMERCIAL</span>
      <Autocomplete
        // getOptionSelected={(option, value) => {
        //   console.log(option); //--> para control de errores con los valores unicos
        //   console.log(value);
        //   return true;
        // }}
        id="combo-box-demo-nombrecomercial"
        options={nombreComercial}
        className={classes.textfield}
        onChange={(event, newEvent) => {
          //setFieldValue("nombreComercial", newEvent, true);
          setFieldValue(
            "nombreComercial",
            newEvent?.replace?.("Agregar:", "").trim().toUpperCase(),
            true
          );
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          // Suggest the creation of a new value
          if (params.inputValue !== "" && !filtered.length) {
            filtered.push(`Agregar: ${params.inputValue}`);
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        freeSolo
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
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline-inicio"
            //disablePast={true}
            name="inicio"
            invalidDateMessage="Formato de la Fecha Inválido"
            //invalidLabel='Ingrese la fecha de Inicio'
            value={values.inicio}
            error={false}
            onChange={(e) => {
              const aux = e || "";
              setFieldValue("inicio", aux, false);
            }}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            className={classes.fecha}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <span className={classes.subtitle}>CESE</span>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline-inicio"
            //disablePast={true}
            name="cese"
            invalidDateMessage="Formato de la Fecha Inválido"
            //invalidLabel='Ingrese la fecha de Inicio'
            value={values.cese}
            error={false}
            onChange={(e) => {
              const aux = e || "";
              setFieldValue("cese", aux, false);
            }}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            className={classes.fecha}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <Tabla
        //title="VEHÍCULOS"
        data={data}
        setData={setData}
        columns={columns}
      />
      <div
        style={{
          display: "flex",
          width: "80%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tooltip title="Guardar y ver Comercios">
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
