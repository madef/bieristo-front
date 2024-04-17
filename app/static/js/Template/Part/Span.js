import TemplatePartNodeAbstract from './NodeAbstract';

class TemplatePartSpan extends TemplatePartNodeAbstract {
  constructor() {
    super();
    this.node = 'span';
  }
}

export default TemplatePartSpan;
