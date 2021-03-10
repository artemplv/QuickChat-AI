type CallbackFunction = (event: any) => void;

class WebSocketService {
  userId: number;

  chatId: number;

  token: string;

  socket: WebSocket;

  constructor(baseUrl: string, userId: number, chatId: number, token: string) {
    this.userId = userId;
    this.chatId = chatId;
    this.token = token;

    this.socket = new WebSocket(`${baseUrl}/${userId}/${chatId}/${token}`);
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
