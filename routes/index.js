const express = require('express');
const router = express.Router();
const http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {

  let params = {} 
  if (req.query.nombre) params.nombre = req.query.nombre;
  if (req.query.orden) params.orden = req.query.orden;
  if (req.query.tipo) params.tipo = req.query.tipo;


  // busqueda.orden = req.query.nombre;
  // busqueda.nombre = req.query.nombre;


  // Cogemos todos los parametros recibidos y montamos la QueryString
  let URLSearch = '', v = 0;

  for(let [i, valor] of Object.entries(params)) {
    if (v == 0)  {
      URLSearch += i + "=" + valor;
    } else {
      URLSearch += "&" + i + "=" + valor;
    }
    v++;
  }

  // Llamamos al api
  http.get('http://localhost:3000/api_v1/anuncio/?' + URLSearch, (resp) => {
    let data = '';
  
    resp.on('data', (d) => {
      data += d;
    });

    resp.on('end', () => {

      //Preparo un array para mejorar los datos de salida
      let anunciosFinal = [];

      for (let anuncio of JSON.parse(data)) {

        if (anuncio.venta == false){
          anuncio.tipo = "Busqueda"
        } else {
          anuncio.tipo = "Venta"
        }
        let montaPrecio = anuncio.precio + "  €";
        anuncio.precio = montaPrecio.replace(".",",")
        anunciosFinal.push(anuncio);
      } 


 

      // Llamamos al api para sacar los tags
      http.get('http://localhost:3000/api_v1/anuncio/tags', (resp) => {
        let tags = '';
    
        resp.on('data', (d) => {
          tags += d;
        });

        resp.on('end', () => {

          let datos = {
            titulo: 'Nodepop',
            anuncios: anunciosFinal,
            tags: JSON.parse(tags)
          }

          res.render('index', datos);

        });
      });

     

    });
  });


  

});

module.exports = router;
