const express = require('express');
const router = new express.Router();

/**
 * Configuracion de BD de rafam
 */

router.post("/rafam/comercios", async (req, res) => {
    let conn, dbResp;
    try {
        conn = await req.app.locals.poolRafam.getConnection();
        const { data, subType } = req.body;

        switch (subType) {
            case "get":
                //nro_comercio: 10550
                //length: 924
                    dbResp = await conn.query(
                        `SELECT * FROM ing_comercios`
                    );
                return res.status(200).send(dbResp);
            case "findOne":
                dbResp = await conn.query(
                    `SELECT * FROM ing_comercios WHERE nro_comercio = ${parseInt(data.nro)}`
                );
                return res.status(200).send(dbResp);
            default:
                break;
        }
    } catch (err) {
        console.log("Error en la conexion DB Rafam!!", err);
        res.status(500).send({ error: err });
    } finally {
        if (conn) conn.release(); //release to pool
    }
});

module.exports = router;