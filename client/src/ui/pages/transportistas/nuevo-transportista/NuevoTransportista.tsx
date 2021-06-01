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
import useStyles from "./nuevoTransportista.styles";
import { useHistory } from "react-router-dom";
import AutocompleteCustom from "../../../widgets/bromatologia/autocomplete-valorunico/AutocompleteCustom";
import {
  setRegistroTransportista,
  setCurrentRegistro,
  setEmpresas,
} from "../../../../api/actions/transporte/transportistaActions";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import esLocale from "date-fns/locale/es";
import { colors } from "../../../../constants";
import { parseDate } from "../utils";
import Tabla from "../../../widgets/tabla-nuevo/Tabla";
import SnackBar from "../../../widgets/snack-bar/SnackBar";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const LoginSchema = Yup.object().shape({
  empresa: Yup.string().nullable(true).required("Debe ingresar una empresa"),
  // localidad: Yup.string().nullable(true).required("Debe ingresar un localidad"),
  // tipoAlimentoTransportar: Yup.string()
  //   .nullable(true)
  //   .required("Debe ingresar una tipo de alimento a transportar"),
  // ///////
  // apellidoYNombre: Yup.string().required("Debe ingresar un nombre y apellido"),
  // dominio: Yup.string().required("Debe ingresar un dominio"),
  // marca: Yup.string().required("Debe ingresar una marca"),
  // modeloAño: Yup.string().required("Debe ingresar un modelo año"),
});
const filter = createFilterOptions();
//@ts-ignore
let auxIdVehiculo = [];

export default function NuevoTransportista() {
  const classes = useStyles();
  const [status, setStatus] = useState("none");
  const { localidades } = useSelector((state: any) => state.transportistas);
  const { tipoAlimentosTransportar } = useSelector(
    (state: any) => state.transportistas
  );
  const { empresas } = useSelector((state: any) => state.transportistas);
  const { currentRegistro } = useSelector((state: any) => state.transportistas);
  const { errorDBtransporte } = useSelector(
    (state: any) => state.transportistas
  );
  const [vehiculos, setVehiculos] = useState(currentRegistro?.vehiculos ?? []);
  const [choferes, setChoferes] = useState(currentRegistro?.choferes ?? []);
  const dispatch = useDispatch();
  const history = useHistory();
  const auxInitialValues = currentRegistro?.valuesForm
    ? currentRegistro.valuesForm
    : {
        empresa: "",
        // nroSenasa: "", //
        // nroMunicipal: "",
        // cuilCuit: "", //
        // apellidoYNombre: "", //
        // domicilio: "", //
        // telefono: "", //
        // localidad: "", //
        // tipoAlimentoTransportar: "", //

        // empresa: "", //
        // vencimiento: "",
      };

  const { handleSubmit, setFieldValue, errors, values } = useFormik({
    initialValues: auxInitialValues,
    onSubmit: (valuesForm) => {
      dispatch(setRegistroTransportista({ valuesForm, vehiculos, choferes }));
      dispatch(setCurrentRegistro(valuesForm?.empresa));

      //guarda la empresa si no existe en esa lista empresa
      if (empresas?.indexOf(valuesForm.empresa) === -1) {
        dispatch(setEmpresas([...empresas, valuesForm.empresa]));
      }
      if (status === "guardar") {
        history.push("/transportistas/administrar");
      }
      if (status === "imprimir") {
        history.push(`/transportistas/detail/${valuesForm.empresa}`);
      }
    },
    validationSchema: LoginSchema,
  });

  const columnsVehiculo = [
    {
      title: "ID VEHÍCULO",
      field: "idVehiculo",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      editComponent: (props: any) => (
        <TextField
          variant="outlined"
          required
          name="idVehiculo"
          value={props.value}
          className={classes.textfield}
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
        />
      ),
    },
    {
      title: "APELLIDO Y NOMBRE",
      field: "apellidoYNombre",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      editComponent: (props: any) => (
        <TextField
          variant="outlined"
          required
          name="apellidoYNombre"
          value={props.value}
          className={classes.textfield}
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
        />
      ),
    },
    {
      title: "CUIL - CUIT",
      field: "cuilCuit",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      editComponent: (props: any) => (
        <TextField
          variant="outlined"
          required
          name="cuilCuit"
          value={props.value}
          className={classes.textfield}
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
        />
      ),
    },
    {
      title: "DOMICILIO",
      field: "domicilio",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      editComponent: (props: any) => (
        <TextField
          variant="outlined"
          required
          name="domicilio"
          value={props.value}
          className={classes.textfield}
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
        />
      ),
    },
    {
      title: "LOCALIDAD",
      field: "localidad",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      editComponent: (props: any) => (
        <Autocomplete
          id="combo-box-razonSocial"
          options={localidades}
          className={classes.textfield}
          onChange={(event, newEvent) => {
            props.onChange(newEvent);
          }}
          value={props.value}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              variant="outlined"
              // error={!!errors.localidad}
              // helperText={errors.localidad}
            />
          )}
        />
      ),
    },
    {
      title: "TIPO DE ALIMENTO A TRANSPORTAR",
      field: "tipoAlimentoTransportar",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (row: any) =>
        row["tipoAlimentoTransportar"]?.join?.(", ") ??
        row["tipoAlimentoTransportar"],

      editComponent: (props: any) => (
        <AutocompleteCustom
          options={tipoAlimentosTransportar}
          //error={errors.tipoAlimentoTransportar}
          className={classes.textfield}
          //setFieldValue={setFieldValue}
          setOnChange={props.onChange}
          fieldName="tipoAlimentoTransportar"
          values={props.value}
        />
      ),
    },
    {
      title: "TELÉFONO",
      field: "telefono",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      editComponent: (props: any) => (
        <TextField
          variant="outlined"
          required
          name="telefono"
          value={props.value}
          className={classes.textfield}
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
        />
      ),
    },
    {
      title: "DOMINIO",
      field: "dominio",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      editComponent: (props: any) => (
        <TextField
          variant="outlined"
          required
          name="dominio"
          value={props.value}
          className={classes.textfield}
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
        />
      ),
    },
    {
      title: "MARCA",
      field: "marca",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      editComponent: (props: any) => (
        <TextField
          variant="outlined"
          required
          name="marca"
          value={props.value}
          className={classes.textfield}
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
        />
      ),
    },
    {
      title: "MODELO AÑO",
      field: "modeloAnio",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      editComponent: (props: any) => (
        <TextField
          variant="outlined"
          required
          name="modeloAnio"
          value={props.value}
          className={classes.textfield}
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
        />
      ),
    },
    {
      title: "EQUIPO DE FRÍO",
      field: "equipoFrio",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      editComponent: (props: any) => (
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            value={props.value}
            name="equipoFrio"
            onChange={(e) => props.onChange(e.target.value)}
            //label="Para habilitarse complete el campo clave"
          >
            <MenuItem value={"SI"}>SI</MenuItem>
            <MenuItem value={"NO"}>NO</MenuItem>
          </Select>
        </FormControl>
      ),
    },
    {
      title: "NRO. HABILITACIÓN SENASA",
      field: "nroSenasa",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      editComponent: (props: any) => (
        <TextField
          variant="outlined"
          required
          name="nroSenasa"
          disabled={!!props.rowData.nroMunicipal}
          value={props.value}
          style={{
            backgroundColor: props.rowData.nroMunicipal
              ? colors.gray
              : colors.white,
          }}
          className={classes.textfield}
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
          // error={!!errors.nroSenasa}
          // helperText={errors.nroSenasa}
        />
      ),
    },
    {
      title: "NRO. HABILITACIÓN MUNICIPAL",
      field: "nroMunicipal",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      editComponent: (props: any) => (
        <TextField
          variant="outlined"
          required
          name="nroMunicipal"
          disabled={!!props.rowData.nroSenasa}
          value={props.value}
          style={{
            backgroundColor: props.rowData.nroSenasa
              ? colors.gray
              : colors.white,
          }}
          className={classes.textfield}
          onChange={(e) => {
            props.onChange(e.target.value);
            //handleChange(e);
          }}
          // error={!!errors.nroSenasa}
          // helperText={errors.nroSenasa}
        />
      ),
    },
    {
      title: "VENCIMIENTO",
      field: "vencimiento",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (row: any) => <span>{parseDate(row["vencimiento"])}</span>,
      editComponent: (props: any) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
          <KeyboardDatePicker
            inputVariant="outlined"
            disableToolbar
            format="dd/MM/yyyy"
            //margin="normal"
            id="date-picker-inline-inicio"
            //disablePast={true}
            name="inicio"
            invalidDateMessage="Formato de la Fecha Inválido"
            invalidLabel="Ingrese la fecha"
            value={props.value || ""}
            error={false}
            onChange={(e) => {
              const aux = e || "";
              props.onChange(aux);
            }}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            className={classes.fecha}
          />
        </MuiPickersUtilsProvider>
      ),
    },
  ];
  const columnsChoferes = [
    {
      title: "ID VEHÍCULO",
      field: "idVehiculo",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      editComponent: (props: any) => {
        auxIdVehiculo = [];
        //@ts-ignore
        vehiculos.forEach((element) => {
          auxIdVehiculo.push(element.idVehiculo);
        });
        return (
          <FormControl variant="outlined" className={classes.textfield}>
            <Select
              value={props.value}
              name="idVehiculo"
              onChange={(e) => props.onChange(e.target.value)}
              //label="Para habilitarse complete el campo clave"
            >
              {
                //@ts-ignore
                auxIdVehiculo.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        );
      },
    },
    {
      title: "NOMBRE Y APELLIDO",
      field: "nombreYapellido",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      editComponent: (props: any) => (
        <TextField
          variant="outlined"
          required
          name="nombreYapellido"
          value={props.value}
          className={classes.textfield}
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
        />
      ),
    },
    {
      title: "PERMISO",
      field: "permiso",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      editComponent: (props: any) => (
        <FormControl variant="outlined" className={classes.textfield}>
          <Select
            value={props.value}
            name="permiso"
            onChange={(e) => props.onChange(e.target.value)}
            //label="Para habilitarse complete el campo clave"
          >
            <MenuItem value={"LIBRETA SANITARIA"}>LIBRETA SANITARIA</MenuItem>
            <MenuItem value={"CURSO DE MANIPULACIÓN DE ALIMENTOS"}>
              CURSO DE MANIPULACIÓN DE ALIMENTOS
            </MenuItem>
          </Select>
        </FormControl>
      ),
    },
    {
      title: "OTORGADO POR",
      field: "otorgadoPor",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      editComponent: (props: any) => (
        <TextField
          variant="outlined"
          required
          name="otorgadoPor"
          value={props.value}
          className={classes.textfield}
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
        />
      ),
    },
    {
      title: "VENCIMIENTO",
      field: "vencimientoChofer",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (row: any) => <span>{parseDate(row["vencimientoChofer"])}</span>,
      editComponent: (props: any) => {
        return (
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <KeyboardDatePicker
              inputVariant="outlined"
              disableToolbar
              //required
              //emptyLabel="Ingrese Fecha"
              format="dd/MM/yyyy"
              //margin="normal"
              id="fecha-picker-inline"
              //disablePast={true}
              name="vencimientoChofer"
              error={false}
              invalidDateMessage="Formato de la Fecha Inválido"
              invalidLabel="Ingrese la fecha"
              value={props.value || ""}
              onChange={(e) => {
                const aux = e || "";
                props.onChange(aux);
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              className={classes.fecha}
            />
          </MuiPickersUtilsProvider>
        );
      },
    },
  ];
  //https://material-ui.com/components/autocomplete/
  return (
    <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
      {errorDBtransporte && (
        <SnackBar
          message={errorDBtransporte}
          variant="error"
          hPosition="right"
          isResetErrors={true}
        />
      )}
      <span className={classes.title}>FORMULARIO DE TRANSPORTISTAS</span>
      <span className={classes.subtitle}>* EMPRESA</span>
      <Autocomplete
        value={values.empresa}
        onChange={(event, newValue) => {
          setFieldValue(
            "empresa",
            newValue?.replace?.("Agregar:", "").trim().toUpperCase(),
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
        id="free-solo-with-text-demo"
        options={empresas}
        style={{ width: 500, marginTop: "2%" }}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            required
            variant="outlined"
            error={!!errors.empresa}
            helperText={errors.empresa || " "}
          />
        )}
      />
      <Tabla
        title="VEHÍCULOS"
        data={vehiculos}
        setData={setVehiculos}
        columns={columnsVehiculo}
      />
      <Tabla
        title="CHOFERES"
        data={choferes}
        setData={setChoferes}
        columns={columnsChoferes}
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
              setStatus("guardar");
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
              setStatus("imprimir");
            }}
          >
            Imprimir
          </Button>
        </Tooltip>
      </div>
    </form>
  );
}
