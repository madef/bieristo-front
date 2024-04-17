import TemplateElement from '../Element';

class TemplatePartGrid extends TemplateElement {
  constructor() {
    super();
    this.d = 'grid';
    this.gap = '2';
  }

  setGap(gap) {
    this.gap = gap;

    return this;
  }

  setDisplay(display) {
    this.d = display;

    return this;
  }

  render() {
    return `<div class="d-${this.d} gap-${this.gap}">${TemplateElement.prototype.render.call(this)}</div>`;
  }
}

export default TemplatePartGrid;
