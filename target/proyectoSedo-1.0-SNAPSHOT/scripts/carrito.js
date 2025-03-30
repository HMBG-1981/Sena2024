/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */


// Variable que controla la visibilidad del carrito
var carritoVisible = false;

// Comprobar si el DOM está completamente cargado antes de ejecutar el código
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// Función que se ejecuta cuando el DOM está listo
function ready() {
    // Agrega eventos de clic a los botones de eliminación de elementos en el carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (var i = 0; i < botonesEliminarItem.length; i++) {
        var button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    // Agrega eventos de clic a los botones para incrementar la cantidad de un producto en el carrito
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (var i = 0; i < botonesSumarCantidad.length; i++) {
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    // Agrega eventos de clic a los botones para disminuir la cantidad de un producto en el carrito
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (var i = 0; i < botonesRestarCantidad.length; i++) {
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    // Agrega eventos de clic a los botones para añadir productos al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (var i = 0; i < botonesAgregarAlCarrito.length; i++) {
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    // Agrega evento de clic al botón de pagar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);

    // Agregar un event listener para actualizar el total del carrito cuando se cambia la cantidad de productos
    document.querySelector('.carrito-items').addEventListener('input', actualizarTotalCarrito);

    // Calcula el total inicial del carrito
    actualizarTotalCarrito();
}

// Función para manejar la acción de agregar un producto al carrito cuando se hace clic en el botón
function agregarAlCarritoClicked(event) {
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;

    agregarItemCarrito(titulo, precio, imagenSrc);
}

// Función que agrega un producto al carrito
function agregarItemCarrito(titulo, precio, imagenSrc) {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    var nombresItems = carritoItems.getElementsByClassName('carrito-item-titulo');

    // Evita que el mismo producto se agregue varias veces
    for (var i = 0; i < nombresItems.length; i++) {
        if (nombresItems[i].innerText === titulo) {
            alert('Este producto ya está en el carrito');
            return;
        }
    }

    // Crea un nuevo elemento para el carrito
    var carritoItem = document.createElement('div');
    carritoItem.classList.add('carrito-item');

    // Agrega el nombre del producto al nuevo elemento del carrito
    var carritoItemsNombre = document.createElement('span');
    carritoItemsNombre.classList.add('carrito-item-titulo');
    carritoItemsNombre.innerText = titulo;
    carritoItem.appendChild(carritoItemsNombre);

    // Agrega el precio del producto al nuevo elemento del carrito
    var carritoItemsPrecio = document.createElement('span');
    carritoItemsPrecio.classList.add('carrito-item-precio');
    carritoItemsPrecio.innerText = precio;
    carritoItem.appendChild(carritoItemsPrecio);

    // Agrega la imagen del producto al nuevo elemento del carrito
    var carritoItemsImagen = document.createElement('img');
    carritoItemsImagen.classList.add('carrito-item-img');
    carritoItemsImagen.src = imagenSrc;
    carritoItem.appendChild(carritoItemsImagen);

    // Agrega los controles para seleccionar la cantidad del producto
    var carritoItemCantidad = document.createElement('div');
    carritoItemCantidad.classList.add('selector-cantidad');
    carritoItemCantidad.innerHTML =
            '<i class="fas fa-minus restar-cantidad"></i>' +
            '<input type="number" value="1" class="carrito-item-cantidad">' +
            '<i class="fas fa-plus sumar-cantidad"></i>';
    carritoItem.appendChild(carritoItemCantidad);

    // Agrega el botón de eliminación para el producto
    var botonEliminar = document.createElement('span');
    botonEliminar.classList.add('btn-eliminar');
    botonEliminar.innerHTML = '<i class="fas fa-trash"></i>';
    carritoItem.appendChild(botonEliminar);

    // Añade el nuevo elemento al contenedor de items del carrito
    carritoItems.appendChild(carritoItem);

    // Asigna el evento de eliminación al botón recién agregado
    botonEliminar.addEventListener('click', eliminarItemCarrito);

    // Muestra el carrito si tiene productos
    document.getElementsByClassName('carrito')[0].style.display = 'block';

    actualizarTotalCarrito();
}

// Función que elimina un elemento del carrito
function eliminarItemCarrito(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    actualizarTotalCarrito();
}

// Calcula y actualiza el total del carrito
function actualizarTotalCarrito() {
    var carritoItemContainer = document.getElementsByClassName('carrito-items')[0];
    var carritoItems = carritoItemContainer.getElementsByClassName('carrito-item');
    var total = 0;

    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        var cantidadElemento = item.getElementsByClassName('carrito-item-cantidad')[0];
        var precio = parseFloat(precioElemento.innerText.replace('$', ''));
        var cantidad = cantidadElemento.value;
        total += precio * cantidad;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('carrito-total')[0].getElementsByClassName('total')[0].innerText = '$' + total;

    // Oculta el carrito si está vacío
    if (carritoItemContainer.children.length === 0) {
        document.getElementsByClassName('carrito')[0].style.display = 'none';
    }
}

// Incrementa la cantidad de un producto en el carrito
function sumarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = parseInt(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}

// Decrementa la cantidad de un producto en el carrito
function restarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = parseInt(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    cantidadActual--;
    if (cantidadActual >= 1) {
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    }
    actualizarTotalCarrito();
}

// Función para procesar el pago, vacía el carrito y muestra un mensaje
function pagarClicked() {
    alert('Su Pedido fue Enviado con Exito, Gracias por su Compra!');
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()) {
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
}
