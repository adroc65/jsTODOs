/*El este archivo "./src/js/componentes.js" se crean los métodos para comunicarnos 
con el HTML, se deben de crear las "list" <li>, de hecho se copia el <li> del HTML,
para usarlo como referencia */

// Importar el "Todo"
import { Todo } from '../classes';
import { todoList } from '../index';

// Referencias en el HTML. Verlos en el "index.html"
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const clrCompleted  = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters'); // Para leer las otras opciones.
const anchorFiltros = document.querySelectorAll('.filtro'); // Resaltar Boton.
const contPend      = document.querySelector('strong'); // selecciono etiqueta

export const crearTodoHtml = ( todo ) => {
    const htmlTodo = `
        <li class="${ (todo.completado)? 'completed':'' }" data-id="${ todo.id }">
            <div class="view">
                <input class="toggle" type="checkbox" ${ (todo.completado)? 'checked':'' }>
                <label>${ todo.tarea }</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`;
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );// Esto para no insertar un <div> por cada elemento
    ajustarContador();
    return div.firstElementChild ; // Regresamos el elemento HTML en otro lugar se inserta.
}

// Eventos
txtInput.addEventListener('keyup', (event) => {
    // El ENTER es un 13, y que el String no sea vacio.
    if ( event.keyCode === 13 && txtInput.value.length > 0 ) { 
        const nuevoTodo = new Todo( txtInput.value );   // Se guarda lo escrito a variable.
        todoList.nuevoTodo( nuevoTodo );                // Se guarda en el arreglo de Todo.
        crearTodoHtml( nuevoTodo );                     // Se imprime en el HTML.
        txtInput.value = '';                            // Se limpia la entrada.
        //ajustarContador();
    }

});

// Un TODO completado o borrado.
divTodoList.addEventListener('click', (event) => {
    // Se detecta a que se le hace click desde el Mouse, input, label o button.
    const nombreEvento = event.target.localName;
    // Se debe de salvar el elemento <li>, para poder manipularlo.
    const todoElemento = event.target.parentElement.parentElement;
    // Sacar el ID del elemento seleccionado.
    const todoId = todoElemento.getAttribute('data-id');

    // console.log(todoId);
    // console.log(todoCompletado);
    // console.log(todoElemento);
    
    if ( nombreEvento.includes('input') ){ // click en el check.
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');
    } else if ( nombreEvento.includes('button') ){ // click en el boton de borrar.
        todoList.eliminarTodo( todoId );          // Se elimina del arreglo.
        divTodoList.removeChild( todoElemento );  // Se elimina del HTML.
    }
    ajustarContador();
});

// Borrar todos los completados.
clrCompleted.addEventListener('click', () => { // Se identifica el Boton y se espera por el click.S

    todoList.eliminarCompletados(); // Borra las entradas del arreglo.

    // Se procede a eliminar del HTML, se barre de abajo hacia arriba.
    for(let index = divTodoList.children.length - 1; index >= 0; index--) {
        const element = divTodoList.children[index];
        //console.log(element);
        // Pregunto en el HTML si el <li> tiene la clase "completed"
        if( element.classList.contains('completed')){
            divTodoList.removeChild(element);
        }        
    }
});

// Las otras Opciones existentes, son acciones de Ver Todo, Pendientes y completados.
ulFiltros.addEventListener('click', ( event ) => {

    const filtro = event.target.text;
    if( !filtro ){ return; }
    // console.log(filtro);

    // Se le dara resalte al boton presionado.
    // Primero se borra de todos la clase "select"
    anchorFiltros.forEach( elem => elem.classList.remove('selected'));
    // Agregamos la clase "selected" solo al deseado.
    event.target.classList.add('selected');

    // Se obtienen todas las entradas del Todo.
    for( const elemento of divTodoList.children ){ 

        elemento.classList.remove('hidden'); // Por si estaba oculta.
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if( completado ){
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden');
                }
                break;
        
            default:
                break;
        }
        
    }

});

const ajustarContador = () => {
    let contador = 0;
    //contPend.innerText = divTodoList.children.length;
    for( const elemento of divTodoList.children ){ 
        const completado = elemento.classList.contains('completed');
        if( !completado ){
            contador = contador + 1;
        }
    }
    contPend.innerText = contador;   
}