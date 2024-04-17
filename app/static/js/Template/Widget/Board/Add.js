import Alert from '../../../Alert';
import TemplatePartCol from '../../Part/Col';
import TemplatePartTitle from '../../Part/Title';
import TemplatePartForm from '../../Part/Form';
import TemplatePartInput from '../../Part/Input';
import TemplatePartButton from '../../Part/Button';
import TemplatePartDiv from '../../Part/Div';
import TemplatePartLabel from '../../Part/Label';
import Translator from '../../../Translator';

class TemplateWidgetBoardAdd {
  constructor(app) {
    this.app = app;
    this.translator = Translator.getInstance();
    this.alert = Alert.getInstance();
  }

  render() {
    this.boardId = new TemplatePartInput()
      .setIdentifier('boardId')
      .setName('boardId')
      .addClass('form-control')
      .setPlaceholder(this.t('Token'))
      .setAutofocus()
      .setRequired()
      .setType('text')
      .setId('boardId');

    this.name = new TemplatePartInput()
      .setIdentifier('name')
      .setName('name')
      .addClass('form-control')
      .setPlaceholder(this.t('Name'))
      .setRequired()
      .setType('text')
      .setId('name');

    this.form = (new TemplatePartForm())
      .setAttribute('enctype', 'multipart/form-data')
      .appendChild(new TemplatePartDiv()
        .addClass('form-floating')
        .addClass('mb-3')
        .appendChild(this.boardId)
        .appendChild((new TemplatePartLabel(this.t('Board id')))
          .setFor('boardId')
          .addClass('text-dark')
        )
      )
      .appendChild((new TemplatePartDiv())
        .addClass('form-floating')
        .addClass('mb-3')
        .appendChild(this.name)
        .appendChild((new TemplatePartLabel(this.t('Name')))
          .setFor('name')
          .addClass('text-dark')
        )
      )
      .appendChild((new TemplatePartDiv())
        .addClass('d-grid')
        .addClass('gap-2')
        .appendChild((new TemplatePartButton(this.t('Add')))
          .addVariation('primary')
          .addVariation('lg')
          .setType('submit')
        )
      )
      .setAction(() => this.save());


    return (new TemplatePartCol()).setTypes(['lg-10', 'md-9']).setIdentifier('main-content')
      .appendChild((new TemplatePartTitle(1, this.t('Add a new board')))
        .addClass('mb-5')
      )
      .appendChild(this.form)
      .render();
  }

  t(str, params) {
    return this.translator.get(str, params);
  }

  save() {
    var formData = new FormData(this.form.get());
      formData.append('token', this.app.getToken());

    this.app.getApi().send(
      'user/board/create',
      formData,
      (function(readyState, status, response) {
        if (response.status) {
          this.app.loadUserData(() => {
            this.app.renderApp('edit-board', {boardId: this.boardId.get().value});
            this.alert.success(this.t('The board has been saved'));
          });
        } else {
          this.alert.error(this.t(response.reason));
          if (response.target) {
            this[response.target].get().focus();
          }
        }
      }).bind(this)
    );

    return false;
  }
}
export default TemplateWidgetBoardAdd;
