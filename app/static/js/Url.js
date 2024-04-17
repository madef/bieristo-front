class Url {
  constructor(domain) {
    this.domain = domain;
  }

  get(uri, params) {
    let realParams = params;
    let url = `${this.domain}/${uri}`;

    if (typeof params === 'undefined') {
      realParams = [];
    }

    if (realParams.length) {
      url += `#${JSON.stringify(params)}`;
    }

    return url;
  }
}
export default Url;
