import TemplatePartNodeAbstract from './NodeAbstract';

class TemplatePartRow extends TemplatePartNodeAbstract {
  constructor() {
    super();
    this.classes = ['row'];
    this.node = 'div';
  }

  setTypes(types) {
    this.class = '';
    for (const i in types) {
      this.addClass('row-'+types[i]);
    }

    return this;
  }
}

export default TemplatePartRow;
