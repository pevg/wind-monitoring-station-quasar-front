import { ref } from 'vue';
import { io } from 'socket.io-client';

class WebSocketService{

    constructor(url){
        this.isConnected = ref(false);
        this.socketURL  = url;
        this.socket     = io(this.socketURL);
        // Escuchar evento de conexión exitosa
        this.socket.on('connect', () => {
            this.isConnected.value = true;
            console.log('Conexión WebSocket establecida');
        });
        // Escuchar evento de desconexión
        this.socket.on('disconnect', () => {
            this.isConnected.value = false;
            console.log('Conexión WebSocket desconectada');
        });
        // Escuchar eventos personalizados desde el servidor
        this.socket.on('mensaje', (data) => {
            console.log('Mensaje recibido:', data);
        });
    }
    // Método para enviar un mensaje al servidor a través del WebSocket
    enviarMensaje(msg) {
        this.socket.emit('message', msg);
    };
    // Método para cerrar la conexión del WebSocket
    cerrarConexion() {
        this.socket.close();
    }

}

export default WebSocketService;