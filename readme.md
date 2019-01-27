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

`precio=12,40 (Rango de precio minimo,maximo)
`

`precio=0,40 (Rango de precio  desde 0 a 40)
`

`precio=5,0 (Rango de precio desde 5 sin limite final)
`

`precio=50 (Precio = 50)
`

`saltar=5 (Salta los 5 primeros)
`

`limitar=5 (Limita el resultado a los 5 últimos)
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