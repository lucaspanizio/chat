import { Server as SocketIO } from 'socket.io';
import { Server } from 'http';

export function startSocket(server: Server) {
  const io = new SocketIO(server);

  io.on('connection', (socket) => {
    console.log('Socket conectado:', socket.id);

    socket.on('message', (data) => {
      console.log('Mensagem recebida:', data);
    });

    socket.on('disconnect', () => {
      console.log('Socket desconectado:', socket.id);
    });
  });
}
