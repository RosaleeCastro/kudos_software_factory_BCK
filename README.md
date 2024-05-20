#  Api RestFul
### _Fábrica de software Api Kudos

Te presento un API RESTFUL super amigable, que le permite al usuario con el rol "admin" autenticado y autorizado , hacer uso de ella para ingresar datos de nuevos usuarios. usando un archivo de entrada de extensión csv, permitiendo manejar esta información en nuestra Base de datos con la seguridad de : datos validos.
# KUDOS Software Factory

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Dependencias](#dependencias)
  - [Dependencias principales](#dependencias-principales)
  - [Dependencias de desarrollo](#dependencias-de-desarrollo)
- [Instalación](#instalación)
- [Configuración](#configuración)
  - [Variables de Entorno](#variables-de-entorno)
  - [Base de Datos](#base-de-datos)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Despliegue en Render](#despliegue-en-render)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)


 ## Requisitos 
 - [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken (jwt)](https://www.npmjs.com/package/jsonwebtoken)
- [Express-Session](https://www.npmjs.com/package/express-session)

## Dependencias

### Dependencias principales

- [bcrypt](https://www.npmjs.com/package/bcrypt): ^5.1.1
- [connect-pg-simple](https://www.npmjs.com/package/connect-pg-simple): ^9.0.1
- [cookie-parser](https://www.npmjs.com/package/cookie-parser): ^1.4.6
- [cors](https://www.npmjs.com/package/cors): ^2.8.5
- [csv-parser](https://www.npmjs.com/package/csv-parser): ^3.0.0
- [dotenv](https://www.npmjs.com/package/dotenv): ^16.4.5
- [express](https://www.npmjs.com/package/express): ^4.19.2
- [express-session](https://www.npmjs.com/package/express-session): ^1.18.0
- [jsonwebtoken (jwt)](https://www.npmjs.com/package/jsonwebtoken): ^9.0.2
- [morgan](https://www.npmjs.com/package/morgan): ^1.10.0
- [multer](https://www.npmjs.com/package/multer): ^1.4.5-lts.1
- [pg](https://www.npmjs.com/package/pg): ^8.11.5
- [umzug](https://www.npmjs.com/package/umzug): ^3.8.0
- [zod](https://www.npmjs.com/package/zod): ^3.23.8

### Dependencias de desarrollo

- [@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker): ^8.4.1
- [@types/bcrypt](https://www.npmjs.com/package/@types/bcrypt): ^5.0.2
- [@types/connect-pg-simple](https://www.npmjs.com/package/@types/connect-pg-simple): ^7.0.3
- [@types/cookie-parser](https://www.npmjs.com/package/@types/cookie-parser): ^1.4.7
- [@types/cors](https://www.npmjs.com/package/@types/cors): ^2.8.17
- [@types/dotenv](https://www.npmjs.com/package/@types/dotenv): ^8.2.0
- [@types/express](https://www.npmjs.com/package/@types/express): ^4.17.21
- [@types/express-session](https://www.npmjs.com/package/@types/express-session): ^1.17.6
- [@types/faker](https://www.npmjs.com/package/@types/faker): ^6.6.9
- [@types/jsonwebtoken](https://www.npmjs.com/package/@types/jsonwebtoken): ^9.0.6
- [@types/multer](https://www.npmjs.com/package/@types/multer): ^1.4.11
- [@types/node](https://www.npmjs.com/package/@types/node): ^20.12.12
- [@types/pg](https://www.npmjs.com/package/@types/pg): ^8.11.6
- [nodemon](https://www.npmjs.com/package/nodemon): ^3.1.0
- [ts-node](https://www.npmjs.com/package/ts-node): ^10.9.2
- [typescript](https://www.npmjs.com/package/typescript): ^5.4.5


## Instalación 
1. Clona este repositorio: 
``` git clone git@github.com:RosaleeCastro/kudos_software_factory_BCK.git
    cd kudos_software_factory_BCK
```
2. Instala dependencias 
```npm install ```

3. Configura la conexión a la base de datos en el archivo .env, se muestra un ejemplo en el archivo .env.example .

4. Ejecuta un reset de las migraciones con umzug:
```npm run db:reset```

5. Inicia el servidor 
```npm run dev ```

## Configuración
Para configurar correctamente tu entorno de desarrollo, necesitarás crear un archivo .env en la raíz del proyecto y establecer las siguientes variables de entorno.

En el archivo .env.example, proporciona una plantilla para que los usuarios puedan copiarla y configurar las variables según sus necesidades, quedando similiar al siguiente ejemplo:.
```PGHOST=localhost
PGDATABASE= 'data_base_users'
PGPORT=5432
PGUSER=[usuario]
PGPASSWORD=[password]
PGADMINDATABASE=postgres
PORT=3500
CLIENT_ORIGIN=*


const jwSecret = "mindset";

```
Es muy importante que si lo vas a desplegar de forma local le de las variables que necesita y te pide en el arhivo .env.example


## Estructura del Proyecto

La estructura del proyecto es la siguiente:
```
KUDOS_SOFTWARE_FACTORY_BCK
├── build
├── node_modules
├── src
│ ├── data
│ ├── db
│ ├── middlewares
│ ├── models
│ ├── routes
│ ├── services
│ └── index.ts
├── uploads
├── .env
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
 ```
Nuestra applicación esta construidas con una arquitectura de tres capas:
* Routers : Define las rutas y maneja los endpoints y solicitudes HTTP 
* Services : Contiene la lógica del negocio y se comunica con la capa de accesos de datos.
* Data : Acceso a Datos, gestiona la interacción con la base de datos Postgresql  utilizando pg.

## Endpoints
Generamos dos rutas que a travez de middelwears y servicios validan, autentican y autorizan al usuario con el rol de "admin"

POST/login (Iniciar Sesión )
* Descripción: Permite a un usuario existente iniciar sesión.
* Body: email, password, role - Credenciales requeridas para el inicio de sesión.
* Respuesta: Inicia sesión y devuelve un token JWT.
![Página Principal](/img/image.png)

POST/upload (Subir archivo csv)
* Autentica al usuario que tiene el role "admin" para que genere la logica del negocio.
* Atravez de un middlewear lo sube, lo transforma y lo entrega para que pase a la base de datos atravez de un servicio.

![Página Principal](/img/Captura%20de%20pantalla%202024-05-20%20174034.png)

---------------------------------------------------------------------------------------------
## Despliegue en Render 


* Nuestra Api esta desplegado  en Render 

![Página Principal](/img/Captura%20de%20pantalla%202024-05-20%20163710.png)

![Página Principal](/img/Captura%20de%20pantalla%202024-05-20%20164419.png)


https://kudos-software-factory-bck.onrender.com

[Ver el video](https://reccloud.com/es/u/z8zccnk)