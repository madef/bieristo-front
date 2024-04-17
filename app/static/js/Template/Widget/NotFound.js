import TemplatePartCol from '../Part/Col';
import TemplatePartRawText from '../Part/RawText';
import Translator from '../../Translator';

class TemplateWidgetNotFound {
  constructor() {
    this.translator = Translator.getInstance();
  }

  render() {
    return ((new TemplatePartCol()).setTypes(['lg-10', 'md-9']).setIdentifier('main-content')
      .appendChild(new TemplatePartRawText(this.t('404 - Page Not Found')))
    ).render();
  }

  t(str, params) {
    return this.translator.get(str, params);
  }
}

export default TemplateWidgetNotFound;
