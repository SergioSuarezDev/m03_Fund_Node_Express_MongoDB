'use strict';

const mongoose = require('mongoose');

// Definimos esquema 
let anuncioSchema = new mongoose.Schema({
    nombre: String,
    tags: [String],
    venta: Boolean,
    precio: Number,
    foto: String,
}, {collection: 'anuncios'});


anuncioSchema.statics.dameAnuncios = (filtro, saltar, limitar, campos, orden) => {
    const query = Anuncio.find(filtro);
    query.skip(saltar);
    query.limit(limitar);
    query.select(campos);
    query.sort(orden);
    let res = query.exec();
    return res;
}

anuncioSchema.statics.dameTags = () => {
    const query = Anuncio.distinct("tags");
    let res = query.exec();
    return res;
}

const Anuncio = mongoose.model('Anuncio', anuncioSchema);


module.exports = Anuncio;