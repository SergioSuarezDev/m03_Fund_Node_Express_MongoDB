'use strict';

/** 
 * Datos iniciales de la BBDD
*/

const readline = require('readline');
const db = require ('./../lib/mongoose.js');
const Anuncio = require('../models/anuncio');
const anunciosData = require('../data/anuncios.json');

db.once( 'open', async () =>{
    try {
        // Preguntar al usuario si quiere borrar la BD
        const response = await askUser('¿Seguro que quieres borrar la BD? (no) ');
        if (response.toLowercase() !== 'si') {
            console.log('Abortado');
            process.exit(0);
        }
            await initModel(Anuncio, anunciosData, 'anuncios');
        
        db.close;

    } catch (error) {
        console.log("Hubo un error:", error);
        process.exit(1);
    }
})

function askUser(question) {
    return new Promise((resolve, reject) => {
        const intf = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        intf.question(question, answer => {
            intf.close();
            resolve(answer);
            return;
        })
    });
}

async function initModel(Model, data, modelName) {
    const deleted  = await Model.deleteMany();
    console.log(`Eliminados: ${deleted.n}  ${modelName}`);
    const insertados = await Model.insertMany(data);
    console.log(`Insertados: ${insertados.lenght}  ${modelName}`);
}