import veterinariaTypes from "./veterinariaTypes";
//import axios from "axios";

export const setEspeciesAnimales = (array) => async (dispatch, getState) => {
  try {
    // const { localidades, tipoAlimentosTransportar } = getState().transportistas;

    // await axios.post("/mariadb/transporte/valoresunicos/patch", {
    //   localidades,
    //   tipoAlimentosTransportar,
    //   empresas: array,
    // });
    return dispatch({
      type: veterinariaTypes.SET_ESPECIES_ANIMALES,
      payload: array,
    });
  } catch (e) {
    console.log(e);
    // return dispatch({
    //   type: transportistaTypes.SET_ERROR_DB_TRANSPORTE,
    //   payload: "No se pudo crear la Empresa!",
    // });
  }
};

export const setColores = (array) => async (dispatch, getState) => {
  try {
    // const { localidades, tipoAlimentosTransportar } = getState().transportistas;

    // await axios.post("/mariadb/transporte/valoresunicos/patch", {
    //   localidades,
    //   tipoAlimentosTransportar,
    //   empresas: array,
    // });
    return dispatch({
      type: veterinariaTypes.SET_COLORES,
      payload: array,
    });
  } catch (e) {
    console.log(e);
    // return dispatch({
    //   type: transportistaTypes.SET_ERROR_DB_TRANSPORTE,
    //   payload: "No se pudo crear la Empresa!",
    // });
  }
};

export const setRegistroViaPublica =
  (registro) => async (dispatch, getState) => {
    const { currentRegistroViaPublica } = getState().veterinaria;

    try {
      if (currentRegistroViaPublica) {
        if (
          currentRegistroViaPublica.valuesForm?.idAnimal !==
          registro.valuesForm?.idAnimal
        ) {
          // await axios.post("/mariadb/transporte/registros/delete", {
          //   id: currentRegistro.valuesForm.empresa,
          // });
          dispatch({
            type: veterinariaTypes.DELETE_REGISTRO_VIA_PUBLICA,
            payload: currentRegistroViaPublica.valuesForm.idAnimal,
          });
        }
      }
      //await axios.post("/mariadb/transporte/registros/post", { ...registro });
      return dispatch({
        type: veterinariaTypes.SET_REGISTRO_VIA_PUBLICA,
        payload: registro,
      });
    } catch (e) {
      try {
        // await axios.post("/mariadb/transporte/registros/patch", {
        //   ...registro,
        // });
        return dispatch({
          type: veterinariaTypes.SET_REGISTRO_VIA_PUBLICA,
          payload: registro,
        });
      } catch (e) {
        return dispatch({
          type: veterinariaTypes.SET_ERROR_DB_VIA_PUBLICA,
          payload: "No se pudo crear el registro!",
        });
      }
    }
  };

export function setIsFetchingRegistroViaPublica(isFetching) {
  return {
    type: veterinariaTypes.SET_IS_FETCHING_REGISTRO_VIA_PUBLICA,
    payload: isFetching,
  };
}

export const setCurrentRegistroViaPublica = (id) => ({
  type: veterinariaTypes.SET_CURRENT_REGISTRO_VIA_PUBLICA,
  payload: id,
});

export function deleteRegistroViaPublica(id) {
  return async function (dispatch) {
    try {
      // await axios.post("/mariadb/transporte/registros/delete", {
      //   id,
      // });
      return dispatch({
        type: veterinariaTypes.DELETE_REGISTRO_VIA_PUBLICA,
        payload: id,
      });
    } catch (e) {
      console.log(e);
      return dispatch({
        type: veterinariaTypes.SET_ERROR_DB_VIA_PUBLICA,
        payload: "No se pudo eliminar el registro!",
      });
    }
  };
}
