import transportistaTypes from "../../actions/transporte/transportistaTypes";
import commonTypes from "../../actions/commonTypes";
import { deleteAux } from "./utils";
// import { empresas } from "./empresas";
// import { tipoAlimentosTransportar } from "./tipoAlimentosTransportar";
// import { localidades } from "./localidades";
// import { dataRegistros } from "./array.js";

const INITIAL_STATE = {
  registros: [],
  currentRegistro: false,
  isFetchingRegistrosTransporte: false,
  localidades: [],
  tipoAlimentosTransportar: [],
  empresas: [],
  errorDBtransporte: "",
};

const transporteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case transportistaTypes.SET_PERMISOS_TRANSPORTE:
      return {
        ...state,
        registros: action.payload,
        isFetchingRegistrosTransporte: false,
        errorDBtransporte: "",
      };
    case transportistaTypes.SET_REGISTRO_TRANSPORTISTA:
      return {
        ...state,
        registros: {
          ...state.registros,
          [action.payload.valuesForm.empresa]: action.payload,
        },
        isFetchingRegistrosTransporte: false,
      };
    case transportistaTypes.SET_CURRENT_REGISTRO:
      return {
        ...state,
        currentRegistro: state.registros[action.payload],
      };
    case commonTypes.RESET_CURRENTS:
      return {
        ...state,
        currentRegistro: false,
      };
    case transportistaTypes.SET_LOCALIDADES:
      return {
        ...state,
        localidades: action.payload,
      };
    case transportistaTypes.SET_TIPO_ALIMENTOS_TRANSPORTAR:
      return {
        ...state,
        tipoAlimentosTransportar: action.payload,
      };
    case transportistaTypes.SET_EMPRESAS:
      return {
        ...state,
        empresas: action.payload,
      };
    case transportistaTypes.DELETE_REGISTRO:
      return {
        ...state,
        registros: deleteAux(state.registros, action.payload),
      };
    case transportistaTypes.SET_ERROR_DB_TRANSPORTE:
      return {
        ...state,
        errorDBtransporte: action.payload,
        isFetchingRegistrosTransporte: false,
      };
    case transportistaTypes.SET_IS_FETCHING_TRANSPORTE:
      return {
        ...state,
        isFetchingRegistrosTransporte: action.payload,
      };
    case commonTypes.RESET_SNACKBAR:
      return {
        ...state,
        errorDBtransporte: "",
      };
    default:
      return state;
  }
};

export default transporteReducer;
