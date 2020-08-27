const express = require('express');
const router = new express.Router();

/**
 * Configuracion de BD de rafam
 */

router.post("/rafam", async (req, res) => {
    let conn, dbResp;
    try {
        conn = await req.app.locals.poolRafam.getConnection();
        const { type, data, subType } = req.body;

        switch (type) {
            case "comercios":
                //nro_comercio: 10550
                //length: 924
                if (subType === 'get') {
                    dbResp = await conn.query(
                        `SELECT * FROM ing_comercios`
                    );
                } else {
                    dbResp = await conn.query(
                        `SELECT * FROM ing_comercios WHERE nro_comercio = ${parseInt(data.nro)}`
                    );
                }
                return res.status(200).send(dbResp);
            case "inmuebles":
                //nro_inmueble: 515
                //length: 15815
                if (subType === 'get') {
                    dbResp = await conn.query(
                        `SELECT * FROM ing_inmuebles `
                    );
                } else {
                    dbResp = await conn.query(
                        `SELECT * FROM ing_inmuebles WHERE nro_inmueble = ${parseInt(data.nro)}`
                    );
                }
                return res.status(200).send(dbResp);
            case "rodados":
                //nro_rodado: 824
                //length: 15488
                if (subType === 'get') {
                    dbResp = await conn.query(
                        `SELECT * FROM ing_rodados`
                    );
                } else {
                    dbResp = await conn.query(
                        `SELECT * FROM ing_rodados WHERE nro_rodado = ${parseInt(data.nro)}`
                    );
                }
                return res.status(200).send(dbResp);
            case "contribuyentes":
                //nro_contribuyentes: 48
                //length: 33431
                if (subType === 'get') {
                    dbResp = await conn.query(
                        `SELECT * FROM ing_contribuyentes`
                    );
                } else {
                    dbResp = await conn.query(
                        `SELECT * FROM ing_contribuyentes WHERE nro_contrib = ${parseInt(data.nro)}`
                    );
                }
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