import Alert from '../../Alert';
import TemplatePartCol from '../Part/Col';
import TemplatePartJumbotron from '../Part/Jumbotron';
import Translator from '../../Translator';
import TemplatePartInput from '../Part/Input';
import TemplatePartSelect from '../Part/Select';
import TemplatePartOption from '../Part/Option';
import TemplatePartForm from '../Part/Form';
import TemplatePartDiv from '../Part/Div';
import Confirm from '../../Confirm';
import TemplatePartButton from '../Part/Button';
import TemplatePartP from '../Part/P';
import TemplatePartLabel from '../Part/Label';

class TemplateWidgetAccount {
  constructor(app) {
    this.app = app;
    this.translator = Translator.getInstance();
    this.alert = Alert.getInstance();
  }

  render() {
    this.emailInput = new TemplatePartInput()
      .setIdentifier('email')
      .setName('email')
      .addClass('form-control')
      .setPlaceholder(this.t('* Email address'))
      .setRequired()
      .setType('text')
      .setValue(this.app.getUserData().email)
      .setId('email');

    this.passwordInput = new TemplatePartInput()
      .setIdentifier('password')
      .setName('password')
      .addClass('form-control')
      .setPlaceholder(this.t('* Current password'))
      .setRequired()
      .setType('password')
      .setAutocomplete('off')
      .setId('password');

    this.newPasswordInput = new TemplatePartInput()
      .setIdentifier('newPassword')
      .setName('newPassword')
      .addClass('form-control')
      .setPlaceholder(this.t('Change my password'))
      .setType('newPassword')
      .setAutocomplete('off')
      .setId('newPassword');

    this.defaultBoardSelect = new TemplatePartSelect()
      .setIdentifier('defaultBoard')
      .setName('defaultBoard')
      .addClass('form-control')
      .setAriaLabel(this.t('Default Pannel'))
      .setId('defaultBoard');

    this.defaultBoardSelect.appendChild(new TemplatePartOption(this.t('My account'), 'Account'));

    const boards = Object.entries(this.app.getUserData().boardList);
    for (let i in boards) {
      const boardId = boards[i][0];
      const board = boards[i][1];

      const option = new TemplatePartOption(board.name, boardId);
      this.defaultBoardSelect.appendChild(option);

      if (this.app.getUserData().defaultBoard === boardId) {
        option.setAttribute('selected', '');
      }
    }

    this.form = (new TemplatePartForm())
      .setAttribute('enctype', 'multipart/form-data')
      .addClass('row')
      .addClass('g-3')
      .appendChild((new TemplatePartDiv())
        .addClass('form-floating')
        .addClass('mb-3')
        .addClass('col-md-6')
        .appendChild(this.emailInput)
        .appendChild((new TemplatePartLabel(this.t('* Email address')))
          .setFor('email')
          .addClass('text-dark')
        )
      )
      .appendChild((new TemplatePartDiv())
        .addClass('form-floating')
        .addClass('mb-3')
        .addClass('col-md-6')
        .appendChild(this.defaultBoardSelect)
        .appendChild((new TemplatePartLabel(this.t('Default pannel')))
          .setFor('defaultBoard')
          .addClass('text-dark')
        )
      )
      .appendChild((new TemplatePartDiv())
        .addClass('form-floating')
        .addClass('mb-3')
        .addClass('col-md-6')
        .appendChild(this.passwordInput)
        .appendChild((new TemplatePartLabel(this.t('* Current password')))
          .setFor('password')
          .addClass('text-dark')
        )
      )
      .appendChild((new TemplatePartDiv())
        .addClass('form-floating')
        .addClass('mb-3')
        .addClass('col-md-6')
        .appendChild(this.newPasswordInput)
        .appendChild((new TemplatePartLabel(this.t('Change my password')))
          .setFor('newPassword')
          .addClass('text-dark')
        )
      )
      .appendChild(new TemplatePartP('* required entries')
        .addClass('m-0')
        .addClass('text-danger')
      )
      .appendChild((new TemplatePartDiv())
        .addClass('d-grid')
        .addClass('gap-2')
        .addClass('col-12')
        .addClass('mb-3')
        .appendChild((new TemplatePartButton(this.t('Update my profile')))
          .addVariation('primary')
          .addVariation('lg')
          .setType('submit')
        )
      )
      .appendChild((new TemplatePartDiv())
        .addClass('d-grid')
        .addClass('gap-2')
        .addClass('col-12')
        .addClass('mb-3')
        .appendChild((new TemplatePartButton(this.t('Logout')))
          .addVariation('danger')
          .addVariation('lg')
          .setAction(() => this.logout())
        )
      )
      .setAction(() => this.save());

    return ((new TemplatePartCol()).setTypes(['lg-10', 'md-9']).setIdentifier('main-content')
      .appendChild(new TemplatePartJumbotron()
        .setTitle(this.t('Bieristo'))
        .addParagraph(
           this.t('Bieristo is a website app to pilot brewing systems based on Raspberry Pi cards.')
        )
        .addClass('mb-5')
      )
      .appendChild(this.form)
    ).render();
  }

  save() {
    const formData = new FormData(this.form.get());

    formData.append('token', this.app.getToken());
    formData.append('email', this.emailInput.get().value);
    formData.append('password', this.passwordInput.get().value);
    formData.append('newPassword', this.newPasswordInput.get().value);
    formData.append('defaultBoard', this.defaultBoardSelect.get().value);

    this.app.getApi().send(
      'user/update',
      formData,
      (readyState, status, response) => {
        if (response.status) {
          this.app.loadUserData(() => {
            this.passwordInput.get().value = '';
            this.newPasswordInput.get().value = '';
            this.alert.success(this.t('Your profile was updated'));
          });
        } else {
          this.alert.error(this.t(response.reason));
          if (response.target) {
            this[response.target].get().focus();
          }
        }
      },
    );

    return false;
  }

  logout() {
    new Confirm(
      'danger',
      this.t("Are you sure you want to logout?"),
      this.t("Logout"),
      this.t("Cancel"),
      () => {
        localStorage.clear();
        window.location.reload()
      }
    );
  }

  t(str, params) {
    return this.translator.get(str, params);
  }
}
export default TemplateWidgetAccount;
