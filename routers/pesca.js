const express = require('express');
const router = new express.Router();

router.post("/mariadb/pesca", async (req, res) => {
    let conn, dbResp;
    try {
        conn = await req.app.locals.pool.getConnection();
        const { type, data } = req.body;
        const {
            dni,
            fecha,
            lugarPesca,
        } = data ? data : '';

        switch (type) {
            case "post":
                dbResp = await conn.query(
                    "INSERT INTO `pesca` VALUES(?,?,?,?,?)",
                    [
                        parseInt(dni),
                        fecha,
                        lugarPesca,
                        'auxpescauno',
                        'auxpescados',
                    ]
                );
                return res.status(200).send(dbResp);
            case "get":
                dbResp = await conn.query("SELECT * FROM pesca");
                return res.status(200).send(dbResp);
            case "findOne":
                dbResp = await conn.query(
                    `SELECT * FROM pesca WHERE DNI = ${parseInt(dni)}`
                );
                return res.status(200).send(dbResp);
            case "patch":
                dbResp = await conn.query(
                    "UPDATE `pesca` SET fecha= ?, lugardepesca= ?, auxpescauno=?, auxpescados=?  WHERE DNI=?",
                    [
                        fecha,
                        lugarPesca,
                        'auxpescauno',
                        'auxpescados',
                        parseInt(dni),
                    ]
                );
                return res.status(200).send(dbResp);
            case "delete":
                dbResp = await conn.query(
                    `DELETE FROM pesca WHERE DNI ='${parseInt(req.body.data)}'`
                );
                return res.status(200).send(dbResp);
            default:
                break;
        }
    } catch (err) {
        console.log("Error en la conexion: DB pesca!!", err);
        res.status(500).send({ error: err });
    } finally {
        if (conn) conn.release(); //release to pool
    }
});

module.exports = router;