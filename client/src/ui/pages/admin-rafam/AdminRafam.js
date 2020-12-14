import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import axios from 'axios';
import { searchByFieldStart, setIsFetchingRafam, searchByFieldStartThunk } from '../../../api/actions/rafam/rafamActions';
//import Modal from '../../widgets/modal/TransitionsModal';
import Spinner from '../../widgets/with-spinner/Spinner';
import MaterialTable from 'material-table';
import dataColumns from './dataColumns';
import useStyles from '../admin-permiso/adminPermiso.styles';


/**
 * El error esta cuando obtengo informacion del reducer. 
 * https://stackoverflow.com/questions/59072200/useselector-destructing-vs-multiple-calls
 * https://react-redux.js.org/next/api/hooks#equality-comparisons-and-updates
 */
export default function AdminRafam() {
    const dispatch = useDispatch();
    const { admin } = useSelector(state => state.user); //-->funciona 
    const { dataQuery: { value, type, subType }, isFetchingRafam, contribuyentes} = useSelector(state => state.rafam, shallowEqual); //-->funciona 

    //Funciona!!!!
    // const contribuyentes = useSelector(state => state.rafam.contribuyentes);
    // const value = useSelector(state => state.rafam.dataQuery.value);
    // const type = useSelector(state => state.rafam.dataQuery.type);
    // const subType = useSelector(state => state.rafam.dataQuery.subType);
    // const isFetchingRafam = useSelector(state => state.rafam.isFetchingRafam);

    // let isFetchingRafam;
    const signal = axios.CancelToken.source();
    const classes = useStyles();
    //let auxData = rafam[type];
    //let auxData, rafam = true;

    useEffect(() => {
        console.log('no entra al if')
        console.dir({ contribuyentes, value, type, subType, isFetchingRafam })
        //dispatch(searchByFieldStartThunk({ value, type, subType, signal }))
        dispatch(searchByFieldStartThunk({ value: '515', type: 'contribuyentes', subType: 'findone', signal }))
        // if (admin && type) {
        //     if (!rafam[type]) {
        //         //dispatch(searchByFieldStart({ value, type, subType, signal }))
        //         dispatch(searchByFieldStartThunk({ value, type, subType, signal }))
        //     } else if (!rafam[type][value]) {
        //         //dispatch(searchByFieldStart({ value, type, subType, signal }))
        //         dispatch(searchByFieldStartThunk({ value, type, subType, signal }))
        //     } else {
        //         auxData = rafam[type][value]
        //         console.dir(auxData)
        //     }
        //     //dispatch(setIsFetchingRafam(true))
        //     //dispatch(searchByFieldStart({ value, type, subType, signal }))
        //     window.scrollTo(0, 0);
        // }
        return (() => signal.cancel())
    }, [admin, dispatch])

    // }, [admin, value, type, subType, dispatch])

    if (!admin || !contribuyentes) { return null };
    //if (!admin || !statte.rafam?.contribuyentes) { return null };

    return (
        <div className={classes.root}>
            {(isFetchingRafam) ? <Spinner /> : (
                <MaterialTable
                    title="Rafam"
                    //columns={dataColumns[type]}
                    data={Object.values(contribuyentes)}
                    localization={{
                        body: {
                            emptyDataSourceMessage: 'No hay items para mostrar',
                            deleteTooltip: 'Borrar',
                            editRow: {
                                deleteText: '¿Desea borrar definitivamente?',
                                saveTooltip: 'Aceptar',
                                cancelTooltip: 'Cancelar'
                            },
                        },
                        header: {
                            actions: 'Acciones'
                        },
                        pagination: {
                            labelRowsSelect: 'renglones'
                        },
                        toolbar: {
                            searchPlaceholder: 'Buscar...'
                        }
                    }}
                />
            )}
        </div>
    );
};

