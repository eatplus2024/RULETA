let isAvailable = true;

// Función para cambiar el estado del taxista (disponible o no disponible)
function toggleStatus() {
    isAvailable = !isAvailable;
    const statusButton = document.getElementById('taxiStatusButton');
    if (isAvailable) {
        statusButton.innerText = 'Disponible';
        statusButton.style.backgroundColor = 'green';
        // Aquí deberías enviar al backend que el taxista está disponible
    } else {
        statusButton.innerText = 'No Disponible';
        statusButton.style.backgroundColor = 'red';
        // Aquí deberías enviar al backend que el taxista no está disponible
    }
}

// Simulación de pedidos de taxis (esto será gestionado por el backend)
const orders = [
    { destination: "Parque Nacua", orderCode: "ABC123", arrivalTime: "5 minutos" },
    { destination: "Calle 33", orderCode: "XYZ987", arrivalTime: "7 minutos" }
];

// Función para recibir pedidos (esto sería mediante WebSockets o Firebase en producción)
function loadOrders() {
    const ordersList = document.getElementById('ordersList');
    ordersList.innerHTML = ''; // Limpiar lista
    orders.forEach(order => {
        const listItem = document.createElement('li');
        listItem.innerText = `Destino: ${order.destination} | Código: ${order.orderCode}`;
        listItem.onclick = () => acceptOrder(order);
        ordersList.appendChild(listItem);
    });
}

// Función para aceptar un pedido
function acceptOrder(order) {
    document.getElementById('destination').innerText = order.destination;
    document.getElementById('orderCode').innerText = order.orderCode;
    document.getElementById('arrivalTime').innerText = order.arrivalTime;

    // Aquí deberías notificar al backend que el taxista ha aceptado el pedido
}

// Simular la carga de pedidos después de un tiempo (en producción sería mediante WebSockets o Firebase)
setTimeout(loadOrders, 2000);
