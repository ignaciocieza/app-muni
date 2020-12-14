const express = require('express');
const router = new express.Router();

/**
 * Configuracion de BD de rafam
 */

router.post("/rafam/contribuyentes/get", async (req, res) => {
    let conn, dbResp;
    try {
        conn = await req.app.locals.poolRafam.getConnection();
        //nro_contribuyentes: 48
        //length: 33431
        dbResp = await conn.query(
            `SELECT * FROM ing_contribuyentes`
        );
        console.log('envia respuesta')
        return res.status(200).send(dbResp);
    } catch (err) {
        console.log("Error en la conexion DB Rafam!!", err);
        res.status(500).send({ error: err });
    } finally {
        if (conn) conn.release(); //release to pool
    }
});

router.post("/rafam/contribuyentes/findone", async (req, res) => {
    let conn, dbResp;
    try {
        conn = await req.app.locals.poolRafam.getConnection();

        dbResp = await conn.query(
            `SELECT * FROM ing_contribuyentes WHERE nro_contrib = ${parseInt(req.body.data.nro)}`
        );
        console.log('envia respuesta')
        return res.status(200).send(dbResp);

    } catch (err) {
        console.log("Error en la conexion DB Rafam!!", err);
        res.status(500).send({ error: err });
    } finally {
        if (conn) conn.release(); //release to pool
    }
});

module.exports = router;