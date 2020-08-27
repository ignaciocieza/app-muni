import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchByFieldStart, setIsFetchingRafam } from '../../../api/actions/rafam/rafamActions';
import Modal from '../../widgets/modal/TransitionsModal';
import MaterialTable from 'material-table';
import dataColumns from './dataColumns';
import useStyles from '../admin-permiso/adminPermiso.styles';


export default function AdminRafam() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { value, type, subType } = history.location.state || '';
    const { admin } = useSelector(state => state.user);
    const { rafamData, isFetchingRafam } = useSelector(state => state.rafam);
    const classes = useStyles();

    useEffect(() => {
        if (admin && type) {
            dispatch(setIsFetchingRafam(true))
            dispatch(searchByFieldStart({ value, type, subType }))
            window.scrollTo(0, 0);
        }
    }, [admin, value, type, subType, dispatch])

    if (!admin) { return null };

    return (
        <div className={classes.root}>
            {(isFetchingRafam) ? <Modal /> : (
                <MaterialTable
                    title="Rafam"
                    columns={dataColumns[type]}
                    data={rafamData}
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

