const express = require('express');
const bcrypt = require("bcryptjs");
const router = new express.Router();

router.post("/mariadb/login", async (req, res) => {
    let conn,
        dbResp,
        isMatch = false;

    try {
        conn = await req.app.locals.pool.getConnection();
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
        console.log("Error en la conexion DB usuario (Login)!!", err);
        res.status(500).send({ error: err });
    } finally {
        if (conn) conn.release(); //release to pool
    }
});

module.exports = router;