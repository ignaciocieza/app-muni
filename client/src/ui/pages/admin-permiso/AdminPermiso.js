import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setCurrentUser, deleteUser, fetchUsers, setIsFetchingUser } from '../../../api/actions/indexAction';
import MaterialTable from 'material-table';
import Modal from '../../widgets/modal/TransitionsModal';
import useStyles from './adminPermiso.styles';

const AdminPermiso = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { users, admin, isFetching } = useSelector(state => state.user);
    const classes = useStyles();
    const columns = [
        {
            title: 'Imagen',
            field: 'image',
            render: rowData => <img alt='no img' src={rowData.image} style={{ boxShadow: '5px 5px 8px -6px rgba(0,0,0,0.65)', width: 50, borderRadius: '50%', height: 50 }} />
        },
        { title: 'Nombre', field: 'nombre' },
        { title: 'Apellido', field: 'apellido' },
        { title: 'Dni', field: 'dni' },
        { title: 'Estado del Permiso', field: 'permiso' },
        { title: 'Tipo de Permiso', field: 'permisoTipo' },        
        { title: 'Email', field: 'email' },
        { title: 'Teléfono', field: 'numeroTelefono' },
        { title: 'Nro Control', field: 'numeroControl' },
        
    ];

    useEffect(() => {
        if (admin) {
            dispatch(setIsFetchingUser(true))
            dispatch(fetchUsers());
            window.scrollTo(0, 0);
        }
    }, [admin, dispatch])

    return (
        <React.Fragment>
            {admin && (
                <div className={classes.root}>
                    {isFetching && <Modal />}
                    <MaterialTable
                        title="Administrar Usuarios"
                        columns={columns}
                        data={users}
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Editar',
                                onClick: (event, rowData) => {
                                    dispatch(setCurrentUser(rowData));
                                    history.push('/permiso/circulacion');
                                },
                            },
                            {
                                icon: 'delete',
                                tooltip: 'Borrar',
                                onClick: (event, rowData) => {
                                    dispatch(deleteUser(rowData.dni));
                                    //console.dir(rowData.dni);
                                    //history.push('/');
                                }
                            },
                            {
                                icon: 'details',
                                tooltip: 'Detalle',
                                onClick: (event, rowData) => {
                                    //dispatch(deleteUser(rowData.id));
                                    //console.dir(rowData.id);
                                    history.push(`/detail/${rowData.dni}`);
                                }
                            }
                        ]}
                    />
                </div>
            )}
        </React.Fragment>
    );
};

export default AdminPermiso;