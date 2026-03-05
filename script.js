// Actualizar Fecha y Hora de Colombia
function updateDateTime() {
    const now = new Date();
    const options = { timeZone: 'America/Bogota', hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' };
    document.getElementById('dateTime').innerText = now.toLocaleString('es-CO', options);
}
setInterval(updateDateTime, 1000);

// Selección de Servicio
function selectService(service) {
    document.querySelectorAll('.service-card').forEach(card => card.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('selectedService').value = service;
}

// Geolocalización
let userCoords = "No proporcionada";
function getGeo() {
    const status = document.getElementById('geoStatus');
    if (!navigator.geolocation) {
        status.innerText = "Geolocalización no soportada";
    } else {
        status.innerText = "Localizando...";
        navigator.geolocation.getCurrentPosition((position) => {
            userCoords = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
            status.innerText = "✅ Ubicación verificada";
        }, () => {
            status.innerText = "❌ Error al obtener ubicación";
        });
    }
}

// Enviar a WhatsApp
document.getElementById('orderForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const service = document.getElementById('selectedService').value;
    if(!service) return alert("Por favor selecciona un servicio del menú superior.");

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

    window.open(`https://wa.me/573053414288?text=${mensaje}`, '_blank');
});

// Editar datos (limpiar campos)
function editData() {
    if(confirm("¿Deseas limpiar los datos para editar?")) {
        document.getElementById('orderForm').reset();
        document.getElementById('geoStatus').innerText = "";
    }
}

// Control de navegación flechitas
document.querySelector('.right').onclick = () => document.getElementById('servicesContainer').scrollBy(150, 0);
document.querySelector('.left').onclick = () => document.getElementById('servicesContainer').scrollBy(-150, 0);
