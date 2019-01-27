const express = require('express');
const router = express.Router();
const http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {

//console.log(req.query.id);

  // Llamamos al api
  http.get('http://localhost:3000/api_v1/anuncio/', (resp) => {
    let data = '';
  
    resp.on('data', (d) => {
      data += d;
    });

    resp.on('end', () => {

      //Preparo un array para mejorar los datos de salida
      let anunciosFinal = [];

      for (let anuncio of JSON.parse(data)) {
        console.log(anuncio.venta);

        if (anuncio.venta == false){
          anuncio.tipo = "Busqueda"
        } else {
          anuncio.tipo = "Venta"
        }
        let montaPrecio = anuncio.precio + "  €";
        anuncio.precio = montaPrecio.replace(".",",")
        anunciosFinal.push(anuncio);
      } 


      let datos = {
        titulo: 'Nodepop',
        anuncios: anunciosFinal
      }

      res.render('index', datos);
    });
  });

});

module.exports = router;
