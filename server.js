const express = require('express'); //En el servidor no se usa es6, por esto se importa de esta manera
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');//--> comprime codigo para ser subido a heroku
const enforce = require('express-sslify'); //-->biblio. para encriptar https ("PWA")

///----Prueba MariaDB-----// https://github.com/mariadb-corporation/mariadb-connector-nodejs/blob/master/documentation/promise-api.md
const mariadb = require('mariadb');

if (process.env.NODE_ENV !== 'production') require('dotenv').config(); //accede .env para la clave secreta

const app = express();
const port = process.env.PORT || 5000;

app.use(compression());
app.use(bodyParser.json()); //Middalware: que hace que todos los request los parsee a json
app.use(bodyParser.urlencoded({ extended: true })); //hace que se pasen solo los caracteres habilitados para url
//app.use(enforce.HTTPS({ trustProtoHeader: true })); //encriptado https para que "PWA" pueda usarse en "Heroku"
app.use(cors());                                    //|_Activar Al actualizar Heroku!!!!! (desactivar en desarrollo)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    }) //* -> todo url que usuario "hit", golpee. se ejecuta la funcion
}

//cuando el servidor reciba la peticion de service-worker, 
//devuelva el archivo service-worker de la carpeta build 
app.get('/service-worker.js', (req, res) => {
    res.send(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});

//despues de que el codigo corra, lo pongo a escuchar en el puerto 5000.
app.listen(port, error => {
    if (error) throw error;
    console.log('server running on port:' + port);
});

app.post('/mariadb', async (req, res) => {
    const { type, data } = req.body;
    const { nombre, apellido, dni, comentario, permiso, image, numeroControl, qrData } = data ? data : 'nodata';
    let dbResp;
    let conn;
    const config = {
        host: '10.10.91.143',
        port: 3306,
        user: 'root',
        password: 'BDmuni2020',
        database: 'app_muni_per',
        connectionLimit: 5
    };
    //console.log('req!!!!:', image);

    try {
        const pool = mariadb.createPool(config);
        conn = await pool.getConnection();
        switch (type) {
            case 'post':
                dbResp = await conn.query("INSERT INTO persona VALUES(?,?,?,?,?,?,?,?)", [parseInt(dni), nombre, apellido, parseInt(numeroControl), permiso, qrData, image, comentario]);
                return res.status(200).send(dbResp);
            case 'get':
                dbResp = await conn.query("SELECT * FROM persona");
                return res.status(200).send(dbResp);
            case 'findOne':
                return res = await conn.query("SELECT * FROM persona WHERE DNI = 34330373");
            case 'patch':
                dbResp = await conn.query("UPDATE persona SET nombre= ?, apellido= ?, num_control=?, permiso=?, imagen=?, DNI_imagen=?, comentario=? WHERE DNI = ?", [nombre, apellido, numeroControl, permiso, qrData, image, comentario, dni]);
                return res.status(200).send(dbResp);
            case 'delete':
                dbResp = await conn.query(`DELETE FROM persona WHERE DNI ='${req.body.data}'`);
                return res.status(200).send(dbResp);
            default:
                break;
        }
    } catch (err) {
        console.log('Error en la conexcion!!', err);
        res.status(500).send({ error: err })
    } finally {
        if (conn) conn.release(); //release to pool
    }
});

/**
 * La descripción de la nueva bd
MariaDB [app_muni_per]> desc persona;
+-------------+-------------+------+-----+---------+-------+
| Field       | Type        | Null | Key | Default | Extra |
+-------------+-------------+------+-----+---------+-------+
| DNI         | int(8)      | NO   | PRI | NULL    |       |
| nombre      | varchar(20) | YES  |     | NULL    |       |
| apellido    | varchar(20) | YES  |     | NULL    |       |
| num_control | int(11)     | YES  |     | NULL    |       |
| permiso     | varchar(20) | YES  |     | NULL    |       |
| imagen      | mediumblob  | YES  |     | NULL    |       |
| DNI_imagen  | mediumblob  | YES  |     | NULL    |       |
| comentario  | mediumtext  | YES  |     | NULL    |       |
+-------------+-------------+------+-----+---------+-------+
 */
