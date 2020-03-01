import { Todo } from "./todo.class"; // Para el metodo estatico del Todo.

// En esta clase se lleva el control del estado de los TODO

export class TodoList {

    constructor() {
    // Se crea un nuevo arreglo de tareas, si ya existe se carga.
    // del disco local.
        this.cargarLocalStorage();
    }

    // Procederemos a crear los metodos de la clase.
    /* El primero puede ser ser crear Nuevos TODO, recibe un TODO
     al ser invocado este metodo y lo guarda en el arreglo */
    nuevoTodo( todo ) {
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    // Eliminamos TODO, resiviendo el ID del que se desea borrar.
    eliminarTodo( id ) {
        // Se hace uso del FILTER de arreglos para esta tarea.
        this.todos = this.todos.filter( todo => todo.id != id );
        this.guardarLocalStorage();

    }

    // Cambiar estado de TODO
    marcarCompletado( id ) {
        for (const todo of this.todos) {           
            if ( todo.id == id ){ // Es el id del todo del arreglo igual al id recibido ?

                todo.completado = !todo.completado; // Toogle de completado.
                this.guardarLocalStorage();
                break;
            }
        }
    }

    // Eliminar los completados.
    eliminarCompletados() {
         // Se hace uso del FILTER de arreglos para esta tarea.
         // Se pregunta por todos los TODO que no esten completados.
         this.todos = this.todos.filter( todo => !todo.completado );
         this.guardarLocalStorage();

    }

    // Almacenar en el disco del Browser.
    guardarLocalStorage(){

        localStorage.setItem( 'todo', JSON.stringify(this.todos) );


    }

    // Recuperar datos del disco Local.
    cargarLocalStorage(){
    // Lo primero es preguntar si el arreglo existe.
    // Si no existe se inicializa el arreglo. 
    // -----------------------------------------
    // if ( localStorage.getItem('todo')){
    //     this.todos =  JSON.parse( localStorage.getItem('todo') );
    //     console.log(this.todos);
    // }else {
    //     this.todos = [];
    // }  

        this.todos = (localStorage.getItem('todo'))
                    ? JSON.parse( localStorage.getItem('todo') )
                    : [];

        // Se procede a cambiar el Objeto a una instancia de Todo.
        // Se usa el metodo "map" ver mas info sobre este.
        // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/map
        
        // Todo con 'T' mayuscula por ser Statico
        this.todos = this.todos.map( obj => Todo.fromJson( obj )); 

        // Se puede resumir la funcion:
        // this.todos = this.todos.map( Todo.fromJson ); 

    }

}