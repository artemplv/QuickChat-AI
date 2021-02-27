const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

interface requestDataObject {
  [key: string]: any;
}

interface headersObject {
  [key: string]: string;
}

interface optionsObject {
  data?: requestDataObject;
  timeout?: number;
  headers?: headersObject;
}

interface requestPreparedOptions extends optionsObject {
  method: string;
}

function queryStringify(data: requestDataObject): string {
  if (!data) {
    return '';
  }
  let params = new URLSearchParams();

  for (const key in data) {
    if (Array.isArray(data[key])) {
      data[key].forEach((item: any) => {
        params.append(key, item);
      });
    } else {
      params.set(key, data[key]);
    }
  }
  const paramsString = params.toString();
  if (!paramsString) {
    return '';
  }
  return `?${paramsString}`;
}

export default class HTTPTransport {
  baseUrl: string;

  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  get = (url: string, options: optionsObject = {}) => {
    if (options.data) {
      const data = queryStringify(options.data);
      url = `${url}${data}`;
    }

  	return this.request(`${this.baseUrl}${url}`, {...options, method: METHODS.GET}, options?.timeout);
  };

  put = (url: string, options: optionsObject = {}) => {

  	return this.request(`${this.baseUrl}${url}`, {...options, method: METHODS.PUT}, options?.timeout);
  };

  post = (url: string, options: optionsObject = {}) => {

  	return this.request(`${this.baseUrl}${url}`, {...options, method: METHODS.POST}, options?.timeout);
  };

  delete = (url: string, options: optionsObject = {}) => {

  	return this.request(`${this.baseUrl}${url}`, {...options, method: METHODS.DELETE}, options?.timeout);
  };

  // options:
  // headers — obj
  // data — obj
  request = (url: string, options: requestPreparedOptions, timeout = 5000) => {
    const {
      method,
      data,
      headers = {},
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.timeout = timeout;
      for (const key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = function() {
        reject(new Error('aborted'));
      };;
      xhr.onerror = function() {
        reject(new Error('error'));
      };
      xhr.ontimeout = function() {
        reject(new Error('request timed out'));
      };

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
