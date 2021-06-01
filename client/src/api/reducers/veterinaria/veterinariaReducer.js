import veterinariaTypes from "../../actions/veterinaria/veterinariaTypes";
import commonTypes from "../../actions/commonTypes";
import { deleteAux } from "./utils";

const INITIAL_STATE = {
  especiesAnimales: [],
  colores: [],
  currentRegistroViaPublica: false,
  registrosViaPublica: [],
  isFetchingRegistrosViaPublica: false,
  errorDBregistrosViaPublica: "",
};

const transporteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case veterinariaTypes.SET_ESPECIES_ANIMALES:
      return {
        ...state,
        especiesAnimales: action.payload,
      };
    case veterinariaTypes.SET_COLORES:
      return {
        ...state,
        colores: action.payload,
      };
    case veterinariaTypes.SET_REGISTRO_VIA_PUBLICA:
      return {
        ...state,
        registrosViaPublica: {
          ...state.registrosViaPublica,
          [action.payload.valuesForm.idAnimal]: action.payload,
        },
        isFetchingRegistrosViaPublica: false,
        errorDBregistrosViaPublica: "",
      };
    case veterinariaTypes.SET_ERROR_DB_VIA_PUBLICA:
      return {
        ...state,
        isFetchingRegistrosViaPublica: action.payload,
        errorDBregistrosViaPublica: false,
      };
    case veterinariaTypes.DELETE_REGISTRO_VIA_PUBLICA:
      return {
        ...state,
        registrosViaPublica: deleteAux(
          state.registrosViaPublica,
          action.payload
        ),
      };
    case commonTypes.RESET_CURRENTS:
      return {
        ...state,
        currentRegistroViaPublica: false,
      };
    case veterinariaTypes.SET_CURRENT_REGISTRO_VIA_PUBLICA:
      return {
        ...state,
        currentRegistroViaPublica: state.registrosViaPublica[action.payload],
      };
    case veterinariaTypes.SET_IS_FETCHING_REGISTRO_VIA_PUBLICA:
      return {
        ...state,
        isFetchingRegistrosViaPublica: action.payload,
      };
    default:
      return state;
  }
};

export default transporteReducer;
