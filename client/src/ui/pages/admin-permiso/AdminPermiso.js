import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setCurrentUser, setToggleImg } from '../../../api/actions/user/userActions';
import { fetchUsersAgentesStart, deleteUserAgenteStart, setCurrentUserAgente, setIsFetchingMerge } from '../../../api/actions/merge/mergeActions';
import Modal from '../../widgets/modal/TransitionsModal';
import Spinner from '../../widgets/with-spinner/Spinner';
import MaterialTable from 'material-table';
import { sinEspecificar } from '../../../constants';
import useStyles from './adminPermiso.styles';

const AdminPermiso = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { admin, toggleImage } = useSelector(state => state.user);
    const { merge, isFetchingMerge } = useSelector(state => state.merge);
    const classes = useStyles();
    const columns = [
        {
            title: 'Imagen',
            field: 'image',
            render: rowData => (
                ((rowData.image) && (rowData.image !== sinEspecificar)) && (
                    <img
                        alt='no img'
                        src={rowData.image}
                        className={classes.image}
                        onClick={() => {
                            dispatch(setToggleImg(rowData.image))
                        }}
                    />)
            )
        },
        { title: 'Fecha de Alta', field: 'fechaAlta' },
        { title: 'Fecha de Última Modificación', field: 'fechaModificacion' },
        { title: 'Tipo de Permiso', field: 'permisoTipo' },
        {
            title: 'Estado del Permiso',
            field: 'permiso',
            render: rowData => (rowData.permiso ? rowData.permiso : 'PENDIENTE')
        },
        { title: 'Nombre', field: 'nombre' },
        { title: 'Apellido', field: 'apellido' },
        { title: 'Dni', field: 'dni' },
        // {
        //     title: 'Agente de Control de Tránsito',
        //     field: 'esAgente',
        //     render: rowData => (rowData.esAgente ? 'SI' : 'NO')
        // },
        { title: 'Email', field: 'email' },
        { title: 'Teléfono', field: 'numeroTelefono' },
        { title: 'Nro Control', field: 'numeroControl' },
    ];

    useEffect(() => {
        if (admin) {
            dispatch(setIsFetchingMerge(true))
            dispatch(fetchUsersAgentesStart())
            window.scrollTo(0, 0);
        }
    }, [admin, dispatch])

    if (!admin) { return null };

    return (
        <div className={classes.root}>
            {toggleImage.toggle && <Modal image={toggleImage.imgData} />}
            {(isFetchingMerge) ? <Spinner/> : (
                <MaterialTable
                    title="Administrar Usuarios"
                    columns={columns}
                    data={Object.values(merge)}
                    //data={pruebaData}
                    //options={{ pageSize: 10 }}
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
                    editable={{
                        onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    dispatch(deleteUserAgenteStart(oldData.dni))
                                }, 100);
                            }),
                    }}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Editar',
                            onClick: (event, rowData) => {
                                dispatch(setCurrentUser(rowData));
                                history.push('/permiso/edit');
                            },
                        },
                        // {
                        //     icon: 'delete',
                        //     tooltip: 'Borrar',
                        //     onClick: (event, rowData) => {
                        //         dispatch(deleteUser(rowData.dni));
                        //         //console.dir(rowData.dni);
                        //         //history.push('/');
                        //     }
                        // },
                        {
                            icon: 'details',
                            tooltip: 'Detalle',
                            onClick: (event, rowData) => {
                                dispatch(setCurrentUserAgente(rowData))
                                history.push(`/detail/${rowData.dni}`);
                            }
                        }
                    ]}
                />
            )}
        </div>
    );
};

export default AdminPermiso;