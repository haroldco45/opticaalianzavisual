// 1. Registro del Service Worker para PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker registrado correctamente'))
            .catch(err => console.log('Error al registrar Service Worker', err));
    });
}

// 2. Actualizar Fecha y Hora de Colombia
function updateDateTime() {
    const now = new Date();
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
    const dateTimeElement = document.getElementById('dateTime');
    if (dateTimeElement) {
        dateTimeElement.innerText = now.toLocaleString('es-CO', options);
    }
}
setInterval(updateDateTime, 1000);

// 3. Selección de Servicio (Corregido el manejo de evento)
function selectService(service) {
    // Quitamos la clase active de todos
    document.querySelectorAll('.service-card').forEach(card => card.classList.remove('active'));
    
    // Añadimos active al elemento clickeado usando la lógica de delegación o el evento actual
    if (window.event) {
        window.event.target.classList.add('active');
    }

    document.getElementById('selectedService').value = service;
}

// 4. Geolocalización (Corregida la URL de Google Maps)
let userCoords = "No proporcionada";
function getGeo() {
    const status = document.getElementById('geoStatus');
    if (!navigator.geolocation) {
        status.innerText = "Geolocalización no soportada";
    } else {
        status.innerText = "📍 Localizando...";
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            // URL correcta de Google Maps
            userCoords = `https://www.google.com/maps?q=${lat},${lon}`;
            status.innerText = "✅ Ubicación verificada";
        }, () => {
            status.innerText = "❌ Error al obtener ubicación";
        });
    }
}

// 5. Enviar a WhatsApp
document.getElementById('orderForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const service = document.getElementById('selectedService').value;
    
    if(!service) {
        alert("Por favor selecciona un servicio del menú superior.");
        return;
    }

    const nombre = document.getElementById('nombre').value;
    const celular = document.getElementById('celular').value;
    const direccion = document.getElementById('direccion').value;
    const obs = document.getElementById('observaciones').value;
    const fecha = document.getElementById('dateTime').innerText;

    const mensaje = `*ÓPTICA ALIANZA VISUAL*%0A` +
                    `*Nueva Solicitud*%0A%0A` +
                    `*Servicio:* ${service}%0A` +
                    `*Cliente:* ${nombre}%0A` +
                    `*Celular:* ${celular}%0A` +
                    `*Dirección:* ${direccion}%0A` +
                    `*Ubicación:* ${userCoords}%0A` +
                    `*Observaciones:* ${obs}%0A%0A` +
                    `_Fecha/Hora:_ ${fecha}%0A` +
                    `_Enviado desde App Web PWA_`;

    // Abrir WhatsApp con el número de contacto
    window.open(`https://wa.me/573053414288?text=${mensaje}`, '_blank');
});

// 6. Editar datos (limpiar campos)
function editData() {
    if(confirm("¿Deseas limpiar los datos para editar?")) {
        document.getElementById('orderForm').reset();
        document.getElementById('geoStatus').innerText = "";
        userCoords = "No proporcionada";
        document.querySelectorAll('.service-card').forEach(card => card.classList.remove('active'));
        document.getElementById('selectedService').value = "";
    }
}

// 7. Control de navegación de servicios (flechas)
const container = document.getElementById('servicesContainer');
if (container) {
    document.querySelector('.right').onclick = () => container.scrollBy({ left: 150, behavior: 'smooth' });
    document.querySelector('.left').onclick = () => container.scrollBy({ left: -150, behavior: 'smooth' });
}
