import TemplateElement from '../Element';
import Listener from '../../Listener';

class TemplatePartNodeAbstract extends TemplateElement {
  constructor() {
    super();
    this.node = 'node';
    this.classes = [];
    this.attributes = {};
    this.styles = [];
    this.text = '';
    this.actions = [];
  }

  setClasses(classes) {
    this.classes = classes;

    return this;
  }

  addClass(classAttr) {
    this.classes.push(classAttr);

    return this;
  }

  addStyle(style) {
    this.styles.push(style);

    return this;
  }

  setAttribute(attribute, value) {
    if (attribute === 'class') {
      this.addClass(value);
    } else if (attribute === 'style') {
      this.addStyle(value);
    } else {
      this.attributes[attribute] = value;
    }

    return this;
  }

  removeAttribute(attribute) {
    delete this.attributes[attribute];

    return this;
  }

  getClassAttribute() {
    if (!this.classes.length) {
      return '';
    }

    return ` class="${this.classes.join(' ')}"`;
  }

  getStyleAttribute() {
    if (!this.styles.length) {
      return '';
    }

    return ` style="${this.styles.join(' ')}"`;
  }

  setId(id) {
    this.setAttribute('id', id);

    return this;
  }

  getOtherAttributes() {
    const attributes = [];

    for (const i in this.attributes) {
      if (typeof this.attributes[i] !== 'undefined') {
        attributes.push(`${i}="${this.attributes[i]}"`);
      } else {
        attributes.push(i);
      }
    }

    if (!attributes.length) {
      return '';
    }

    return ` ${attributes.join(' ')}`;
  }

  setText(text) {
    this.text = text;
  }

  render() {
    for (const i in this.actions) {
      Listener.add(
        this.actions[i].eventName,
        this.actions[i].querySelector,
        (function callback() {
          return (this.actions[i].callback.bind(this))();
        }).bind(this)
      );
    }

    return `<${this.node}`
      + this.getClassAttribute()
      + this.getStyleAttribute()
      + this.getOtherAttributes()
      + ` data-identifier="${this.getIdentifier()}"`
      + '>'
      + TemplateElement.prototype.render.call(this)
      + this.text
      + `</${this.node}>`;
  }

  getElement() {
    const placeholder = document.createElement('div');
    placeholder.innerHTML = this.render();
    return placeholder.firstElementChild;
  }

  reload() {
    this.get().replaceWith(this.getElement());
    Listener.run();
  }
}

export default TemplatePartNodeAbstract;
