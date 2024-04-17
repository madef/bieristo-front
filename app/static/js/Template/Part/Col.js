import TemplatePartNodeAbstract from './NodeAbstract';

class TemplatePartCol extends TemplatePartNodeAbstract {
  constructor() {
    super();
    this.node = 'div';
    this.classes = ['col'];
  }

  setTypes(types) {
    for (const i in types) {
      this.addClass(`col-${types[i]}`);
    }

    return this;
  }
}

export default TemplatePartCol;

