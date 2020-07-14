//Develop
//import { createStore, compose, applyMiddleware } from "redux";
//Production
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import reducer from "./reducers/indexReducer";
import rootSaga from './reducers/rootSaga';

/**----Develop--------
 * Funcion que se usa cuando se usan archivos grandes como imagenes
 * https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#actionsanitizer--statesanitizer
 */
// const actionSanitizer = (action) => (
//     action.type === 'FILE_DOWNLOAD_SUCCESS' && action.data ?
//         { ...action, data: '<<LONG_BLOB>>' } : action
// );

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//     actionSanitizer,
//     stateSanitizer: (state) => state.data ? { ...state, data: '<<LONG_BLOB>>' } : state,
// })|| compose;
//-------------------------------
const sagaMiddleware = createSagaMiddleware();

//---- develop-------
//export const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

//------ Production------
export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
