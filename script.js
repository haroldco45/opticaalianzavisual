// Reloj Tiempo Real
setInterval(() => {
    const options = { timeZone: 'America/Bogota', hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' };
    const dateStr = new Date().toLocaleString('es-CO', options);
    document.getElementById('dateTime').innerText = dateStr;
}, 1000);

// Selección de Servicios
function selectService(service) {
    document.querySelectorAll('.service-card').forEach(card => card.classList.remove('active'));
    event.currentTarget.classList.add('active');
    document.getElementById('selectedService').value = service;
}

// Geolocalización
let coords = "No verificada";
function getGeo() {
    const status = document.getElementById('geoStatus');
    status.innerText = "Localizando...";
    navigator.geolocation.getCurrentPosition(
        (p) => {
            coords = `https://www.google.com/maps?q=${p.coords.latitude},${p.coords.longitude}`;
            status.innerText = "✅ Ubicación obtenication";
        },
        () => { status.innerText = "❌ Error al ubicar"; }
    );
}

// WhatsApp
document.getElementById('orderForm').onsubmit = function(e) {
    e.preventDefault();
    const service = document.getElementById('selectedService').value;
    if(!service) return alert("Por favor selecciona un servicio.");

    const nombre = document.getElementById('nombre').value;
    const msg = `*ÓPTICA ALIANZA VISUAL*%0A` +
                `*Servicio:* ${service}%0A` +
                `*Cliente:* ${nombre}%0A` +
                `*Ubicación:* ${coords}`;
    
    window.open(`https://wa.me/573053414288?text=${msg}`, '_blank');
};

// Navegación Carrusel
document.getElementById('nextBtn').onclick = () => document.getElementById('servicesContainer').scrollBy(150, 0);
document.getElementById('prevBtn').onclick = () => document.getElementById('servicesContainer').scrollBy(-150, 0);
