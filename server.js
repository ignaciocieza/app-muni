const express = require('express'); //En el servidor no se usa es6, por esto se importa de esta manera
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');//--> comprime codigo para ser subido a heroku
const enforce = require('express-sslify'); //-->biblio. para encriptar https ("PWA")
const mariadb = require('mariadb');
const fileUpload = require('express-fileupload');
const Jimp = require('jimp');

if (process.env.NODE_ENV !== 'production') require('dotenv').config(); //accede .env para la clave secreta

const app = express();
const port = process.env.PORT || 5000;

app.use(compression());
app.use(bodyParser.json()); //Middalware: que hace que todos los request los parsee a json
app.use(bodyParser.urlencoded({ extended: true })); //hace que se pasen solo los caracteres habilitados para url
//app.use(enforce.HTTPS({ trustProtoHeader: true })); //encriptado https para que "PWA" pueda usarse en "Heroku"
app.use(cors());                                    //|_Activar Al actualizar Heroku!!!!! (desactivar en desarrollo)
app.use(fileUpload());


app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
}) //* -> todo url que usuario "hit", golpee. se ejecuta la funcion


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
try {
    const config = {
        host: '192.168.150.101',
        port: 3306,
        user: 'app',
        password: 'BDmuni2020',
        database: 'app_muni_per',
        //connectionLimit: 200
    };
    var pool = mariadb.createPool(config);

} catch (error) {
    console.log(error);
}

app.post('/mariadb', async (req, res) => {
    const { type, data } = req.body;
    const { nombre, apellido, dni, comentario, permiso, image, numeroControl, qrData } = data ? data : 'nodata';
    let dbResp;
    let conn;

    try {
        conn = await pool.getConnection();
        switch (type) {
            case 'post':
                dbResp = await conn.query("INSERT INTO `persona` VALUES(?,?,?,?,?,?,?,?)", [parseInt(dni), nombre, apellido, parseInt(numeroControl), permiso, qrData, image, comentario]);
                //dbResp= await conn.query("INSERT INTO `persona` VALUE (?)", [34330373])
                return res.status(200).send(dbResp);
            case 'get':
                dbResp = await conn.query("SELECT * FROM persona");
                return res.status(200).send(dbResp);
            case 'findOne':
                dbResp = await conn.query(`SELECT * FROM persona WHERE DNI = ${parseInt(dni)}`);
                return res.status(200).send(dbResp);
            case 'patch':
                dbResp = await conn.query("UPDATE `persona` SET nombre= ?, apellido= ?, num_control=?, permiso=?, imagen=?, DNI_imagen=?, comentario=? WHERE DNI = ?", [nombre, apellido, numeroControl, permiso, qrData, image, comentario, dni]);
                return res.status(200).send(dbResp);
            case 'delete':
                dbResp = await conn.query(`DELETE FROM persona WHERE DNI ='${req.body.data}'`);
                return res.status(200).send(dbResp);
            default:
                break;
        }
    } catch (err) {
        console.log('Error en la conexion!!', err);
        res.status(500).send({ error: err })
    } finally {
        if (conn) conn.release(); //release to pool
    }
});

app.post('/fileupload', async (req, res) => {
    // if (req.files === null) {
    //     return res.status(400).json({ msg: 'No file uploaded' });
    // }
    //console.log(req)
    //const file = req.files.file;
    //const file= req.body.file;
    // console.log(file)
    // const dni = req.body.dni;
    var formData = new FormData();
    formData.append('file', req.body.file);
    console.log(formData);

    await file.mv(`${__dirname}/client/public/uploads/${dni}${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err)
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
    });
});

app.post('/jimp', async (req, res) => {

    const file = req.files.file;
    console.log(file);
    await Jimp.read(file, (err, lenna) => {
        if (err) throw err;
        lenna
            .resize(200, Jimp.AUTO) // resize
            .quality(80) // set JPEG quality
            .write(`${__dirname}/client/public/uploads/${dni}${file.name}`); // save
    });

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
})
