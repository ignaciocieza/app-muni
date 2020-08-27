const express = require('express');
const router = new express.Router();

router.post("/mariadb", async (req, res) => {
    let conn, dbResp;
    try {
        conn = await req.app.locals.pool.getConnection();
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
        } = data ? data : '';

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
            //throw new Error("Error Post");
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
                        parseInt(dni),
                    ]
                );
                return res.status(200).send(dbResp);
            //throw new Error("Error Patch");
            case "delete":
                dbResp = await conn.query(
                    `DELETE FROM persona WHERE DNI ='${parseInt(req.body.data)}'`
                );
                return res.status(200).send(dbResp);
            default:
                break;
        }
    } catch (err) {
        console.log("Error en la conexion DB PERSONA!!", err);
        res.status(500).send({ error: err });
    } finally {
        if (conn) conn.release(); //release to pool
    }
});

module.exports = router;