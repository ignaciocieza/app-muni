import bromatologiaType from "../../actions/bromatologia/bromatologiaTypes";
import commonTypes from "../../actions/commonTypes";
import { deleteAux } from "./utils";

/**
 * agentes --> db "acceso"
 */
const INITIAL_STATE = {
  permisos: [],
  currentPermiso: false,
  isFetchingBromatologia: false,
  isFetchedBromatologia: false,
  rubro: [
    "DESPENSA",
    "FRUTERIA Y VERDULERIA",
    "COMEDOR",
    "CARNICERIA",
    "MINIMERCADO",
    "GRANJA",
    "FRUTERIA - VERDULERIA",
    "SUPERMERCADO",
    "DESPENSA Y GRANJA",
    "SALA DE EXTRACCION DE MIEL",
    "RESTAURANT",
  ],
  nombreComercial: [
    "EL ECONÓMICO",
    "DIA %",
    "CHOCHAN",
    "DOBLE A",
    "FIORELLA",
    "SOLAMENTE",
    "ALMENDRA",
    "DULCE TRADICIÓN",
    "BATACAZO",
    "ZELKI Dulces Caseros",
    "LA PORTEÑITA",
    "MINIMERCADO VIDAL",
    "DE PASO",
    "LO DE JUAN",
    "BON AMISS",
  ],
  razonSocial: [
    "ACTUAL LAS FLORES",
    "LI, ZUGAN",
    "CHEN CHUMHE",
    "LIN WENPONG",
    "WENG LIHUA",
    "DIA ARGENTINA S.A.",
    "SOLAMENTE",
    "LIN, GUOLONG",
    "CHEN LI MEI",
    "INCHASTOY, HUGO E.",
    "ZHAUNG SONG",
    "ZARATE, MARIO ALBERTO",
  ],
};

const bromatologiaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default bromatologiaReducer;
