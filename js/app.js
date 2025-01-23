// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];  // Declaración única de la variable articulosCarrito

cargarEventListeners();

function cargarEventListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     listaCursos.addEventListener('click', agregarCurso);
     // eliminar del carrito los productos
     carrito.addEventListener('click', eliminarCurso);
     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

// Funciones
// Función que añade el curso al carrito
function agregarCurso(e) {
    e.preventDefault();
    // delegacion para agregar al carrito
    if(e.target.classList.contains('agregar-carrito')) {
         const cursoSeleccionado = e.target.parentElement.parentElement;
         leerDatosCurso(cursoSeleccionado);
    }
}

// eliminar curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //eliminar del arreglo articulosCarrito por el data ID
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();
    }
}

// lee el contenido del curso "la card"
function leerDatosCurso(curso){
    //crear objecto del curso
    const infoCurso = {
        id: curso.querySelector('a').getAttribute('data-id'),
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        cantidad: 1
    }
    //revisa si el curso esta duplicado o ya existe
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //actualiza la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        })
        articulosCarrito = [...cursos];
    }
    else {
        //agrega articulos al carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    carritoHTML();
}

// mostrar el carrito de compra en el HTML

function carritoHTML() {
    // Limpiamos HTML para evitar duplicados
    limpiarHTML();

    // Generador de HTML
    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td> <img src="${curso.imagen}" width="100"</td>
        <td> ${curso.titulo}</td>
        <td> ${curso.precio}</td>
        <td> ${curso.cantidad}</td>
        <td> <a hrft="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
        `;
    //agregamos el HTML del carro al tbody del html
    contenedorCarrito.appendChild(row);
    });

}

//elimina los cursos de tbody para no duplicar contenido
function limpiarHTML() {
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
    // forma lenta
    // contenedorCarrito.innerHTML = '';


    // forma rapida (recomendada)
    while(contenedorCarrito.firstChild) {
         contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}

// Referencias para el modal
const modal = document.querySelector('#modal-notificacion');
const cerrarModal = modal.querySelector('.cerrar');
const nombreArticulo = document.querySelector('#nombre-articulo');
const precioArticulo = document.querySelector('#precio-articulo');
const imagenArticulo = document.querySelector('#imagen-curso');
const listaSugerencias = document.querySelector('#sugerencias');

// Datos de los cursos (esto puede venir de una API o base de datos en un caso real)
const todosLosCursos = [
    { id: '1', titulo: 'HTML5, CSS3, JavaScript para Principiantes', imagen: 'img/curso1.jpg', precio: '$29.99' },
    { id: '2', titulo: 'Curso de Comida Vegetariana', imagen: 'img/curso2.jpg', precio: '$49.99' },
    { id: '3', titulo: 'Guitarra para Principiantes', imagen: 'img/curso3.jpg', precio: '$39.99' },
    { id: '4', titulo: 'Huerto en tu casa', imagen: 'img/curso4.jpg', precio: '$44.99' },
    { id: '5', titulo: 'Decoración con productos de tu hogar', imagen: 'img/curso5.jpg', precio: '$19.99' },
];

// Función para mostrar el modal con detalles del curso y sugerencias
function mostrarNotificacion(curso) {
    // Mostrar los datos del curso
    nombreArticulo.textContent = `Nombre: ${curso.titulo}`;
    precioArticulo.textContent = `Precio: ${curso.precio}`;
    imagenArticulo.src = curso.imagen;

    // Genera sugerencias dinámicas basadas en el curso actual
    generarSugerencias(curso);

    // Muestra el modal
    modal.style.display = 'block';
}

// Cierra el modal
cerrarModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Cierra el modal al hacer clic fuera de él
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Genera sugerencias dinámicas
function generarSugerencias(cursoActual) {
    listaSugerencias.innerHTML = ''; // Limpiar sugerencias previas

    // Filtra cursos que no sean el curso actual
    let sugerencias = todosLosCursos.filter(curso => curso.id !== cursoActual.id);

    // Si no hay suficientes sugerencias, toma un subconjunto aleatorio
    if (sugerencias.length > 3) {
        sugerencias = sugerencias.slice(0, 3); // Toma solo las primeras 3 sugerencias
    }

    // Renderiza las sugerencias
    sugerencias.forEach(sugerencia => {
        const div = document.createElement('div');
        div.classList.add('sugerencia');
        div.innerHTML = `
            <img src="${sugerencia.imagen}" alt="${sugerencia.titulo}" width="100">
            <h4>${sugerencia.titulo}</h4>
            <p>${sugerencia.precio}</p>
            <button data-id="${sugerencia.id}" class="agregar-sugerencia">Agregar al carrito</button>
        `;
        listaSugerencias.appendChild(div);
    });
}

// Actualiza la función agregarCurso para incluir la notificación
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;

        // Leer datos del curso
        const cursoInfo = {
            id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
            imagen: cursoSeleccionado.querySelector('img').src,
            titulo: cursoSeleccionado.querySelector('h4').textContent,
            precio: cursoSeleccionado.querySelector('.precio span').textContent,
        };

        leerDatosCurso(cursoSeleccionado);

        // Mostrar notificación con detalles del curso
        mostrarNotificacion(cursoInfo);
    }
}

// Función para agregar sugerencias al carrito (cuando se hace clic en el botón "Agregar al carrito")
document.querySelector('#sugerencias').addEventListener('click', function(e) {
    if (e.target.classList.contains('agregar-sugerencia')) {
        const sugerenciaId = e.target.getAttribute('data-id');
        const sugerencia = todosLosCursos.find(item => item.id === sugerenciaId);

        if (sugerencia) {
            // Aquí puedes manejar la lógica de agregar el artículo sugerido al carrito
            agregarAlCarrito(sugerencia);  // Llama la función agregar al carrito
        }
    }
});

// Función para agregar un curso al carrito
function agregarAlCarrito(curso) {
    // Revisa si el curso ya existe en el carrito
    const existe = articulosCarrito.some(item => item.id === curso.id);
    if (existe) {
        // Si ya está en el carrito, solo incrementa la cantidad
        const cursos = articulosCarrito.map(item => {
            if (item.id === curso.id) {
                item.cantidad++;
                return item;
            }
            return item;
        });
        articulosCarrito = [...cursos];
    } else {
        // Si no está en el carrito, lo agrega
        curso.cantidad = 1;
        articulosCarrito = [...articulosCarrito, curso];
    }
    
    console.log('Curso agregado al carrito: ', curso);
    carritoHTML();  // Actualiza el carrito en el DOM
}

// Función que muestra el carrito en el HTML
function carritoHTML() {
    limpiarHTML();

    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td> <img src="${curso.imagen}" width="100" alt="Imagen del curso"></td>
        <td> ${curso.titulo}</td>
        <td> ${curso.precio}</td>
        <td> ${curso.cantidad}</td>
        <td> <a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
        `;
        contenedorCarrito.appendChild(row);
    });
}