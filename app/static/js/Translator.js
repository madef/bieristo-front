class Translator {
  constructor() {
    this.translations = {};
  }

  static getInstance() {
    if (typeof Translator.instance === 'undefined') {
      Translator.instance = new Translator();
    }

    return Translator.instance;
  }

  setLanguage(language, callback) {
    this.language = language;

    fetch(`/static/js/Language/${language}.json`, { method: 'GET' })
    .then(response => {
      if (!response.ok) {
        throw 'Invalid language';
      }
      return response.json();
    }).then(json => {
      this.translations = json;
      callback();
    });
  }

  get(str, params, count) {
    let strTranslated;
    let countStr = count;

    if (typeof count === 'undefined') {
      countStr = '*';
    }

    if (typeof this.translations[str] === 'undefined') {
      strTranslated = `[★]${str}`;
    } else if (typeof this.translations[str][countStr] === 'undefined') {
      countStr = '*';
      if (typeof this.translations[str][countStr] === 'undefined') {
        strTranslated = `[★]${str}`;
      } else {
        strTranslated = this.translations[str][countStr];
      }
    } else {
      strTranslated = this.translations[str][countStr];
    }

    if (typeof params === 'object') {
      let keys = Object.keys(params);
      for (let i in keys) {
        let param = keys[i];
        strTranslated = strTranslated.replaceAll(`%${param}%`, params[param]);
      }
    }

    return strTranslated;
  }
}
export default Translator;
