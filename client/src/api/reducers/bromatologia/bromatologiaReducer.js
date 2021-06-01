import bromatologiaType from "../../actions/bromatologia/bromatologiaTypes";
import commonTypes from "../../actions/commonTypes";
import { deleteAux } from "./utils";
// import { auxRubro } from "./constRubro";
// import { nombreComercial } from "./constNombreComercial";
// import { constRazonSocial } from "./constRazonSocial";
// import {dataPermisos} from "./array.js"

const INITIAL_STATE = {
  permisos: [],
  //permisos: dataPermisos,
  currentPermiso: false,
  isFetchingBromatologia: false,
  isFetchedBromatologia: false,
  // rubro: auxRubro,
  // nombreComercial: nombreComercial,
  // razonSocial: constRazonSocial,
  rubro: [],
  nombreComercial: [],
  razonSocial: [],
  errorDB: "",
};

const bromatologiaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case bromatologiaType.SET_PERMISOS_BROMATOLOGIA:
      return {
        ...state,
        permisos: action.payload,
        isFetchingBromatologia: false,
        isFetchedBromatologia: true,
        errorDB: "",
      };
    case bromatologiaType.SET_PERMISO_BROMATOLOGIA:
      return {
        ...state,
        //permisos: [...state.permisos, action.payload],
        permisos: {
          ...state.permisos,
          [action.payload.valuesForm.expediente]: action.payload,
        },
        isFetchingBromatologia: false,
        isFetchedBromatologia: true,
        errorDB: "",
      };
    case bromatologiaType.SET_CURRENT_PERMISO:
      return {
        ...state,
        currentPermiso: state.permisos[action.payload],
      };
    case commonTypes.RESET_CURRENTS:
      return {
        ...state,
        currentPermiso: {},
      };
    case bromatologiaType.SET_RUBRO:
      return {
        ...state,
        rubro: action.payload,
      };
    case bromatologiaType.SET_NOMBRE_COMERCIAL:
      return {
        ...state,
        nombreComercial: action.payload,
      };
    case bromatologiaType.SET_RAZON_SOCIAL:
      return {
        ...state,
        razonSocial: action.payload,
      };
    case bromatologiaType.DELETE_PERMISO:
      return {
        ...state,
        permisos: deleteAux(state.permisos, action.payload),
      };
    case bromatologiaType.SET_IS_FETCHING_BROMATOLOGIA:
      return {
        ...state,
        isFetchingBromatologia: action.payload,
      };
    case bromatologiaType.SET_ERROR_DB:
      return {
        ...state,
        errorDB: action.payload,
        isFetchingBromatologia: false,
      };
    case commonTypes.RESET_SNACKBAR:
      return {
        ...state,
        errorDB: "",
      };
    default:
      return state;
  }
};

export default bromatologiaReducer;
