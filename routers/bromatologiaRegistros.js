const express = require("express");
const router = new express.Router();

router.post("/mariadb/bromatologia/registros/post", async (req, res) => {
  let conn, dbResp;

  try {
    conn = await req.app.locals.poolBromatologia.getConnection();
    const {
      data: { valuesForm, data },
    } = req.body;

    // id: varchar (PRI Key)
    // valuesForm: JSON
    // data:JSON

    dbResp = await conn.query("INSERT INTO `permiso` VALUES(?,?,?)", [
      valuesForm.expediente,
      JSON.stringify(valuesForm),
      JSON.stringify(data),
    ]);
    //console.log(dbResp);
    //throw new Error('¡Ups!')
    return res.status(200).send(dbResp);
  } catch (err) {
    console.log("Error en la conexion DB Bromatologia, POST!!", err);
    res.status(500).send({ error: err });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

router.post("/mariadb/bromatologia/registros/get", async (req, res) => {
  let conn, dbResp;

  try {
    conn = await req.app.locals.poolBromatologia.getConnection();
    dbResp = await conn.query("SELECT * FROM permiso");
    //console.log(dbResp);
    return res.status(200).send(dbResp);
  } catch (err) {
    console.log("Error en la conexion DB Bromatologia, GET!!", err);
    res.status(500).send({ error: err });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

router.post("/mariadb/bromatologia/registros/delete", async (req, res) => {
  let conn, dbResp;

  // id: varchar (PRI Key)
  // valuesForm: JSON
  // data:JSON
  try {
    conn = await req.app.locals.poolBromatologia.getConnection();
    const { id } = req.body;

    dbResp = await conn.query(
      `DELETE FROM permiso WHERE id ='${id}'`
    );
    return res.status(200).send(dbResp);
    //throw new Error('¡Ups!')
  } catch (err) {
    console.log("Error en la conexion DB Bromatologia, DELETE!!", err);
    res.status(500).send({ error: err });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

router.post("/mariadb/bromatologia/registros/patch", async (req, res) => {
  let conn, dbResp;

  try {
    conn = await req.app.locals.poolBromatologia.getConnection();
    const {
      data: { valuesForm, data },
    } = req.body;

    // id: varchar (PRI Key)
    // valuesForm: JSON
    // data:JSON

    dbResp = await conn.query(
      "UPDATE `permiso` SET valuesFrom=?, data=?  WHERE id=?",
      [JSON.stringify(valuesForm), JSON.stringify(data), valuesForm.expediente]
    );
    //console.log(dbResp);
    return res.status(200).send(dbResp);
  } catch (err) {
    console.log("Error en la conexion DB Bromatologia, PATCH!!", err);
    res.status(500).send({ error: err });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

router.post("/mariadb/bromatologia/valoresunicos/get", async (req, res) => {
  let conn, dbResp;

  try {
    conn = await req.app.locals.poolBromatologia.getConnection();
    dbResp = await conn.query("SELECT * FROM valoresUnicos");
    //console.log(dbResp);
    return res.status(200).send(dbResp);
  } catch (err) {
    console.log("Error en la conexion DB valoresUnicos, GET!!", err);
    res.status(500).send({ error: err });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

router.post("/mariadb/bromatologia/valoresunicos/patch", async (req, res) => {
  let conn, dbResp;

  // id: int
  // nombrecomercial: JSON
  // razonsocial: JSON
  // rubro: JSON

  try {
    conn = await req.app.locals.poolBromatologia.getConnection();
    const { nombreComercial, razonSocial, rubro }= req.body;

    dbResp = await conn.query(
      "UPDATE `valoresUnicos` SET nombrecomercial=?, razonsocial=?, rubro=?  WHERE id=?",
      [
        JSON.stringify(nombreComercial),
        JSON.stringify(razonSocial),
        JSON.stringify(rubro),
        1,
      ]
    );
    //console.log(dbResp);
    return res.status(200).send(dbResp);
  } catch (err) {
    console.log("Error en la conexion DB valoresUnicos, PATCH!!", err);
    res.status(500).send({ error: err });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

module.exports = router;
