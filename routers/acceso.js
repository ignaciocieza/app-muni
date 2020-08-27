const express = require('express');
const router = new express.Router();

router.post("/mariadb/acceso", async (req, res) => {
    let conn, dbResp;
    try {
        conn = await req.app.locals.pool.getConnection();
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
        } = data ? data : '';

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
                        parseInt(dni),
                    ]
                );
                return res.status(200).send(dbResp);
            case "delete":
                dbResp = await conn.query(
                    `DELETE FROM acceso WHERE DNI ='${parseInt(req.body.data)}'`
                );
                return res.status(200).send(dbResp);
            default:
                break;
        }
    } catch (err) {
        console.log("Error en la conexion DB acceso!!", err);
        res.status(500).send({ error: err });
    } finally {
        if (conn) conn.release(); //release to pool
    }
});

module.exports = router;