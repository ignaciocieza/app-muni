const express = require("express");
const router = new express.Router();

router.post("/mariadb/transporte/registros/post", async (req, res) => {
  let conn, dbResp;

  try {
    conn = await req.app.locals.poolBromatologia.getConnection();
    const { valuesForm, vehiculos, choferes } = req.body;

    dbResp = await conn.query(
      "INSERT INTO `transportistasRegistro` VALUES(?,?,?,?)",
      [
        valuesForm.empresa,
        JSON.stringify(valuesForm),
        JSON.stringify(vehiculos),
        JSON.stringify(choferes),
      ]
    );
    //console.log(dbResp);
    //throw new Error('¡Ups!')
    return res.status(200).send(dbResp);
  } catch (err) {
    console.log("Error en la conexion DB Transportistas, POST!!", err);
    res.status(500).send({ error: err });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

router.post("/mariadb/transporte/registros/get", async (req, res) => {
  let conn, dbResp;

  try {
    conn = await req.app.locals.poolBromatologia.getConnection();
    dbResp = await conn.query("SELECT * FROM transportistasRegistro");
    //console.log(dbResp);
    return res.status(200).send(dbResp);
  } catch (err) {
    console.log("Error en la conexion DB Transporte, GET!!", err);
    res.status(500).send({ error: err });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

router.post("/mariadb/transporte/registros/delete", async (req, res) => {
  let conn, dbResp;

  // id: varchar (PRI Key)
  // valuesForm: JSON
  // data:JSON
  try {
    conn = await req.app.locals.poolBromatologia.getConnection();
    const { id } = req.body;

    dbResp = await conn.query(
      `DELETE FROM transportistasRegistro WHERE id ='${id}'`
    );
    return res.status(200).send(dbResp);
    //throw new Error('¡Ups!')
  } catch (err) {
    console.log("Error en la conexion DB Transporte, DELETE!!", err);
    res.status(500).send({ error: err });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

router.post("/mariadb/transporte/registros/patch", async (req, res) => {
  let conn, dbResp;

  try {
    conn = await req.app.locals.poolBromatologia.getConnection();
    const { valuesForm, vehiculos, choferes } = req.body;

    dbResp = await conn.query(
      "UPDATE `transportistasRegistro` SET valuesFrom=?, vehiculos=?, choferes=?  WHERE id=?",
      [
        JSON.stringify(valuesForm),
        JSON.stringify(vehiculos),
        JSON.stringify(choferes),
        valuesForm.empresa,
      ]
    );
    //console.log(dbResp);
    return res.status(200).send(dbResp);
  } catch (err) {
    console.log("Error en la conexion DB Transporte, PATCH!!", err);
    res.status(500).send({ error: err });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

router.post("/mariadb/transporte/valoresunicos/get", async (req, res) => {
  let conn, dbResp;

  try {
    conn = await req.app.locals.poolBromatologia.getConnection();
    dbResp = await conn.query("SELECT * FROM transportistasValoresUnicos");
    //console.log(dbResp);
    return res.status(200).send(dbResp);
  } catch (err) {
    console.log(
      "Error en la conexion DB transportistasValoresUnicos, GET!!",
      err
    );
    res.status(500).send({ error: err });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

router.post("/mariadb/transporte/valoresunicos/patch", async (req, res) => {
  let conn, dbResp;

  try {
    conn = await req.app.locals.poolBromatologia.getConnection();
    const { localidades, tipoAlimentosTransportar, empresas } = req.body;

    dbResp = await conn.query(
      "UPDATE `transportistasValoresUnicos` SET localidades=?, tipoAlimentosTransportar=?, empresas=?  WHERE id=?",
      [
        JSON.stringify(localidades),
        JSON.stringify(tipoAlimentosTransportar),
        JSON.stringify(empresas),
        1,
      ]
    );
    //console.log(dbResp);
    return res.status(200).send(dbResp);
  } catch (err) {
    console.log(
      "Error en la conexion DB transportistasValoresUnicos, PATCH!!",
      err
    );
    res.status(500).send({ error: err });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

module.exports = router;
