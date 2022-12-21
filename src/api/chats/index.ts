import {
  HTTPTransport,
  BaseAPI,
} from '../../modules/http';
import config from '../../config/config';

const chatsAPIInstance = new HTTPTransport(`${config.serverHost}/api/chats`);

export default class ChatsAPI extends BaseAPI {
  getChats() {
    return chatsAPIInstance.get('/', {
      headers: { 'content-type': 'application/json', authorization: this.token() },
    });
  }

  createChat(data: PlainObject) {
    return chatsAPIInstance.post('/', {
      data,
      headers: { 'content-type': 'application/json', authorization: this.token() },
    });
  }

  addUsers(data: PlainObject) {
    return chatsAPIInstance.put('/users', {
      data,
      headers: { 'content-type': 'application/json', authorization: this.token() },
    });
  }

  deleteUsers(data: PlainObject) {
    return chatsAPIInstance.delete('/users', {
      data,
      headers: { 'content-type': 'application/json', authorization: this.token() },
    });
  }

  getChatUsers(chatId: number | string) {
    return chatsAPIInstance.get(`/${chatId}/users`, {
      headers: { 'content-type': 'application/json', authorization: this.token() },
    });
  }

  getChatToken(chatId: number | string) {
    return chatsAPIInstance.post(`/token/${chatId}`, {
      headers: { 'content-type': 'application/json', authorization: this.token() },
    });
  }
}
