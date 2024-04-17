"use strict";
import Listener from './Listener';

var Template = function(url, api) {
    this.url = url;
    this.api = api;
};

Template.prototype.render = function(query, html) {
    Listener.flush();

    document.querySelector(query).innerHTML = html.render();
    Listener.run();
};
export default Template;
