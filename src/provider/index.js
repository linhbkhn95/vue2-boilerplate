/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-loop-func */
/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import { apiBase } from './config';
// import localStorage from 'localStorage';
// axios.defaults.withCredentials = true;

const headers = {
  'Access-Control-Allow-Origin': '*',
  // 'Access-Control-Allow-Origin-Credentials': true,
  // 'Content-Type': 'application/json',

};
// eslint-disable-next-line no-unused-vars
 function getCookies() {
  var pairs = document.cookie.split(';');
  var cookies = {};
  // eslint-disable-next-line no-plusplus
  for (var i=0; i < pairs.length; i++) {
    var pair = pairs[i].split("=");
    cookies[(pair[0]+'').trim()] = unescape(pair[1]);
  }
  return cookies;
}
// headers.append("GET", "POST", "OPTIONS");

function preSendData(data) {
  // eslint-disable-next-line no-restricted-syntax
  for (const prop in data) {
    const dataElement = data[prop];
    if (
      dataElement == null ||
      dataElement === undefined ||
      dataElement === 'null' ||
      dataElement === '' ||
      dataElement === 'undefined'
    ) {
      delete data[prop];
    }
  }

  return data;
}
const request = axios.create({
  // baseURL: apiBase,
  headers,
  // withCredentials: true,
  // credentials: 'same-origin',
  // Accept: 'application/json',
  // 'Content-Type': 'application/json',

});
// axios.defaults.baseURL = apiBase;
// axios.defaults.headers.common = { "X-Requested-With": "XMLHttpRequest" };
// axios.defaults.baseURL = process.env.NODE_ENV !== "production" ? apiBase : "";
// const methods = ["get", "put", "post", "delete", "patch"];
export const get = (endpoint, config = {}, getlocalStorage = true) => {
  if (getlocalStorage && localStorage.getItem('token')) {
    config = {
      ...config,
      withCredentials: true,
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
  }
  var myCookies = getCookies();
  // eslint-disable-next-line no-alert
  console.log(myCookies.secret);
  return request.get(endpoint, config);
};
export const post = (
  endpoint,
  data,
  config = {
    headers: null,
  },
) => {
  // eslint-disable-next-line quotes
  if (localStorage.getItem("token") && !config.headers) {
    config = {
      ...config,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
  }
  data = preSendData(data);

  const formData = new FormData();
  if (data && data.hasFile) {
    config = {
      ...config,
      header: {
        ...config.headers,
        'Content-Type': 'multipart/form-data',
      },
    };
    delete data.hasFile;
    // eslint-disable-next-line no-restricted-syntax
    // eslint-disable-next-line vars-on-top
    // eslint-disable-next-line no-restricted-syntax
    // eslint-disable-next-line vars-on-top
    // eslint-disable-next-line no-restricted-syntax
    for (var prop in data) {
      console.log('prop: ', data[prop]);
      if (Array.isArray(data[prop])) {
        data[prop].forEach((dt) => {
          formData.append(prop, dt);
        });
      } else {
        formData.append(prop, data[prop]);
      }

      delete data[prop];
    }
    data = formData;
  }

  return request.post(endpoint, data, config);
};

export const puts = (
  endpoint,
  data,
  config = {
    headers: {},
  },
) => {
  if (localStorage.getItem('token')) {
    config = {
      ...config,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
  }
  return request.put(endpoint, data, config);
};

export const deletes = (
  endpoint,
  data,
  config = {
    headers: {},
  },
) => {
  if (localStorage.getItem('token')) {
    config = {
      ...config,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
  }
  return request.delete(endpoint, config);
};
