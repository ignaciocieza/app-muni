import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
//import storage from 'redux-persist/lib/storage';
import storageSession from "redux-persist/lib/storage/session";
import userReducer from "./user/userReducer";
// import accesoReducer from "./agente/agenteReducer";
// import mergeReducer from "./merge/mergeReducer";
// import pescaReducer from "./pesca/pescaReducer";
// import rafamReducer from "./rafam/rafamReducer";
import bromatologiaReducer from "./bromatologia/bromatologiaReducer";
import transporteReducer from "./transporte/transporteReducer";
import veterinariaReducer from "./veterinaria/veterinariaReducer";
import adminUsersReducer from "./admin-users/adminUsersReducer";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: [
    "user",
    "transportistas",
    "bromatologia",
    "veterinaria",
    "adminUsers",
  ],
};

const rootReducer = combineReducers({
  //rafam: rafamReducer,
  user: userReducer,
  // agente: accesoReducer,
  // merge: mergeReducer,
  // pesca: pescaReducer,
  bromatologia: bromatologiaReducer,
  transportistas: transporteReducer,
  veterinaria: veterinariaReducer,
  adminUsers: adminUsersReducer,
});

export default persistReducer(persistConfig, rootReducer);
