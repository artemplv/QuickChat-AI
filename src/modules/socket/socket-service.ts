type CallbackFunction = (event: any) => void;

class WebSocketService {
  chatId: string;

  token: string;

  socket: WebSocket;

  constructor(baseUrl: string, chatId: string) {
    this.chatId = chatId;
    this.token = sessionStorage.getItem('token') || '';

    this.socket = new WebSocket(`${baseUrl}?chatId=${chatId}&token=${this.token}`);
  }

  subscribe = (eventType: string, callback: CallbackFunction): void => {
    this.socket.addEventListener(eventType, (event) => {
      callback(event);
    });
  };

  send = (data: any) => {
    this.socket.send(JSON.stringify(data));
  };
}

export default WebSocketService;
