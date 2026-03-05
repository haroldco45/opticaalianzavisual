// Reloj Colombia
setInterval(() => {
    const options = { timeZone: 'America/Bogota', hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' };
    document.getElementById('dateTime').innerText = new Date().toLocaleString('es-CO', options);
}, 1000);

// Selección de Servicio
function selectService(service) {
    document.querySelectorAll('.service-card').forEach(c => c.classList.remove('active'));
    event.currentTarget.classList.add('active');
    document.getElementById('selectedService').value = service;
}

// Ubicación
let coords = "No proporcionada";
function getGeo() {
    const status = document.getElementById('geoStatus');
    status.innerText = "Localizando...";
    navigator.geolocation.getCurrentPosition(
        p => {
            coords = `https://www.google.com/maps?q=${p.coords.latitude},${p.coords.longitude}`;
            status.innerText = "✅ Ubicación lista";
        },
        () => status.innerText = "❌ Error al ubicar"
    );
}

// Enviar WhatsApp
document.getElementById('orderForm').onsubmit = e => {
    e.preventDefault();
    const service = document.getElementById('selectedService').value;
    if(!service) return alert("Selecciona un servicio");

    const msg = `*ÓPTICA ALIANZA VISUAL*%0A` +
                `*Servicio:* ${service}%0A` +
                `*Nombre:* ${document.getElementById('nombre').value}%0A` +
                `*Ubicación:* ${coords}`;
    window.open(`https://wa.me/573053414288?text=${msg}`, '_blank');
};

// Flechas
document.querySelector('.right').onclick = () => document.getElementById('servicesContainer').scrollBy(120, 0);
document.querySelector('.left').onclick = () => document.getElementById('servicesContainer').scrollBy(-120, 0);
