import {
  HTTPTransport,
  BaseAPI,
} from '../../modules/http/index.js';

// interface SignupData {
//   first_name: string;
//   second_name: string;
//   login: string;
//   email: string;
//   password: string;
//   phone: string;
// }
//
// interface SignInData {
//   login: string;
//   password: string;
// }

interface PlainObject {
  [key: string]: string;
}

const host = 'https://ya-praktikum.tech';

const authAPIInstance = new HTTPTransport(`${host}/api/v2/auth`);

export default class AuthAPI extends BaseAPI {
  signup(data: PlainObject) {
    return authAPIInstance.post('/signup', {
      data,
      withCredentials: true,
      headers: { 'content-type': 'application/json' },
    });
  }

  signin(data: PlainObject) {
    return authAPIInstance.post('/signin', {
      data,
      withCredentials: true,
      headers: { 'content-type': 'application/json' },
    });
  }

  logout() {
    return authAPIInstance.post('/logout', {
      withCredentials: true,
    });
  }

  getUser() {
    return authAPIInstance.get('/user', {
      withCredentials: true,
    });
  }
}
