import TemplatePartNodeAbstract from './NodeAbstract';
import TemplatePartRawText from './RawText';

class TemplatePartBadge extends TemplatePartNodeAbstract {
  constructor(content) {
    super();
    this.node = 'span';
    this.classes = ['badge'];
    this.contents = [new TemplatePartRawText(content)];
  }
}

export default TemplatePartBadge;

