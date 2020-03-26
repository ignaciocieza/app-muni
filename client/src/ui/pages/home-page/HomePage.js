import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../../../api/actions/indexAction';

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch])

    return (
        <h1>Home Page</h1>
    );
};

export default HomePage;