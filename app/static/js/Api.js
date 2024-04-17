import Url from './Url';
import Alert from './Alert';
import Translator from './Translator';

class Api {
  constructor(domain) {
    this.domain = domain;
    this.alert = Alert.getInstance();
    this.translator = Translator.getInstance();
  }

  send(uri, data, callback) {
    const xhr = new XMLHttpRequest();

    this.url = new Url(this.domain);
    xhr.open('POST', this.url.get(`${uri}.php`), (typeof callback === 'function'));

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    if (typeof callback === 'function') {
      xhr.onload = function onload() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          callback(xhr.readyState, xhr.status, JSON.parse(xhr.responseText));
        } else {
          this.alert.error(this.t('Request error: please try later'));
        }
      };
      xhr.send(this.encodeGetParams(data));
    } else {
      xhr.send(this.encodeGetParams(data));
      if (xhr.readyState !== 4 || xhr.status !== 200) {
        this.alert.error(this.t('Request error: please try later'));
      }

      return JSON.parse(xhr.responseText);
    }

    return this;
  }

  encodeGetParams (params) {
    if (typeof params.entries === 'function') {
      let data = {};
      for (let pair of params.entries()) {
        data[pair[0]] = pair[1];
      }
      return Object.entries(data).map(kv => kv.map(encodeURIComponent).join("=")).join("&");
    }
    return Object.entries(params).map(kv => kv.map(encodeURIComponent).join("=")).join("&");
  }

  t(str, params) {
    return this.translator.get(str, params);
  }
}

export default Api;
