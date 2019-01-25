'use strict';

const mongoose = require('mongoose');

// Definimos esquema 
let anuncioSchema = new mongoose.Schema({
    nombre: String,
    tipo: Boolean,
    precio: Number,
    foto: String,
    tags: [String],
}, {collection: 'anuncios'});


anuncioSchema.statics.dameAnuncios = (filtro, saltar, limitar, campos, orden) => {
    const query = Anuncio.find(filtro);
    query.skip(saltar);
    query.limit(limitar);
    query.select(campos);
    query.sort(orden);
    return query.exec();
}

const Anuncio = mongoose.model('Anuncio', anuncioSchema);
module.exports = Anuncio;