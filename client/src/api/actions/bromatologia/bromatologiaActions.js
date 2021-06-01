import bromatologiaType from "./bromatologiaTypes";
import axios from "axios";
import history from "../../history";

function statusPushHistory(status, permiso) {
  if (status === "guardar") {
    if (permiso.valuesForm.estadoComercio === "CESE") {
      history.push("/bromatologia/historial");
    } else {
      history.push("/bromatologia/administrar");
    }
  }
  if (status === "imprimir") {
    history.push(`/bromatologia/detail/${permiso.valuesForm.expediente}`);
  }
}

export const setPermisoBromatologia = (permiso, status) => async (dispatch) => {
  try {
    const auxPost = await axios.post("/mariadb/bromatologia/registros/post", {
      data: permiso,
    });

    if (auxPost.data.affectedRows) {
      dispatch({
        type: bromatologiaType.SET_PERMISO_BROMATOLOGIA,
        payload: permiso,
      });

      return statusPushHistory(status);
    }
  } catch (e) {
    try {
      const auxPost = await axios.post(
        "/mariadb/bromatologia/registros/patch",
        {
          data: permiso,
        }
      );
      if (auxPost.data.affectedRows) {
        dispatch({
          type: bromatologiaType.SET_PERMISO_BROMATOLOGIA,
          payload: permiso,
        });

        return statusPushHistory(status, permiso);
      }
    } catch (e) {
      console.log(e);
      return dispatch({
        type: bromatologiaType.SET_ERROR_DB,
        payload: "No se pudo editar el registro",
      });
    }
    console.log(e);
    return dispatch({
      type: bromatologiaType.SET_ERROR_DB,
      payload: "No se pudo crear el Registro",
    });
  }
};

export const setCurrentPermiso = (id) => ({
  type: bromatologiaType.SET_CURRENT_PERMISO,
  payload: id,
});

export const setRubro = (array) => async (dispatch, getState) => {
  try {
    const { nombreComercial, razonSocial } = getState().bromatologia;

    await axios.post("/mariadb/bromatologia/valoresunicos/patch", {
      nombreComercial,
      razonSocial,
      rubro: array,
    });

    return dispatch({
      type: bromatologiaType.SET_RUBRO,
      payload: array,
    });
  } catch (e) {
    return dispatch({
      type: bromatologiaType.SET_ERROR_DB,
      payload: "No se pudo guardar el Rubro",
    });
  }
};

export const setNombreComercial = (array) => async (dispatch, getState) => {
  try {
    const { razonSocial, rubro } = getState().bromatologia;
    //nombrecomercial, razonsocial, rubro
    await axios.post("/mariadb/bromatologia/valoresunicos/patch", {
      nombreComercial: array,
      razonSocial,
      rubro,
    });
    return dispatch({
      type: bromatologiaType.SET_NOMBRE_COMERCIAL,
      payload: array,
    });
  } catch (e) {
    return dispatch({
      type: bromatologiaType.SET_ERROR_DB,
      payload: "No se pudo guardar el Nombre Comercial",
    });
  }
};

export const setRazonSocial = (array) => async (dispatch, getState) => {
  try {
    const { nombreComercial, rubro } = getState().bromatologia;
    //nombrecomercial, razonsocial, rubro
    await axios.post("/mariadb/bromatologia/valoresunicos/patch", {
      nombreComercial,
      razonSocial: array,
      rubro,
    });
    return dispatch({
      type: bromatologiaType.SET_RAZON_SOCIAL,
      payload: array,
    });
  } catch (e) {
    return dispatch({
      type: bromatologiaType.SET_ERROR_DB,
      payload: "No se pudo guardar la Razó Social",
    });
  }
};

export function deletePermiso(id) {
  return async function (dispatch) {
    try {
      const auxBromatologiaDB = await axios.post(
        "/mariadb/bromatologia/registros/delete",
        { id }
      );

      if (auxBromatologiaDB.data.affectedRows) {
        return dispatch({
          type: bromatologiaType.DELETE_PERMISO,
          payload: id,
        });
      }
    } catch (e) {
      return dispatch({
        type: bromatologiaType.SET_ERROR_DB,
        payload: "No se pudo eliminar el registro",
      });
    }
  };
}

export function getDataBromatologia() {
  return async function (dispatch) {
    try {
      const auxBromatologiaDB = await axios.post(
        "/mariadb/bromatologia/registros/get"
      );
      const auxValoresUnicosDB = await axios.post(
        "/mariadb/bromatologia/valoresunicos/get"
      );

      if (auxBromatologiaDB && auxValoresUnicosDB) {
        let auxObj;
        auxBromatologiaDB.data.forEach((item) => {
          auxObj = {
            ...auxObj,
            [item.id]: {
              valuesForm: JSON.parse(item.valuesFrom),
              data: JSON.parse(item.data),
            },
          };
        });

        dispatch({
          type: bromatologiaType.SET_PERMISOS_BROMATOLOGIA,
          payload: auxObj,
        });
        dispatch({
          type: bromatologiaType.SET_RUBRO,
          payload: JSON.parse(auxValoresUnicosDB.data[0].rubro),
        });
        dispatch({
          type: bromatologiaType.SET_NOMBRE_COMERCIAL,
          payload: JSON.parse(auxValoresUnicosDB.data[0].nombrecomercial),
        });
        return dispatch({
          type: bromatologiaType.SET_RAZON_SOCIAL,
          payload: JSON.parse(auxValoresUnicosDB.data[0].razonsocial),
        });
      }
    } catch (e) {
      console.log(e);
      return dispatch({
        type: bromatologiaType.SET_ERROR_DB,
        payload: "No se pudieron obtener los datos de la base",
      });
    }
  };
}

export function setIsFetchingBromatologia(isFetching) {
  return {
    type: bromatologiaType.SET_IS_FETCHING_BROMATOLOGIA,
    payload: isFetching,
  };
}
