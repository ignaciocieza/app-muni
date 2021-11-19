import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import ErrorBoundary from "../widgets/error-boundary/ErrorBoundary";
import Spinner from "../widgets/with-spinner/Spinner";

const SignIn = lazy(() => import("../pages/sign-in/SignIn"));
const Home = lazy(() => import("../pages/home-page/HomePage"));
const BromatologiaMain = lazy(() =>
  import("../pages/bromatologia/bromatologia-main/BromatologiaMain")
);
const NuevaActa = lazy(() =>
  import("../pages/bromatologia/nueva-acta/NuevaActa")
);
const AdministrarActas = lazy(() =>
  import("../pages/bromatologia/administrar-actas/AdministrarActas")
);
const BromatologiaClaves = lazy(() =>
  import("../pages/bromatologia/administrar-claves/AdministrarClaves")
);
const PrintBromatologia = lazy(() =>
  import("../pages/bromatologia/print-bromatologia/PrintBromatologia")
);
const TransportistasMain = lazy(() =>
  import("../pages/transportistas/transportistas-main/TransportistasMain")
);
const ListaTransportistas = lazy(() =>
  import("../pages/transportistas/lista-transportistas/ListaTransportistas")
);
const AdministrarClaves = lazy(() =>
  import("../pages/transportistas/administrar-claves/AdministrarClaves")
);
const NuevoTransportista = lazy(() =>
  import("../pages/transportistas/nuevo-transportista/NuevoTransportista")
);
const DetalleTransportista = lazy(() =>
  import("../pages/transportistas/detalle-transportista/DetalleTransportista")
);
const NuevoViaPublica = lazy(() =>
  import("../pages/veterinaria/via-publica/nuevo-viapublica/NuevoViaPublica")
);
const VeterinariaMain = lazy(() =>
  import("../pages/veterinaria/veterinaria-main/VeterinariaMain")
);
const ListaViaPublica = lazy(() =>
  import("../pages/veterinaria/via-publica/lista/ListaViaPublica")
);
const AdministrarClavesVeterinaria = lazy(() =>
  import("../pages/veterinaria/administrar-claves/AdministrarClaves")
);
const AdminPanel = lazy(() => import("../pages/admin-panel/AdminPanel"));

export default function Main() {
  const { admin } = useSelector((state) => state.user);
  return (
    <Switch>
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/home" component={BromatologiaMain} />
          <Route exact path="/signout" component={Home} />
          <Route
            exact
            path="/bromatologia/administrar"
            component={AdministrarActas}
          />
          <Route
            exact
            path="/bromatologia/historial"
            component={AdministrarActas}
          />
          <Route
            exact
            path="/bromatologia/claves"
            component={BromatologiaClaves}
          />
          <Route
            path="/bromatologia/detail/:id+"
            component={PrintBromatologia}
          />
          <Route exact path="/bromatologia/form" component={NuevaActa} />
          <Route
            exact
            path="/transportistas/main"
            component={TransportistasMain}
          />
          <Route
            exact
            path="/transportistas/administrar"
            component={ListaTransportistas}
          />
          <Route
            exact
            path="/transportistas/claves"
            component={AdministrarClaves}
          />
          <Route
            exact
            path="/transportistas/form"
            component={NuevoTransportista}
          />
          <Route
            exact
            path="/transportistas/detail/:id+"
            component={DetalleTransportista}
          />
          <Route
            exact
            path="/veterinaria/viapublica/main"
            component={VeterinariaMain}
          />
          <Route
            exact
            path="/veterinaria/viapublica/form"
            component={NuevoViaPublica}
          />
          <Route
            exact
            path="/veterinaria/viapublica/lista"
            component={ListaViaPublica}
          />
          <Route
            exact
            path="/veterinaria/viapublica/claves"
            component={AdministrarClavesVeterinaria}
          />
          <Route
            exact
            path="/admin"
            component={AdminPanel}
          />

          {!admin && <Redirect to="/" />}
        </Suspense>
      </ErrorBoundary>
    </Switch>
  );
}
