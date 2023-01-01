import ReconnectingWebSocket from 'reconnecting-websocket';

type CallbackFunction = (event: any) => void;

class WebSocketService {
  chatId: string;

  token: string;

  socket: WebSocket;

  constructor(baseUrl: string) {
    this.token = sessionStorage.getItem('token') || '';

    this.socket = new ReconnectingWebSocket(`${baseUrl}?token=${this.token}`) as WebSocket;
  }

  subscribe(eventType: string, callback: CallbackFunction): void {
    this.socket.addEventListener(eventType, (event) => {
      callback(event);
    });
  }

  send(data: any) {
    this.socket.send(JSON.stringify(data));
  }

  close() {
    this.socket.close();
  }
}

export default WebSocketService;
