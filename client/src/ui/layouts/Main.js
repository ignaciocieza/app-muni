import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import ErrorBoundary from '../widgets/error-boundary/ErrorBoundary';
import Spinner from '../widgets/with-spinner/Spinner';

const HomePage = lazy(() => import('../pages/home-page/HomePage'));
const PermisoCirculacion = lazy(() => import('../pages/permiso-circulacion/PermisoCirculacion'));
const AdminPermiso = lazy(() => import('../pages/admin-permiso/AdminPermiso'));
const DetailPage = lazy(() => import('../pages/detail-page/DetailPage'));
const SignIn = lazy(() => import('../pages/sign-in/SignIn'));
const Permisos = lazy(() => import('../pages/permisos/Permisos'));
const PermisoIngresoEgreso = lazy(() => import('../pages/permiso-ingreso/PermisoIngresoEgreso'));
const EditPage = lazy(() => import('../pages/edit-page/EditPage'));


const Main = () => (
    <React.Fragment>
        <Switch>
            <ErrorBoundary>
                <Suspense fallback={<Spinner />}>
                    <Route exact path='/' component={PermisoCirculacion} />
                    <Route exact path='/signin' component={SignIn} />
                    <Route exact path='/home' component={HomePage} />
                    <Route exact path='/permisos' component={Permisos} />
                    <Route exact path='/permiso/circulacion' component={PermisoCirculacion} />
                    <Route exact path='/permiso/ingreso' component={PermisoIngresoEgreso} />
                    <Route exact path='/permiso/edit' component={EditPage} />
                    <Route exact path='/admin' component={AdminPermiso} />
                    <Route exact path='/detail/:id' component={DetailPage} />
                </Suspense>
            </ErrorBoundary>
        </Switch>
    </React.Fragment>
);

export default Main;