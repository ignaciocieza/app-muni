import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAdminStart } from "../../../api/actions/user/userActions";
import { setAlerts, logout } from "../../../api/actions/commonActions";
import imageLogo from "../../../assets/gob-municipal-abajo.png";
import ActionAlerts from "../../widgets/action-alerts/ActionAlerts";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
  Fade,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import AccountCircle from "@material-ui/icons/AccountCircle";
import useStyles from "./signIn.styles";

export default function SignIn() {
  const [errorValues, setErrorValues] = useState({ nuevaContrasena: false });
  const [adminValue, setAdminValue] = useState({
    email: "",
    password: "",
    newPassword: "",
    showPassword: false,
    showNewPassword: false,
    isSignUp: false,
  });
  const { alerts } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(logout());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const auxSignUp =
      adminValue.isSignUp && adminValue.newPassword.length !== 8;

    if (auxSignUp || adminValue.password.length !== 8) {
      setErrorValues(auxSignUp && { nuevaContrasena: true });
      dispatch(setAlerts("Error en el mail o en la contraseña."));
      return;
    }

    dispatch(setAdminStart(adminValue));
  };

  return (
    <Fade in={true} timeout={3000}>
      <div className={classes.root}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.contentField}>
            <div className={classes.imageContent}>
              <img className={classes.image} src={imageLogo} alt="no imagen" />
            </div>
            <TextField
              type="email"
              name="email"
              variant="filled"
              className={classes.textField}
              required
              label="Email"
              onChange={(event) =>
                setAdminValue({ ...adminValue, email: event.target.value })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircle className={classes.accountCircle} />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl variant="filled" className={classes.textField}>
              <InputLabel htmlFor="filled-adornment-password">
                Contraseña *
              </InputLabel>
              <FilledInput
                autoComplete="on"
                id="filled-adornment-password"
                required
                name="password"
                type={adminValue.showPassword ? "text" : "password"}
                value={adminValue.password}
                onChange={(event) =>
                  setAdminValue({ ...adminValue, password: event.target.value })
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setAdminValue({
                          ...adminValue,
                          showPassword: !adminValue.showPassword,
                        })
                      }
                      onMouseDown={(event) => event.preventDefault()}
                      edge="end"
                    >
                      {adminValue.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {adminValue.isSignUp && (
              <FormControl variant="filled" className={classes.textField}>
                <InputLabel htmlFor="filled-adornment-password">
                  {" "}
                  Nueva Contraseña *
                </InputLabel>
                <FilledInput
                  id="filled-adornment-password"
                  required
                  name="password"
                  type={adminValue.showNewPassword ? "text" : "password"}
                  value={adminValue.newPassword}
                  error={errorValues.nuevaContrasena}
                  onChange={(event) =>
                    setAdminValue({
                      ...adminValue,
                      newPassword: event.target.value,
                    })
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setAdminValue({
                            ...adminValue,
                            showNewPassword: !adminValue.showNewPassword,
                          })
                        }
                        onMouseDown={(event) => event.preventDefault()}
                        edge="end"
                      >
                        {adminValue.showNewPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            )}
            {!adminValue.isSignUp && (
              <span
                className={classes.textPass}
                onClick={() => setAdminValue({ ...adminValue, isSignUp: true })}
              >
                ¿Desea cambiar la contraseña?
              </span>
            )}
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
            >
              {adminValue.isSignUp ? "Cambiar" : "Entrar"}
            </Button>
          </div>
        </form>
        <div className={classes.rightSideContent}>
          <div className={classes.square}>
            <span className={classes.squareTitle}>
              GESTIÓN DE CONTROL DE PERMISO
            </span>
          </div>
        </div>
        {alerts && (
          <div className={classes.alertErr}>
            <ActionAlerts type="error" isTypeClose={true} text={alerts} />
          </div>
        )}
      </div>
    </Fade>
  );
}
