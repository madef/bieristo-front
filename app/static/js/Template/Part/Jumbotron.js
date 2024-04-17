import TemplatePartNodeAbstract from './NodeAbstract';
import TemplatePartTitle from './Title';
import TemplatePartP from './P';

class TemplatePartJumbotron extends TemplatePartNodeAbstract {
  constructor() {
    super();
    this.node = 'div';
    this.classes = ['jumbotron'];
  }

  setTitle(title) {
    this.appendChild(new TemplatePartTitle('1', title));

    return this;
  }

  addParagraph(content) {
    this.appendChild(new TemplatePartP(content));

    return this;
  }
}

export default TemplatePartJumbotron;
