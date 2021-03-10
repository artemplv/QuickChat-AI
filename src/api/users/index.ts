import {
  HTTPTransport,
  BaseAPI,
} from '../../modules/http';

const host = 'https://ya-praktikum.tech';

const usersAPIInstance = new HTTPTransport(`${host}/api/v2/user`);

export default class UsersAPI extends BaseAPI {
  changeProfile(data: PlainObject) {
    return usersAPIInstance.put('/profile', {
      data,
      withCredentials: true,
      headers: { 'content-type': 'application/json' },
    });
  }

  changeAvatar(data: FormData) {
    return usersAPIInstance.put('/profile/avatar', {
      data: {},
      file: data,
      withCredentials: true,
    });
  }

  changePassword(data: PlainObject) {
    return usersAPIInstance.put('/password', {
      data,
      withCredentials: true,
      headers: { 'content-type': 'application/json' },
    });
  }

  getUsersByLogin(data: PlainObject) {
    return usersAPIInstance.post('/search', {
      data,
      withCredentials: true,
      headers: { 'content-type': 'application/json' },
    });
  }
}
