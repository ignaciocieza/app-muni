const express = require("express"); //En el servidor no se usa es6, por esto se importa de esta manera
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const compression = require("compression"); //--> comprime codigo para ser subido a heroku
//const enforce = require('express-sslify'); //-->biblio. para encriptar https ("PWA")
const mariadb = require("mariadb");
const bcrypt = require("bcryptjs");
//const fileUpload = require('express-fileupload');
//const Jimp = require('jimp');

require("dotenv").config(); //accede .env para la clave secreta

const app = express();
const port = process.env.PORT || 5000;

app.use(compression());
app.use(bodyParser.json()); //Middalware: que hace que todos los request los parsee a json
app.use(bodyParser.urlencoded({ extended: true })); //hace que se pasen solo los caracteres habilitados para url
//app.use(enforce.HTTPS({ trustProtoHeader: true })); //encriptado https para que "PWA" pueda usarse en "Heroku"
app.use(cors()); //|_Activar Al actualizar Heroku!!!!! (desactivar en desarrollo)
//app.use(fileUpload());

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

//despues de que el codigo corra, lo pongo a escuchar en el puerto 5000.
app.listen(port, (error) => {
    if (error) throw error;
    console.log("server running on port:" + port);
});

try {
    const config = {
        host: process.env.DB_HOST_PROD,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        //connectionLimit: 200
    };
    var pool = mariadb.createPool(config);
} catch (error) {
    console.log(error);
}

app.post("/mariadb", async (req, res) => {
    let conn, dbResp;
    try {
        conn = await pool.getConnection();
        const { type, data } = req.body;
        const {
            dni,
            nombre,
            apellido,
            permiso,
            qrData,
            image,
            numeroControl,
            comentario,
            numeroTelefono,
            domicilio,
            nombreComercio,
            email,
            permisoTipo,
            fechaAlta,
            fechaModificacion,
        } = data ? data : "Sin especificar";

        switch (type) {
            case "post":
                dbResp = await conn.query(
                    "INSERT INTO `persona` VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    [
                        parseInt(dni),
                        nombre,
                        apellido,
                        numeroControl,
                        permiso,
                        qrData,
                        image,
                        comentario,
                        numeroTelefono,
                        domicilio,
                        nombreComercio,
                        email,
                        permisoTipo,
                        fechaModificacion,
                        fechaAlta,
                        "user",
                    ]
                );
                return res.status(200).send(dbResp);
            case "get":
                dbResp = await conn.query("SELECT * FROM persona");
                return res.status(200).send(dbResp);
            case "findOne":
                dbResp = await conn.query(
                    `SELECT * FROM persona WHERE DNI = ${parseInt(dni)}`
                );
                return res.status(200).send(dbResp);
            case "patch":
                dbResp = await conn.query(
                    "UPDATE `persona` SET nombre= ?, apellido= ?, num_control=?, permiso=?, imagen=?, DNI_imagen=?, comentario=?, tel=?, dir=?, comercio=?, correo=?, tipo_permiso=?, fecha_mod=?, fecha_alta=?, userDbType=? WHERE DNI=?",
                    [
                        nombre,
                        apellido,
                        numeroControl,
                        permiso,
                        qrData,
                        image,
                        comentario,
                        numeroTelefono,
                        domicilio,
                        nombreComercio,
                        email,
                        permisoTipo,
                        fechaModificacion,
                        fechaAlta,
                        "user",
                        dni,
                    ]
                );
                return res.status(200).send(dbResp);
            case "delete":
                dbResp = await conn.query(
                    `DELETE FROM persona WHERE DNI ='${req.body.data}'`
                );
                return res.status(200).send(dbResp);
            default:
                break;
        }
    } catch (err) {
        console.log("Error en la conexion!!", err);
        res.status(500).send({ error: err });
    } finally {
        if (conn) conn.release(); //release to pool
    }
});

app.post("/mariadb/login", async (req, res) => {
    let conn,
        dbResp,
        isMatch = false;
    try {
        conn = await pool.getConnection();
        const { email, password } = req.body;
        dbResp = await conn.query(
            `SELECT * FROM ingreso WHERE usuario = '${email.toLowerCase().trim()}'`
        );
        //dbResp = await conn.query("SELECT * FROM ingreso");

        //por cuestiones de seguridad
        //no se debe especificar si es el mail o la contraseña lo que esta mal!!!!
        if (dbResp) {
            isMatch = await bcrypt.compare(password, dbResp[0].clave);
        }
        return res.status(200).send({ isUser: isMatch });
    } catch (err) {
        console.log("Error en la conexion!!", err);
        res.status(500).send({ error: err });
    } finally {
        if (conn) conn.release(); //release to pool
    }
});

app.post("/mariadb/signup", async (req, res) => {
    let conn,
        dbResp,
        hashClave,
        isMatch = false;
    try {
        conn = await pool.getConnection();
        const { email, newPassword, password } = req.body;
        dbResp = await conn.query(
            `SELECT * FROM ingreso WHERE usuario = '${email.toLowerCase().trim()}'`
        );

        if (dbResp) {
            isMatch = await bcrypt.compare(password, dbResp[0].clave);
            if (isMatch) {
                hashClave = await bcrypt.hash(newPassword, 8);
                dbResp = await conn.query(
                    "UPDATE `ingreso` SET clave= ? WHERE usuario=? ",
                    [hashClave, email]
                );
            }
        }
        return res.status(200).send({ isUser: isMatch });
    } catch (err) {
        console.log("Error en la conexion!!", err);
        res.status(500).send({ error: err });
    } finally {
        if (conn) conn.release(); //release to pool
    }
});

app.post("/mariadb/acceso", async (req, res) => {
    let conn, dbResp;
    try {
        conn = await pool.getConnection();
        const { type, data } = req.body;
        const {
            dni,
            nombre,
            apellido,
            cantidadPasajeros,
            dniPasajeros,
            acceso,
            residencia,
            domicilio,
            registro,
            motivoViaje,
            numeroTelefono,
            destinoViaje,
            tiempoDestino,
            patente,
            entraCuarentena,
            observaciones,
            fechaAlta,
            otroDestinoViaje,
            otroAcceso,
            otroMotivoViaje,
            otroResidencia,
            otroTiempoDestino,
        } = data ? data : "Sin especificar";

        switch (type) {
            case "post":
                dbResp = await conn.query(
                    "INSERT INTO `acceso` VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    [
                        parseInt(dni),
                        acceso,
                        registro,
                        motivoViaje,
                        residencia,
                        domicilio,
                        destinoViaje,
                        tiempoDestino,
                        "numeroTelefono",
                        "alt",
                        patente,
                        cantidadPasajeros,
                        dniPasajeros,
                        entraCuarentena,
                        observaciones,
                        nombre,
                        apellido,
                        fechaAlta,
                        numeroTelefono,
                        otroDestinoViaje,
                        otroAcceso,
                        otroMotivoViaje,
                        otroResidencia,
                        otroTiempoDestino,
                        "age",
                    ]
                );
                return res.status(200).send(dbResp);
            case "get":
                dbResp = await conn.query("SELECT * FROM acceso");
                return res.status(200).send(dbResp);
            case "findOne":
                dbResp = await conn.query(
                    `SELECT * FROM acceso WHERE DNI = ${parseInt(dni)}`
                );
                return res.status(200).send(dbResp);
            case "patch":
                dbResp = await conn.query(
                    "UPDATE `acceso` SET acceso_ciudad= ?, registro= ?, motivo=?, residencia=?, origen=?, destino=?, tiempo_destino=?, dir_destino=?, altura_destino=?, patente=?, pasajeros=?, DNI_pasajeros=?, cuarentena=?, observaciones=?,nombre=?,apellido=?, fecha_alta=?, numeroTelefono=?, otroDestinoViaje=?, otroAcceso=?, otroMotivoViaje=?, otroResidencia=?, otroTiempoDestino=?, agenteDbType=?  WHERE DNI=?",
                    [
                        acceso,
                        registro,
                        motivoViaje,
                        residencia,
                        domicilio,
                        destinoViaje,
                        tiempoDestino,
                        "numeroTelefono",
                        "alt",
                        patente,
                        cantidadPasajeros,
                        dniPasajeros,
                        entraCuarentena,
                        observaciones,
                        nombre,
                        apellido,
                        fechaAlta,
                        numeroTelefono,
                        otroDestinoViaje,
                        otroAcceso,
                        otroMotivoViaje,
                        otroResidencia,
                        otroTiempoDestino,
                        "age",
                        dni,
                    ]
                );
                return res.status(200).send(dbResp);
            case "delete":
                dbResp = await conn.query(
                    `DELETE FROM acceso WHERE DNI ='${req.body.data}'`
                );
                return res.status(200).send(dbResp);
            default:
                break;
        }
    } catch (err) {
        console.log("Error en la conexion!!", err);
        res.status(500).send({ error: err });
    } finally {
        if (conn) conn.release(); //release to pool
    }
});
