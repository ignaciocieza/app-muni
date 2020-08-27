const express = require("express"); //En el servidor no se usa es6, por esto se importa de esta manera
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const compression = require("compression"); //--> comprime codigo para ser subido a heroku
const mariadb = require("mariadb");
const personaRoutes = require('./routers/persona');
const loginRoutes = require('./routers/login');
const signUp = require('./routers/signUp');
const acceso = require('./routers/acceso');
const pesca = require('./routers/pesca');
const rafam = require('./routers/rafam');

require("dotenv").config(); //accede .env para la clave secreta

const app = express();
const port = process.env.PORT || 5000;

app.use(compression());
app.use(bodyParser.json({limit: '50mb', extended: true })); //Middalware: que hace que todos los request los parsee a json
app.use(bodyParser.urlencoded({limit: '50mb', extended: true })); //hace que se pasen solo los caracteres habilitados para url
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

//Config Maria DB persona
try {
    const config = {
        host: process.env.DB_HOST_TEST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE_PER,
        //connectionLimit: 200
    };
    //var pool = mariadb.createPool(config);
    app.locals.pool = mariadb.createPool(config);
} catch (error) {
    console.log(error);
}

//Config Maria DB rafam
try {
    const config = {
        host: process.env.DB_HOST_TEST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE_RAFAM,
        //connectionLimit: 200 5
    };
    //var pool = mariadb.createPool(config);
    app.locals.poolRafam = mariadb.createPool(config);
} catch (error) {
    console.log(error);
}

//Routers
app.use(personaRoutes);
app.use(loginRoutes);
app.use(signUp);
app.use(acceso);
app.use(pesca);
app.use(rafam);


//despues de que el codigo corra, lo pongo a escuchar en el puerto 5000.
app.listen(port, (error) => {
    if (error) throw error;
    console.log("server running on port:" + port);
});