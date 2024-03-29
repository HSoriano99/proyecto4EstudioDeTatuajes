# Estudio de tatuajes API REST

<details>
  <summary>Contenido 📝</summary>
  <ol>
    <li><a href="#objetivo">Objetivo</a></li>
    <li><a href="#sobre-el-proyecto">Sobre el proyecto</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#diagrama-bd">Diagrama</a></li>
    <li><a href="#instalación-en-local">Instalación</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#futuras-funcionalidades">Futuras funcionalidades</a></li>
    <li><a href="#contribuciones">Contribuciones</a></li>
    <li><a href="#licencia">Licencia</a></li>
    <li><a href="#webgrafia">Webgrafia</a></li>
    <li><a href="#desarrollo">Desarrollo</a></li>
    <li><a href="#agradecimientos">Agradecimientos</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ol>
</details>

## Objetivo

Este proyecto requería una API funcional conectada a una base de datos con al menos una relación de uno a muchos y una relación de muchos a muchos.

## Sobre el proyecto

Consiste en crear una aplicación web para un estudio de tatuajes, que nos permitirá registrarnos, ver y crear citas para tatuarnos con diferentes tatuadores y realizar diferentes consultas a la base de datos. Actualmente son funcionales los seeders de Roles y de Users asignando un rol para poder hacer peticiones basicas sin tener que registrar usuarios. Como peticiones tambien podremos registrar usuarios, bien clientes o artistas. Podremos eliminar usuarios por su identificador, consultar perfil de usuario por identificador y consultar todos los usuarios.

## Stack

Tecnologías utilizadas:

- SQL/MySQL
- EXPRESS
- DOCKER
- NODE.JS
- TYPESCRIPT
- TYPEORM

## Diagrama BD

!['imagen-db'](./EstudioTatuajesDB.png)

## Instalación en local

1. Clonar el repositorio
2. `$ npm install`
3. Conectamos nuestro repositorio con la base de datos
4. `$ Ejecutamos las migraciones`
5. `$ Ejecutamos los seeders`
6. `$ npm run dev`
7. ...

## Endpoints

<details>
<summary>Endpoints</summary>

- AUTH

- REGISTER CLIENT

          POST http://localhost:3000/api/auth/registerClient

    body:

    ```js
        {
            "username": "josefa86",
            "email": "josefa86@email.com",
            "password": "123548abc",
            "first_name": "Jose",
            "phone_number": "635873637"
        }
    ```
- REGISTER ARTIST

          POST http://localhost:3000/api/auth/registerArtist

    body:

    ```js
        {
            "username": "Tomas55",
            "email": "Tomas55@email.com",
            "password": "129876abc",
            "first_name": "Tomas",
            "phone_number": "65986843",
            "tattoo_style": "traditional"
        }
    ```

- LOGIN

          POST http://localhost:3000/api/authlogin

    body:

    ```js
        {
            "email": "david@email.com",
            "password_hash": "123456abc"
        }
    ```

- GET PROFILE (NUESTRO UNICAMENTE, DEBEREMOS ESTAR LOGEADOS)

          GET http://localhost:3000/api/:id

    - Insertamos el ID de nuestro user para visualizar los datos del perfil.

- UPDATE USER

          PATCH http://localhost:3000/api/auth/:id

    body:

    ```js
        {
            "username": "Davicin76"
        }
    ```


- APPOINTMENTS

- CREAR UN APPOINTMENT (UNICAMENTE PUEDEN LOS ARTISTAS)

          POST http://localhost:3000/api/appointments/newAppointment

      body:

    ```js
        {
            "client": "2",
            "artist": "2",
            "date": "2024-05-14",
            "shift": "afternoon"
        }
    ```

- MODIFICAR DATOS DE UN APPOINTMENT (UNICAMENTE PUEDEN LOS ARTISTAS)

           PATCH http://localhost:3000/api/appointments/update/:id

        body:

    ```js
        {
            "shift": "afternoon"
        }   

- BORRAR UN APPOINTMENT (UNICAMENTE PUEDEN LOS ARTISTAS)

           DELETE http://localhost:3000/api/appointments/delete/:id

- VISUALIZAR LAS CITAS QUE TENGA UN PROPIO CLIENTE (UNICAMENTE)

           GET http://localhost:3000/api/appointments/myClientSessions/:id

- VISUALIZAR LAS CITAS QUE TENGA UN PROPIO ARTISTA (UNICAMENTE)

           GET http://localhost:3000/api/appointments/myArtistSessions/:id


- VISUALIZAR TODOS LOS ARTISTAS

           GET http://localhost:3000/api/auth/getAllArtists

          


</details>

## Futuras funcionalidades

[ ] ...
[ ] ...
[ ] ...

## Contribuciones

Las sugerencias y aportaciones son siempre bienvenidas.

Puedes hacerlo de dos maneras:

1. Abriendo una issue
2. Crea un fork del repositorio
   - Crea una nueva rama
     ```
     $ git checkout -b feature/nombreUsuario-mejora
     ```
   - Haz un commit con tus cambios
     ```
     $ git commit -m 'feat: mejora X cosa'
     ```
   - Haz push a la rama
     ```
     $ git push origin feature/nombreUsuario-mejora
     ```
   - Abre una solicitud de Pull Request

## Licencia

Este proyecto se encuentra bajo licencia de "Hector"

## Webgrafia:

Para conseguir mi objetivo he recopilado información de:

- Documentacion propia del curso GeeksHubs junto con las sesiones grabadas.
- Documentacion propia de TypeOrm
- ...

## Desarrollo:

```js
const developer = "Hector";

console.log("Desarrollado por: " + developer);
```

## Agradecimientos:

Agradezco a mis compañeros el tiempo dedicado a este proyecto:

- **Erika**

- **Gabriel**

- **Reynaldo**

Así como a los profesores de GeeksHubs Academy por acompañarnos dia a dia en el proceso.

## Contacto

<a href = "hsoriano9986@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
