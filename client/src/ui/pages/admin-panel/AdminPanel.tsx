import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Tooltip,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import Tabla from "../../widgets/tabla-nuevo/Tabla";
import { setNewUser } from "../../../api/actions/admin-users/adminUsersActions";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { nanoid } from "nanoid";
import useStyles from "./adminPanel.styles";

export default function AdminPanel() {
  const { users } = useSelector((state: any) => state.adminUsers);
  const dispatch = useDispatch();
  const classes = useStyles();

  const columnsUsers = [
    {
      title: "Email",
      field: "email",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      editComponent: (props: any) => (
        <TextField
          variant="outlined"
          required
          name="email"
          value={props.value}
          className={classes.textfield}
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
        />
      ),
    },
    {
      title: "Contraseña",
      field: "password",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      editComponent: (props: any) => (
        <div style={{ position: "relative" }}>
          <TextField
            variant="outlined"
            required
            name="password"
            value={props.value}
            className={classes.textfield}
            onChange={(e) => {
              props.onChange(e.target.value);
            }}
          ></TextField>
          <Tooltip title="Generar contraseña automáticamente">
            <IconButton
              style={{
                position: "relative",
                right: "2%",
                top: "0.4em",
              }}
              aria-label="toggle password visibility"
              onClick={() => {
                props.onChange(nanoid(8));
              }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    {
      title: "Tipo de Permiso",
      field: "tipoPermiso",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      editComponent: (props: any) => (
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            value={props.value}
            name="tipoPermiso"
            onChange={(e) => props.onChange(e.target.value)}
            //label="Para habilitarse complete el campo clave"
          >
            <MenuItem value={"ADMINISTRADOR"}>ADMINISTRADOR</MenuItem>
            <MenuItem value={"BROMATOLOGÍA"}>BROMATOLOGÍA</MenuItem>
            <MenuItem value={"VETERINARIA"}>VETERINARIA</MenuItem>
          </Select>
        </FormControl>
      ),
    },
  ];

  return (
    <div className={classes.form}>
      <Tabla
        title="ADMINISTRAR USUARIOS"
        data={users}
        setData={function (items:any, item:any) {
          dispatch(setNewUser(items));
          console.log({items, item})
        }}
        // setNewItem={function (item) {
        //     ////Funcion para usar cuando cambio un solo campo
        //     console.log(item);
        //   }}
        columns={columnsUsers}
      />
    </div>
  );
}
