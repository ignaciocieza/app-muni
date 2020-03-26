import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import ErrorBoundary from '../widgets/error-boundary/ErrorBoundary';
import Spinner from '../widgets/with-spinner/Spinner';

const HomePage = lazy(() => import('../pages/home-page/HomePage'));
const GenerarPermiso = lazy(() => import('../pages/generar-permiso/GenerarPermiso'));
const AdminPermiso = lazy(() => import('../pages/admin-permiso/AdminPermiso'));
const DetailPage = lazy(() => import('../pages/detail-page/DetailPage'));

const Main = () => (
    <React.Fragment>
        <Switch>
            <ErrorBoundary>
                <Suspense fallback={<Spinner />}>  
                    <Route exact path='/' component={HomePage} />                 
                    <Route exact path='/generar' component={GenerarPermiso} />
                    <Route exact path='/admin' component={AdminPermiso} />  
                    <Route exact path='/detail/:id' component={DetailPage} />                        
                </Suspense>
            </ErrorBoundary>
        </Switch>
    </React.Fragment>
);

export default Main;