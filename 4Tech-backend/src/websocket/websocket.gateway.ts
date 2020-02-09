import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

//injecteble
@WebSocketGateway()
export class WebsocketGateway {
  
  @WebSocketServer() server;

  notifyOneLike(userActivityId: string, userId: string){
    this.server.emit('events', {mediald: userActivityId, userActivityId, userId})
  }

}
