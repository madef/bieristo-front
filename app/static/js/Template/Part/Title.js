import TemplatePartNodeAbstract from './NodeAbstract';
import TemplatePartRawText from './RawText';

class TemplatePartTitle extends TemplatePartNodeAbstract {
  constructor(level, title) {
    super();
    this.node = `h${level}`;

    this.contents = [new TemplatePartRawText(title)];
  }
}

export default TemplatePartTitle;
