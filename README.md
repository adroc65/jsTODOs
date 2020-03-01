# Administrador de tareas por hacer

Este es el proyecto inicial para crear aplicaciones utilizando webpack, es el esqueleto de  estas.
Se tiene un archivo para ejecutar en produccion, se ejecuta con:

`npm run build`

Y otro para desarrollo, se ejecuta con :

`npm run build:dev`

### Notas:
En produccion se Ofusca el codigo y se le ponen HASH a los nombres de los archivos, para evitar que los navegadores lo almacenen en la cache.
En general permite la compativilidad con navegadores mas viejos, ademas que cada vez que se compila borra la carpeta de **"/DIST"**

Recordar que para construir la carpeta de __Modulos__ se hace con:
```
npm install
```
