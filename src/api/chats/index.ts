import {
  HTTPTransport,
  BaseAPI,
} from '../../modules/http';
import config from '../../config/config';

const chatsAPIInstance = new HTTPTransport(`${config.serverHost}/api/chats`);

export default class ChatsAPI extends BaseAPI {
  getChats() {
    const accessToken = sessionStorage.getItem('token');

    return chatsAPIInstance.get('/', {
      headers: { 'content-type': 'application/json', authorization: accessToken || '' },
    });
  }

  createChat(data: PlainObject) {
    const accessToken = sessionStorage.getItem('token');

    return chatsAPIInstance.post('/', {
      data,
      headers: { 'content-type': 'application/json', authorization: accessToken || '' },
    });
  }

  addUsers(data: PlainObject) {
    const accessToken = sessionStorage.getItem('token');

    return chatsAPIInstance.put('/users', {
      data,
      headers: { 'content-type': 'application/json', authorization: accessToken || '' },
    });
  }

  deleteUsers(data: PlainObject) {
    const accessToken = sessionStorage.getItem('token');

    return chatsAPIInstance.delete('/users', {
      data,
      headers: { 'content-type': 'application/json', authorization: accessToken || '' },
    });
  }

  getChatUsers(chatId: number | string) {
    const accessToken = sessionStorage.getItem('token');

    return chatsAPIInstance.get(`/${chatId}/users`, {
      headers: { 'content-type': 'application/json', authorization: accessToken || '' },
    });
  }

  getChatToken(chatId: number | string) {
    const accessToken = sessionStorage.getItem('token');

    return chatsAPIInstance.post(`/token/${chatId}`, {
      headers: { 'content-type': 'application/json', authorization: accessToken || '' },
    });
  }
}
