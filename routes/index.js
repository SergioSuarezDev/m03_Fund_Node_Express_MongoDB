const express = require('express');
const router = express.Router();
const http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {

//console.log(req.query.id);

  // Llamamos al api
  http.get('http://localhost:3000/api_v1/anuncio/?orden=precio', (resp) => {
    let data = '';
  
    resp.on('data', (d) => {
      data += d;
    });

    resp.on('end', () => {
      let datos = {
        titulo: 'Nodepop',
        anuncios: JSON.parse(data)
      }

      res.render('index', datos);
    });

});

});

module.exports = router;
