const baseUrl = 'wss://ya-praktikum.tech/ws/chats';

class WebSocketService {
  userId: number;
  chatId: number;
  token: string;
  socket: WebSocket;

  constructor(userId: number, chatId: number, token: string) {
    this.userId = userId;
    this.chatId = chatId;
    this.token = token;

    this.socket = new WebSocket(`${baseUrl}/${userId}/${chatId}/${token}`);
  }

  subscribe = (eventType: string, callback: Function) => {
    console.log(this.socket);
    this.socket.addEventListener(eventType, (event) => {
      callback(event);
    })
  }

  send = (data: any) => {
    this.socket.send(JSON.stringify(data));
  }
}

export default WebSocketService;
