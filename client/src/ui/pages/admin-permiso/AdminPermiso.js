import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setCurrentUser, deleteUser } from '../../../api/actions/indexAction';
import MaterialTable from 'material-table';

const AdminPermiso = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const usersItems = useSelector(state => {
        if (state.users) {
            return Object.values(state.users);
        }
        return '';
    });
    const columns = [
        { title: 'Nombre', field: 'nombre' },
        { title: 'Apellido', field: 'apellido' },
        { title: 'Dni', field: 'dni' },
        { title: 'Nro Control', field: 'numeroControl' },
        {
            field: 'image',
            title: 'Imagen',
            render: rowData => <img alt='no img' src={rowData.image} style={{ width: 50, borderRadius: '50%' }} />
        },
        { title: 'Permiso', field: 'permiso' },
    ];

    // useEffect(()=>{

    // },[])

    return (
        <MaterialTable
            title="Editable Example"
            columns={columns}
            data={usersItems}
            actions={[
                {
                    icon: 'edit',
                    tooltip: 'Edit',
                    onClick: (event, rowData) => {
                        dispatch(setCurrentUser(rowData));
                        history.push('/generar');
                    },
                },
                {
                    icon: 'delete',
                    tooltip: 'Delete',
                    onClick: (event, rowData) => {
                        dispatch(deleteUser(rowData.id));
                        //console.dir(rowData.id);
                        //history.push('/');
                    }
                }
            ]}
        />
    );
};

export default AdminPermiso;