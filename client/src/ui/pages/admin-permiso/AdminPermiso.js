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
        { title: 'Nombre', field: 'nombre' },
        { title: 'Apellido', field: 'apellido' },
        { title: 'Dni', field: 'dni' },
        { title: 'Nro Control', field: 'numeroControl' },
        {
            title: 'Imagen',
            field: 'image',
            render: rowData => <img alt='no img' src={rowData.image} style={{ width: 50, borderRadius: '50%' }} />
        },
        { title: 'Permiso', field: 'permiso' },
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