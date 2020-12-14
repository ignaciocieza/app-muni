import bromatologiaType from "./bromatologiaTypes";

export const setPermisoBromatologia = (permiso) => ({
  type: bromatologiaType.SET_PERMISO_BROMATOLOGIA,
  payload: permiso,
});

export const setCurrentPermiso = (id) => ({
  type: bromatologiaType.SET_CURRENT_PERMISO,
  payload: id,
});

export const setRubro = (array) => ({
  type: bromatologiaType.SET_RUBRO,
  payload: array,
});

export const setNombreComercial = (array) => ({
  type: bromatologiaType.SET_NOMBRE_COMERCIAL,
  payload: array,
});

export const setRazonSocial = (array) => ({
  type: bromatologiaType.SET_RAZON_SOCIAL,
  payload: array,
});

export function deletePermiso(id) {
  return {
    type: bromatologiaType.DELETE_PERMISO,
    payload: id,
  };
}
