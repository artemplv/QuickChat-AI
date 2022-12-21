import {
  HTTPTransport,
  BaseAPI,
} from '../../modules/http';
import config from '../../config/config';

const usersAPIInstance = new HTTPTransport(`${config.serverHost}/api/user`);

export default class UsersAPI extends BaseAPI {
  changeProfile(data: PlainObject) {
    const accessToken = sessionStorage.getItem('token');

    return usersAPIInstance.put('/profile', {
      data,
      headers: { 'content-type': 'application/json', authorization: accessToken || '' },
    });
  }

  changeAvatar(data: FormData) {
    return usersAPIInstance.put('/profile/avatar', {
      data: {},
      file: data,
    });
  }

  changePassword(data: PlainObject) {
    const accessToken = sessionStorage.getItem('token');

    return usersAPIInstance.put('/password', {
      data,
      headers: { 'content-type': 'application/json', authorization: accessToken || '' },
    });
  }

  getUsersByLogin(data: PlainObject) {
    const accessToken = sessionStorage.getItem('token');

    return usersAPIInstance.post('/search', {
      data,
      headers: { 'content-type': 'application/json', authorization: accessToken || '' },
    });
  }
}
