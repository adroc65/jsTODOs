
import './styles.css';

/* El archivo de donde se importan las clases es el INDEX.JS de la 
Carpeta CLASSES, por tanto no es necesario de indicar el nombre ya que
este es el DEFAULT */
import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';

// import{ Todo } from './classes/todo.class.js';
// import { TodoList } from './classes/todo-list.class';

// --------------
// Creamos la instancia del TODO LIST.
export const todoList = new TodoList();
// Inicialmente pueden tenerse tareas ya almacenadas en disco Local, por esta
// razon se procede a mostrar lo que se tiene en disco, haciendo uso del metodo
// que se tiene en "componentes.js", llamado "crearTodoHtml".
todoList.todos.forEach( todo => crearTodoHtml( todo ) );

// Nota: ------------------------------------
// ESA LLAMADA DE ARRIBA SE PUEDE RESUMIR:
// todoList.todos.forEach( crearTodoHtml );
// ------------------------------------------
// Solo si es un argumento el que se pase.
