// Este archivo es el que crea las tareas del TODO.

export class Todo {

    /* Se creara un metodo estatico para poder convertir los OBJETOS del JSON que
    se recuperan del disco local, para volverlos a convertir en instancias de la 
    de la clase Todo */
    static fromJson ({ id, tarea, completado, creado }){

        const tempTodo = new Todo( tarea );

        tempTodo.id         = id;
        tempTodo.completado = completado;
        tempTodo.creado     = creado;

        return tempTodo; // Ojo se retorna la clase.
    }
    constructor( tarea ) {

        this.tarea = tarea;

        this.id         = new Date().getTime(); // Esto me da un id unico.
        this.completado = false;
        this.creado     = new Date();
    }
}

