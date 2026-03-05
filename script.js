// 1. Reloj en tiempo real (Colombia)
setInterval(() => {
    const options = { 
        timeZone: 'America/Bogota', 
        hour12: true, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    };
    const now = new Date().toLocaleString('es-CO', options);
    document.getElementById('dateTime').innerText = now;
}, 1000);

// 2. Selección de Servicios
function selectService(service) {
    // Quitar clase activa de todos los servicios
    document.querySelectorAll('.service-card').forEach(card => card.classList.remove('active'));
    
    // Agregar clase activa al seleccionado
    event.currentTarget.classList.add('active');
    
    // Guardar el valor en el input oculto
    document.getElementById('selectedService').value = service;
}

// 3. Geolocalización (Captura de coordenadas)
let userCoords = "No proporcionada";

function getGeo() {
    const status = document.getElementById('geoStatus');
    status.innerText = "📍 Localizando...";
    
    if (!navigator.geolocation) {
        status.innerText = "❌ GPS no soportado";
    } else {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                // Crear link de Google Maps
                userCoords = `https://www.google.com/maps?q=${lat},${lon}`;
                status.innerText = "✅ Ubicación verificada";
            },
            () => {
                status.innerText = "❌ Error al obtener ubicación";
            }
        );
    }
}

// 4. Envío a WhatsApp con mensaje completo
document.getElementById('orderForm').onsubmit = function(e) {
    e.preventDefault();

    const servicio = document.getElementById('selectedService').value;
    const nombre = document.getElementById('nombre').value;
    const celular = document.getElementById('celular').value;
    const direccion = document.getElementById('direccion').value;
    const obs = document.getElementById('observaciones').value || "Ninguna";
    const fecha = document.getElementById('dateTime').innerText;

    if (!servicio) {
        alert("Por favor, selecciona primero un servicio del menú superior.");
        return;
    }

    // Estructura del mensaje para WhatsApp
    const mensaje = 
        `*ÓPTICA ALIANZA VISUAL*%0A` +
        `*NUEVA SOLICITUD DE SERVICIO*%0A%0A` +
        `👓 *Servicio:* ${servicio}%0A` +
        `👤 *Cliente:* ${nombre}%0A` +
        `📱 *Celular:* ${celular}%0A` +
        `🏠 *Dirección:* ${direccion}%0A` +
        `📍 *Ubicación:* ${userCoords}%0A` +
        `📝 *Observaciones:* ${obs}%0A%0A` +
        `🕒 *Fecha/Hora:* ${fecha}%0A%0A` +
        `_Enviado desde la App Web_`;

    // Número de WhatsApp de contacto
    const telContacto = "573053414288";
    
    // Abrir ventana de WhatsApp
    window.open(`https://wa.me/${telContacto}?text=${mensaje}`, '_blank');
};

// 5. Botón Editar Datos (Limpiar formulario)
function editData() {
    if (confirm("¿Deseas borrar los datos actuales para empezar de nuevo?")) {
        document.getElementById('orderForm').reset();
        document.getElementById('geoStatus').innerText = "";
        document.querySelectorAll('.service-card').forEach(card => card.classList.remove('active'));
        document.getElementById('selectedService').value = "";
        userCoords = "No proporcionada";
    }
}

// 6. Navegación del Carrusel
document.getElementById('nextBtn').onclick = () => {
    document.getElementById('servicesContainer').scrollBy({ left: 150, behavior: 'smooth' });
};

document.getElementById('prevBtn').onclick = () => {
    document.getElementById('servicesContainer').scrollBy({ left: -150, behavior: 'smooth' });
};
