const express = require("express"); //En el servidor no se usa es6, por esto se importa de esta manera
const cors = require("cors");
//const bodyParser = require("body-parser");
const path = require("path");
const compression = require("compression"); //--> comprime codigo para ser subido a heroku
const mariadb = require("mariadb");
// const personaRoutes = require("./routers/persona");
// const loginRoutes = require("./routers/login");
// const signUp = require("./routers/signUp");
// const acceso = require("./routers/acceso");
// const pesca = require("./routers/pesca");
// const rafam = require('./routers/rafam');
// const rafamComercios = require('./routers/rafamComercios');
// const rafamContribuyentes = require('./routers/rafamContribuyentes');
const bromatologia = require("./routers/bromatologiaRegistros");
const transporte = require("./routers/transporteRegistros");

// const bromatologiaDBdata = require("./db/bromatologiaDBparse");
// const nombrecomercialDB = require("./db/csvBromatologiaDBNombreComercial");
// const razonsocialDB = require("./db/csvBromatologiaDBRazon");
// const rubroDB = require("./db/csvBromatologiaDBRubro");
// const transporteDB = require("./db/transporteDBparse");
// const empresasDB = require("./db/transporteDBempresa");
// const tipoAlimentosTransportarDb = require("./db/transporteDBtipoAlimento");
// const localidadesDB = require("./db/trasnporteDBLocalidades");
// const arrayData = require("./array");
// const fs = require("fs");
// const bromatologiaJSon = require("./db/csvBromatologiaDB");
// const transportistasJSon = require("./db/csvTransportistasDB");
// const moment = require("moment");

require("dotenv").config(); //accede .env para la clave secreta

const app = express();
const port = process.env.PORT || 5000;

app.use(compression());
app.use(express.json({ limit: "50mb", extended: true })); //Middalware: que hace que todos los request los parsee a json
app.use(express.urlencoded({ limit: "50mb", extended: true })); //hace que se pasen solo los caracteres habilitados para url
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  }); //* -> todo url que usuario "hit", golpee. se ejecuta la funcion
}

//cuando el servidor reciba la peticion de service-worker,
//devuelva el archivo service-worker de la carpeta build
app.get("/service-worker.js", (req, res) => {
  res.send(path.resolve(__dirname, "..", "build", "service-worker.js"));
});

//////Config DB///////////////
let conn;
try {
  const config = {
    //host: process.env.DB_HOST_TEST,
    host: process.env.DB_HOST_PROD,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_BROMATOLOGIA,
    //connectionLimit: 200
  };

  app.locals.poolBromatologia = mariadb.createPool(config);
} catch (error) {
  console.log(error);
} finally {
  if (conn) conn.release(); //release to pool
}


//Routers
app.use(bromatologia);
app.use(transporte);
// app.use(personaRoutes);
// app.use(loginRoutes);
// app.use(signUp);
// app.use(acceso);
// app.use(pesca);
// app.use(rafam);
// app.use(rafamComercios);
// app.use(rafamContribuyentes);

//despues de que el codigo corra, lo pongo a escuchar en el puerto 5000.
app.listen(port, (error) => {
  if (error) throw error;
  console.log("server running on port:" + port);
});
