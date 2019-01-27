const express = require('express');
const router = express.Router();
const Anuncio = require ('../../models/anuncio')
const multer  = require('multer')
const directorio = multer({ dest: '../../public/images' })


router.get('/', async (req, res, next) => {
  try {

    //Recogemos los valores de entrada
    const nombre = req.query.nombre;
    const tags = req.query.tags;
    const saltar = parseInt(req.query.saltar);
    const limitar = parseInt(req.query.limitar);
    const campos = req.query.campos;
    const orden = req.query.orden;


    const filtro = {};
     if (nombre) {filtro.nombre = nombre}
     if (tags) {filtro.tags = {$in: tags.split(',')}}

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
  const tipo = req.body.tipo;
  const precio = req.body.precio;


  if (!nombre || !tags || !foto || !tipo || !precio){
    //Validamos que nos lleguen todos los datos
    res.status(500);
    res.json({ success: false, result: "faltan datos" });
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

module.exports = router;
