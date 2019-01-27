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

* **http://localhost:3000/api_v1/anuncio** (GET, Retorna una lista de anuncios) 

Parámetros: 

`tipo=busqueda / tipo=venta (Busca por tipo)
`

`nombre=nombre (Busca por nombre, case sensitive)
`

`order=campo (Ordena por el campo indicado)
`

`rangoprecio=12,40 (Rango de precio minimo,maximo)
`


* **http://localhost:3000/api_v1/anuncio/tags**
(GET, Retorna una lista de todos los tags disponibles)


* **http://localhost:3000/api_v1/anuncio/tags**
(POST, Crea un anuncio)

Ejemplo: 

`{
	"nombre": "test",
	"tags": ["mobile", "work"],
	"foto": "test.jpg",
	"venta": false,
	"precio": 12.34
}
`


## Otra información

### Para arrancar un servidor de mongodb desde consola:

```shel
./bin/mongod --dbpath ./data/db --directoryperdb
```