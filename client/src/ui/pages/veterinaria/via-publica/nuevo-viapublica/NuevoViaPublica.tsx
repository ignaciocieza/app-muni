import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Tooltip,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { useFormik } from "formik";
import * as Yup from "yup";
import useStyles from "./nuevoViaPublica.styles";
import { useHistory } from "react-router-dom";
//import AutocompleteCustom from "../../../../widgets/bromatologia/autocomplete-valorunico/AutocompleteCustom";
import {
  setEspeciesAnimales,
  setColores,
  setRegistroViaPublica,
} from "../../../../../api/actions/veterinaria/veterinariaActions";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import esLocale from "date-fns/locale/es";
import ImagePicker from "../../../../widgets/image-picker/ImagePicker";
import { nanoid } from "nanoid";

const errorMsj = "Campo Requerido!";

const LoginSchema = Yup.object().shape({
  lugarIntervencion: Yup.string().required(errorMsj),
  fecha: Yup.string().nullable(true).required(errorMsj),
  hora: Yup.string().nullable(true).required(errorMsj),
  recibidaPor: Yup.string().required(errorMsj),
  apellidoNombre: Yup.string().required(errorMsj),
  dni: Yup.string().required(errorMsj),
  direccion: Yup.string().required(errorMsj),
  telefonos: Yup.string().required(errorMsj),
  caracteristicaDenuncia: Yup.string().required(errorMsj),
  especieAnimal: Yup.string().required(errorMsj),
  peso: Yup.string().required(errorMsj),
  sexo: Yup.string().required(errorMsj),
  color: Yup.string().required(errorMsj),
  accionesRealizadas: Yup.string().required(errorMsj),
  medicacionSuministrada: Yup.string().required(errorMsj),
  estadoActuacion: Yup.string().required(errorMsj),
});
const filter = createFilterOptions();
// //@ts-ignore
// let auxIdVehiculo = [];

export default function NuevoViaPublica() {
  const [status, setStatus] = useState("none");
  const { especiesAnimales } = useSelector((state: any) => state.veterinaria);
  const { colores } = useSelector((state: any) => state.veterinaria);
  const { currentRegistroViaPublica } = useSelector(
    (state: any) => state.veterinaria
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const { handleChange, handleSubmit, setFieldValue, errors, values } =
    useFormik({
      initialValues: currentRegistroViaPublica?.valuesForm
        ? currentRegistroViaPublica.valuesForm
        : {
            fecha: "",
            lugarIntervencion: "",
            hora: "",
            recibidaPor: "",
            apellidoNombre: "",
            dni: "",
            direccion: "",
            telefonos: "",
            caracteristicaDenuncia: "",
            especieAnimal: "",
            peso: "",
            sexo: "",
            color: "",
            accionesRealizadas: "",
            medicacionSuministrada: "",
            estadoActuacion: "",
            imagenAnimal: "",
            idAnimal: nanoid(),
          },
      onSubmit: (valuesForm) => {
        if (especiesAnimales?.indexOf(valuesForm.especieAnimal) === -1) {
          dispatch(
            setEspeciesAnimales([...especiesAnimales, valuesForm.especieAnimal])
          );
        }
        if (colores?.indexOf(valuesForm.color) === -1) {
          dispatch(setColores([...colores, valuesForm.color]));
        }
        if (status === "guardar") {
          dispatch(setRegistroViaPublica({ valuesForm }));
          history.push("/veterinaria/viapublica/lista");
        }
        // if (status === "imprimir") {
        //  dispatch(setCurrentRegistro(valuesForm?.empresa));
        //   history.push(`/transportistas/detail/${valuesForm.empresa}`);
        // }
      },
      validationSchema: LoginSchema,
    });

  //https://material-ui.com/components/autocomplete/
  return (
    <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
      {/* {errorDBtransporte && (
        <SnackBar
          message={errorDBtransporte}
          variant="error"
          hPosition="right"
          isResetErrors={true}
        />
      )} */}
      <span className={classes.title}>
        SOLICITUD DE INTERVENCION EN VIA PÚBLICA
      </span>
      <span className={classes.subtitle}>NÚMERO DE IDENTIFICACIÓN ANIMAL</span>
      <TextField
        required
        variant="outlined"
        disabled
        value={values.idAnimal}
        className={classes.textfield}
      />
      <span className={classes.subtitle}>* LUGAR DE LA INTERVENCIÓN</span>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select
          required
          error={!!errors.lugarIntervencion}
          value={values.lugarIntervencion}
          name="lugarIntervencion"
          onChange={handleChange}
          //label="Para habilitarse complete el campo clave"
        >
          <MenuItem value={"VÍA PÚBLICA"}>VÍA PÚBLICA</MenuItem>
          <MenuItem value={"ASISTENCIA EN ALBERGUE"}>
            ASISTENCIA EN ALBERGUE
          </MenuItem>
        </Select>
      </FormControl>
      <span className={classes.subtitle}>* FECHA</span>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
        <KeyboardDatePicker
          inputVariant="outlined"
          required
          disableToolbar
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline-inicio"
          //disablePast={true}
          name="fecha"
          invalidDateMessage="Formato de la Fecha Inválido"
          //invalidLabel='Ingrese la fecha de Inicio'
          value={values.fecha}
          error={!!errors.fecha}
          onChange={(e) => {
            const aux = e || "";
            setFieldValue("fecha", aux, false);
          }}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          className={classes.fecha}
        />
      </MuiPickersUtilsProvider>
      <span className={classes.subtitle}>* HORA</span>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
        <KeyboardTimePicker
          required
          inputVariant="outlined"
          margin="normal"
          id="time-picker"
          name="hora"
          value={values.hora}
          error={!!errors.hora}
          onChange={(e) => {
            const aux = e || "";
            setFieldValue("hora", aux, false);
          }}
          KeyboardButtonProps={{
            "aria-label": "change time",
          }}
          className={classes.fecha}
        />
      </MuiPickersUtilsProvider>
      <span className={classes.subtitle}>* RECIBIDA POR</span>
      <TextField
        required
        variant="outlined"
        name="recibidaPor"
        value={values.recibidaPor}
        className={classes.textfield}
        onChange={handleChange}
        error={!!errors.recibidaPor}
        helperText={errors.recibidaPor}
      />
      <span className={classes.title}>NOTIFICADOR Y/O DENUNCIANTE</span>
      <span className={classes.subtitle}>* APELLIDO Y NOMBRE</span>
      <TextField
        required
        variant="outlined"
        name="apellidoNombre"
        value={values.apellidoNombre}
        className={classes.textfield}
        onChange={handleChange}
        error={!!errors.apellidoNombre}
        helperText={errors.apellidoNombre}
      />
      <span className={classes.subtitle}>* DNI</span>
      <TextField
        required
        variant="outlined"
        name="dni"
        value={values.dni}
        className={classes.textfield}
        onChange={handleChange}
        error={!!errors.dni}
        helperText={errors.dni}
      />
      <span className={classes.subtitle}>* DIRECCIÓN</span>
      <TextField
        required
        variant="outlined"
        name="direccion"
        value={values.direccion}
        className={classes.textfield}
        onChange={handleChange}
        error={!!errors.direccion}
        helperText={errors.direccion}
      />
      <span className={classes.subtitle}>* TELÉFONOS</span>
      <TextField
        required
        variant="outlined"
        name="telefonos"
        value={values.telefonos}
        className={classes.textfield}
        onChange={handleChange}
        error={!!errors.telefonos}
        helperText={errors.telefonos}
      />
      <span className={classes.subtitle}>
        * CARACTERISTICAS DE LA DENUNCIA Y/O NOTIFICACIÓN
      </span>
      <textarea
        required
        name="caracteristicaDenuncia"
        className={classes.textArea}
        placeholder="Detalles de la inspección"
        onChange={handleChange}
        value={values.caracteristicaDenuncia}
      />
      <span className={classes.title}>ACTUACIÓN VETERINARIA</span>
      <span className={classes.subtitle}>* ESPECIE ANIMAL</span>
      <Autocomplete
        value={values.especieAnimal}
        className={classes.autoComplete}
        onChange={(event, newValue) => {
          setFieldValue(
            "especieAnimal",
            newValue?.replace?.("Agregar:", "").trim().toUpperCase(),
            true
          );
        }}
        //@ts-ignore
        filterOptions={(options, params) => {
          //@ts-ignore
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
        id="free-solo-with-text-demo"
        options={especiesAnimales}
        //style={{ width: 500, marginTop: "2%" }}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            required
            variant="outlined"
            error={!!errors.especieAnimal}
            helperText={errors.especieAnimal || " "}
          />
        )}
      />
      <span className={classes.subtitle}>* PESO</span>
      <TextField
        required
        variant="outlined"
        name="peso"
        value={values.peso}
        className={classes.textfield}
        onChange={handleChange}
        error={!!errors.peso}
        helperText={errors.peso}
      />
      <span className={classes.subtitle}>* SEXO</span>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select
          required
          error={!!errors.sexo}
          value={values.sexo}
          name="sexo"
          onChange={handleChange}
          //label="Para habilitarse complete el campo clave"
        >
          <MenuItem value={"MACHO"}>MACHO</MenuItem>
          <MenuItem value={"HEMBRA"}>HEMBRA</MenuItem>
        </Select>
      </FormControl>
      <span className={classes.subtitle}>* COLOR</span>
      <Autocomplete
        value={values.color}
        className={classes.autoComplete}
        onChange={(event, newValue) => {
          setFieldValue(
            "color",
            newValue?.replace?.("Agregar:", "").trim().toUpperCase(),
            true
          );
        }}
        //@ts-ignore
        filterOptions={(options, params) => {
          //@ts-ignore
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
        id="free-solo-with-text-demo"
        options={colores}
        //style={{ width: 500, marginTop: "2%" }}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            required
            variant="outlined"
            error={!!errors.color}
            helperText={errors.color || " "}
          />
        )}
      />
      <span className={classes.subtitle}>* ACCIONES REALIZADAS</span>
      <textarea
        required
        name="accionesRealizadas"
        className={classes.textArea}
        placeholder="Detalles de la inspección"
        onChange={handleChange}
        value={values.accionesRealizadas}
      />
      <span className={classes.subtitle}>* MEDICACIÓN SUMINISTRADA</span>
      <textarea
        required
        name="medicacionSuministrada"
        className={classes.textArea}
        placeholder="Detalles de la inspección"
        onChange={handleChange}
        value={values.medicacionSuministrada}
      />
      {/* <span className={classes.subtitle}>* DOSIS</span> */}
      <span className={classes.subtitle}>* ESTADO DE LA ACTUACÍON</span>{" "}
      <FormControl variant="outlined" className={classes.formControl}>
        <Select
          value={values.estadoActuacion}
          name="estadoActuacion"
          onChange={handleChange}
          //label="Para habilitarse complete el campo clave"
        >
          <MenuItem value={"CERRADA"}>CERRADA</MenuItem>
          <MenuItem value={"EN TRATAMIENTO"}>EN TRATAMIENTO</MenuItem>
        </Select>
      </FormControl>
      <ImagePicker
        title="ADJUNTAR IMAGEN"
        currentImg={values.imagenAnimal}
        dispatch={(e: any) => {
          const aux = e || "";
          setFieldValue("imagenAnimal", aux, false);
        }}
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
            //startIcon={<ArrowBackIosIcon />}
            type="submit"
            onClick={() => {
              setStatus("guardar");
            }}
          >
            Guardar
          </Button>
        </Tooltip>
        {/* <Tooltip title="Ir a Imprimir">
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
              //setStatus("imprimir");
              //console.dir(submitCount)
              //history.push(`/bromatologia/detail/${values.expediente}`);
            }}
          >
            Imprimir
          </Button>
        </Tooltip> */}
      </div>
    </form>
  );
}
