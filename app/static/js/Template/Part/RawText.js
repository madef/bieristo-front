import TemplateElement from '../Element';

class TemplatePartRawText extends TemplateElement {
  constructor(text) {
    super();
    this.text = text;
  }

  render() {
    return this.text;
  }
}

export default TemplatePartRawText;
