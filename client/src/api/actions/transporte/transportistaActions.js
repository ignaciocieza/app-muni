import transportistaTypes from "./transportistaTypes";
import axios from "axios";

export const setRegistroTransportista = (registro) => async (
  dispatch,
  getState
) => {
  //Si se cambia el nombre de la empresa se borra y crea el registro.
  //Nota: No usar porque va a sobreescribir el registro de otra empresa??????????
  const { currentRegistro } = getState().transportistas;

  try {
    if (currentRegistro) {
      if (
        currentRegistro.valuesForm?.empresa !== registro.valuesForm?.empresa
      ) {
        await axios.post("/mariadb/transporte/registros/delete", {
          id: currentRegistro.valuesForm.empresa,
        });
        dispatch({
          type: transportistaTypes.DELETE_REGISTRO,
          payload: currentRegistro.valuesForm.empresa,
        });
      }
    }
    await axios.post("/mariadb/transporte/registros/post", { ...registro });
    return dispatch({
      type: transportistaTypes.SET_REGISTRO_TRANSPORTISTA,
      payload: registro,
    });
  } catch (e) {
    try {
      await axios.post("/mariadb/transporte/registros/patch", {
        ...registro,
      });
      return dispatch({
        type: transportistaTypes.SET_REGISTRO_TRANSPORTISTA,
        payload: registro,
      });
    } catch (e) {
      return dispatch({
        type: transportistaTypes.SET_ERROR_DB_TRANSPORTE,
        payload: "No se pudo crear el registro!",
      });
    }
  }
};

export const setCurrentRegistro = (id) => ({
  type: transportistaTypes.SET_CURRENT_REGISTRO,
  payload: id,
});

export const setLocalidades = (array) => async (dispatch, getState) => {
  try {
    const { tipoAlimentosTransportar, empresas } = getState().transportistas;

    await axios.post("/mariadb/transporte/valoresunicos/patch", {
      localidades: array,
      tipoAlimentosTransportar,
      empresas,
    });
    return dispatch({
      type: transportistaTypes.SET_LOCALIDADES,
      payload: array,
    });
  } catch (e) {
    console.log(e);
    return dispatch({
      type: transportistaTypes.SET_ERROR_DB_TRANSPORTE,
      payload: "No se pudo crear la Localidad",
    });
  }
};

export const setTipoAlimentosTransportar = (array) => async (
  dispatch,
  getState
) => {
  try {
    const { localidades, empresas } = getState().transportistas;

    await axios.post("/mariadb/transporte/valoresunicos/patch", {
      localidades,
      tipoAlimentosTransportar: array,
      empresas,
    });
    return dispatch({
      type: transportistaTypes.SET_TIPO_ALIMENTOS_TRANSPORTAR,
      payload: array,
    });
  } catch (e) {
    console.log(e);
    return dispatch({
      type: transportistaTypes.SET_ERROR_DB_TRANSPORTE,
      payload: "No se pudo crear el Tipo de alimento a transportar",
    });
  }
};

export const setEmpresas = (array) => async (dispatch, getState) => {
  try {
    const { localidades, tipoAlimentosTransportar } = getState().transportistas;

    await axios.post("/mariadb/transporte/valoresunicos/patch", {
      localidades,
      tipoAlimentosTransportar,
      empresas: array,
    });
    return dispatch({
      type: transportistaTypes.SET_EMPRESAS,
      payload: array,
    });
  } catch (e) {
    console.log(e);
    return dispatch({
      type: transportistaTypes.SET_ERROR_DB_TRANSPORTE,
      payload: "No se pudo crear la Empresa",
    });
  }
};

export function deleteRegistro(id) {
  return async function (dispatch) {
    try {
      await axios.post("/mariadb/transporte/registros/delete", {
        id,
      });
      return dispatch({
        type: transportistaTypes.DELETE_REGISTRO,
        payload: id,
      });
    } catch (e) {
      console.log(e);
      return dispatch({
        type: transportistaTypes.SET_ERROR_DB_TRANSPORTE,
        payload: "No se pudo eliminar el registro",
      });
    }
  };
}

export function getDataTransporte() {
  return async function (dispatch) {
    try {
      const auxTransporteDB = await axios.post(
        "/mariadb/transporte/registros/get"
      );
      const auxValoresUnicosDB = await axios.post(
        "/mariadb/transporte/valoresunicos/get"
      );

      if (auxTransporteDB && auxValoresUnicosDB) {
        let auxObj;
        auxTransporteDB.data.forEach((item) => {
          auxObj = {
            ...auxObj,
            [item.id]: {
              valuesForm: JSON.parse(item.valuesFrom),
              vehiculos: JSON.parse(item.vehiculos),
              choferes: JSON.parse(item.choferes),
            },
          };
        });

        dispatch({
          type: transportistaTypes.SET_PERMISOS_TRANSPORTE,
          payload: auxObj,
        });
        dispatch({
          type: transportistaTypes.SET_EMPRESAS,
          payload: JSON.parse(auxValoresUnicosDB.data[0].empresas),
        });
        dispatch({
          type: transportistaTypes.SET_TIPO_ALIMENTOS_TRANSPORTAR,
          payload: JSON.parse(
            auxValoresUnicosDB.data[0].tipoAlimentosTransportar
          ),
        });
        return dispatch({
          type: transportistaTypes.SET_LOCALIDADES,
          payload: JSON.parse(auxValoresUnicosDB.data[0].localidades),
        });
      }
    } catch (e) {
      console.log(e);
      return dispatch({
        type: transportistaTypes.SET_ERROR_DB_TRANSPORTE,
        payload: "No se pudieron obtener los datos de la base",
      });
    }
  };
}

export function setIsFetchingTransporte(isFetching) {
  return {
    type: transportistaTypes.SET_IS_FETCHING_TRANSPORTE,
    payload: isFetching,
  };
}
