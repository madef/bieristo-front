import TemplateElement from '../Element';

class TemplatePartSvg extends TemplateElement {
  constructor(d) {
    super();
    this.d = d;
    this.height = false;
    this.width = false;
    this.viewBox = '0 0 16 16';
    this.classes = [];
  }

  setClasses(classes) {
    this.classes = classes;

    return this;
  }

  setWidth(width) {
    this.width = width;

    return this;
  }

  setHeight(height) {
    this.height = height;

    return this;
  }

  setColor(color) {
    this.color = color;

    return this;
  }

  setViewBox(viewBox) {
    this.viewBox = viewBox;

    return this;
  }

  getStyle() {
    const styles = [];

    if (this.height) {
      styles.push(`height: ${this.height};`);
    }

    if (this.width) {
      styles.push(`width: ${this.width};`);
    }

    if (this.color) {
      styles.push(`color: ${this.color};`);
    }

    return styles.join(' ');
  }

  render() {
    let html = `<svg class="${this.classes}" xmlns="http://www.w3.org/2000/svg" viewBox="${this.viewBox}" fill="${this.color}" height="${this.height}" width="${this.width}" data-identifier="${this.getIdentifier()}">`;

    if (typeof this.d === 'object') {
      for (let i in this.d) {
        html += `<path d="${this.d[i]}"/>`
      }
    } else {
        html += `<path d="${this.d}"/>`
    }

    html += '</svg>';

    return html;
  }
}

export default TemplatePartSvg;
