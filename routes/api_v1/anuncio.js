const express = require('express');
const router = express.Router();
const Anuncio = require ('../../models/anuncio')

router.get('/', async (req, res, next) => {

  try {
    //Recogemos los valores de entrada
    const nombre = req.query.nombre;
    const precio = req.query.precio;
    const tipo = req.query.tipo;
    const tags = req.query.tags;
    const saltar = parseInt(req.query.saltar);
    const limitar = parseInt(req.query.limitar);
    const campos = req.query.campos;
    const orden = req.query.orden;


    const filtro = {};

     if (nombre) {filtro.nombre = new RegExp('^' + nombre, "i")}
     if (tags) {filtro.tags = {$in: tags.split('-')}}

      // Comprobamos y validamos el tipo 
     if (tipo) {
      if (tipo === "venta") {filtro.venta = true}
      if (tipo === "busqueda") {filtro.venta = false}
    }

      // Comprobamos y validamos el parametro de rango de precios
      if (precio) {
        let MinMax = precio.split("-")
        let min = MinMax[0];
        let max = MinMax[1];

        if (MinMax[0] === undefined || MinMax[1] === undefined) {
          res.status(409);
          res.json({ success: false, result: "Rango de precios erróneo." });
        }
        filtro.precio = { $gt :  min, $lt : max}
      }

    const anuncios = await Anuncio.dameAnuncios(filtro, saltar, limitar, campos, orden)

    const resultado = {
      success : true,
      results : anuncios
    }

    res.json(anuncios)
    return;
  } catch (err) {
      next(err);
    return;
  }

});


router.post('/nuevo', async (req, res, next) => {

  const nombre = req.body.nombre;
  const tags = req.body.tags;
  const foto = req.body.foto;
  const venta = req.body.venta;
  const precio = req.body.precio;

  if (nombre === undefined || tags === undefined || 
      foto === undefined || venta === undefined || 
      precio === undefined){
    //Validamos que nos lleguen todos los datos
    res.status(409);
    res.json({ success: false, result: "faltan algún dato." });
    return;
  }


  try {

    // ojo cuidadin para recibir fichero con MULTER
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any

        const data = req.body;
        const anuncio = new Anuncio(data);
        const anuncioGuardado = await anuncio.save();    
    
        res.json({ success: true, result: anuncioGuardado });
    
    } catch(err) {
      next(err);
      return;
    }
  });


router.get('/tags', async (req, res, next) => {
    try {

      const tags = await Anuncio.dameTags();
      res.json({ success: true, result: tags });
      
      } catch(err) {
        next(err);
        return;
      }
});

module.exports = router;
