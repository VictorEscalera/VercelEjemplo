// IMPORTANTE: Una vez que despliegues tu API en Vercel, cambia esta URL por la tuya.
// Ejemplo: 'https://mi-api-flask.vercel.app/productos'
const API_URL = 'https://vercel-back-zeta.vercel.app/productos'; 

const form = document.getElementById('formProducto');
const lista = document.getElementById('listaProductos');

// 1. Función para obtener los productos (Método GET)
async function cargarProductos() {
    try {
        const respuesta = await fetch(API_URL);
        const productos = await respuesta.json();
        
        lista.innerHTML = ''; // Limpiar la lista antes de actualizar
        
        productos.forEach(producto => {
            const li = document.createElement('li');
            // Asumimos que tus documentos en Mongo tienen campos 'nombre' y 'precio'
            // Si tienen otros nombres de campo, ajustalos aquí.
            const nombre = producto.nombre || 'Sin nombre';
            const precio = producto.precio || 0;
            
            li.innerHTML = `<span>${nombre}</span> <strong>$${precio}</strong>`;
            lista.appendChild(li);
        });
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}

// 2. Función para enviar un producto (Método POST)
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    
    const nuevoProducto = {
        nombre: document.getElementById('nombre').value,
        precio: parseFloat(document.getElementById('precio').value)
    };

    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoProducto)
        });

        if (respuesta.ok) {
            form.reset(); // Limpiar el formulario
            cargarProductos(); // Volver a pedir la lista actualizada a la API
        }
    } catch (error) {
        console.error("Error al guardar el producto:", error);
    }
});

// Cargar los productos automáticamente al abrir la página
cargarProductos();
