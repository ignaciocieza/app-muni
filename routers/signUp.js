const express = require('express');
const bcrypt = require("bcryptjs");
const router = new express.Router();

router.post("/mariadb/signup", async (req, res) => {
    let conn,
        dbResp,
        hashClave,
        isMatch = false;

    try {
        conn = await req.app.locals.pool.getConnection();
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
        console.log("Error en la conexion, DB usuario (SignUp)!!", err);
        res.status(500).send({ error: err });
    } finally {
        if (conn) conn.release(); //release to pool
    }
});

module.exports = router;