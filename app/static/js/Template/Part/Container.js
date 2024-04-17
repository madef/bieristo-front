import TemplatePartNodeAbstract from './NodeAbstract';

class TemplatePartContainer extends TemplatePartNodeAbstract {
  constructor() {
    super();
    this.node = 'div';
    this.classes = ['container'];
  }

  setType(type) {
    this.classes.splice(0, 1, `container-${type}`);

    return this;
  }
}

export default TemplatePartContainer;
