import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setCurrentUser, deleteUser, fetchUsers, setIsFetchingUser, setToggleImg } from '../../../api/actions/indexAction';
import Modal from '../../widgets/modal/TransitionsModal';
import MaterialTable from 'material-table';
import useStyles from './adminPermiso.styles';

const AdminPermiso = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { users, admin, isFetching, toggleImage } = useSelector(state => state.user);
    const classes = useStyles();
    const columns = [
        {
            title: 'Imagen',
            field: 'image',
            render: rowData => (
                <img
                    alt='no img'
                    src={rowData.image}
                    className={classes.image}
                    onClick={() => {
                        dispatch(setToggleImg(rowData.image))
                    }}
                />
            )
        },
        { title: 'Fecha de Alta', field: 'fechaAlta' },
        { title: 'Fecha de Última Modificación', field: 'fechaModificacion' },
        { title: 'Nombre', field: 'nombre' },
        { title: 'Apellido', field: 'apellido' },
        { title: 'Dni', field: 'dni' },
        { title: 'Estado del Permiso', field: 'permiso' },
        { title: 'Tipo de Permiso', field: 'permisoTipo' },
        { title: 'Email', field: 'email' },
        { title: 'Teléfono', field: 'numeroTelefono' },
        { title: 'Nro Control', field: 'numeroControl' },

    ];
    // const pruebaData = [{
    //     nombre: 'Ignacio',
    //     apellido: 'Cieza',
    //     dni: 34330373
    // }]

    useEffect(() => {
        if (admin) {
            dispatch(setIsFetchingUser(true))
            dispatch(fetchUsers());
            window.scrollTo(0, 0);
        }
    }, [admin, dispatch])

    if (!admin) { return null };

    return (
        <div className={classes.root}>
            {toggleImage.toggle && <Modal image={toggleImage.imgData} />}
            {isFetching ? <Modal /> : (
                <MaterialTable
                    title="Administrar Usuarios"
                    columns={columns}
                    //data={users}
                    data={Object.values(users)}
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
                                    dispatch(deleteUser(oldData.dni));
                                }, 100);
                            }),
                    }}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Editar',
                            onClick: (event, rowData) => {
                                dispatch(setCurrentUser(rowData));
                                history.push('/permiso/circulacion');
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