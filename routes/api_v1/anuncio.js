const express = require('express');
const router = express.Router();
const Anuncio = require ('../../models/anuncio')



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

module.exports = router;
