import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`✅ Client connecté: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`❌ Client déconnecté: ${client.id}`);
  }

  // Envoyer nouvelle production à tous les clients
  emitNouvelleProduction(production: any) {
    this.server.emit('nouvelle_production', production);
  }

  // Envoyer mise à jour ouvrier (présence RFID)
  emitPresenceOuvrier(ouvrier: any) {
    this.server.emit('presence_ouvrier', ouvrier);
  }

  // Envoyer alerte défaut IA
  emitAlerteDefaut(alerte: any) {
    this.server.emit('alerte_defaut', alerte);
  }

  // Envoyer mise à jour OEE
  emitOEE(oee: any) {
    this.server.emit('oee_update', oee);
  }

  @SubscribeMessage('ping')
  handlePing(client: Socket) {
    client.emit('pong', { message: 'pong', time: new Date() });
  }
}
