# Nodepop

Para inicializar el proyecto:

```shell
npm install
```

Verificar la cadena de conexión a la base de datos en lib/mongoose.js

Se puede utilizar el script de inicialización de la base de datos con:

```shell
npm run install_db
```

## Arranque

Para arrancar el proyecto usar:

* En producción:

```shell
npm start
```

* En desarrollo:

```shell
npm run dev
```

## Rutas del API

* http://localhost:3000/api_v1/anuncio

Retorna una lista de anuncios

## Otra información

### Para arrancar un servidor de mongodb desde consola:

```shel
./bin/mongod --dbpath ./data/db --directoryperdb
```