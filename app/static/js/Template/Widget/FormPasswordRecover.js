import Alert from '../../Alert';
import Translator from '../../Translator';
import TemplatePartContainer from '../Part/Container';
import TemplatePartRow from '../Part/Row';
import TemplatePartCol from '../Part/Col';
import TemplatePartForm from '../Part/Form';
import TemplatePartDiv from '../Part/Div';
import TemplatePartSvg from '../Part/Svg';
import TemplatePartInput from '../Part/Input';
import TemplatePartLabel from '../Part/Label';
import TemplatePartButton from '../Part/Button';
import TemplatePartP from '../Part/P';

class TemplateWidgetFormPasswordRecover {
  constructor(app, token) {
    this.app = app;
    this.token = token;
    this.translator = Translator.getInstance();
    this.alert = Alert.getInstance();
  }

  render() {
    this.email = new TemplatePartInput()
      .setIdentifier('email')
      .addClass('form-control')
      .setPlaceholder(this.t('Email address'))
      .setAutofocus()
      .setRequired()
      .setType('email')
      .setId('email');

    this.password = new TemplatePartInput()
      .setIdentifier('password')
      .addClass('form-control')
      .setPlaceholder(this.t('Password'))
      .setAutofocus()
      .setRequired()
      .setType('password')
      .setId('password');

    return new TemplatePartContainer()
      .setType('fluid')
      .appendChild(new TemplatePartRow()
        .addClass('justify-content-center')
        .appendChild(new TemplatePartCol()
          .addClass('col-md-6 col-lg-4 col-sm-8')
          .appendChild(new TemplatePartForm()
            .appendChild(new TemplatePartDiv()
              .addClass('text-center')
              .addClass('mb-4')
              .appendChild(new TemplatePartSvg('M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z')
                .setWidth('30px')
                .setHeight('30px')
                .setColor('white')
              )
            )
            .appendChild(new TemplatePartP(this.t('Enter your email and your new password.')))
            .appendChild(new TemplatePartDiv()
              .addClass('form-floating')
              .addClass('mb-3')
              .appendChild(this.email)
              .appendChild(new TemplatePartLabel(this.t('Email address'))
                .setFor('email')
                .addClass('text-dark')
              )
            )
            .appendChild(new TemplatePartDiv()
              .addClass('form-floating')
              .addClass('mb-3')
              .appendChild(this.password)
              .appendChild(new TemplatePartLabel(this.t('Password'))
                .setFor('password')
                .addClass('text-dark')
              )
            )
            .appendChild(new TemplatePartDiv()
              .addClass('d-grid')
              .addClass('gap-2')
              .appendChild(new TemplatePartButton(this.t('Modify my password'))
                .addVariation('primary')
                .addVariation('lg')
                .setType('submit')
              )
              .appendChild(new TemplatePartButton(this.t('Cancel'))
                .addVariation('warning')
                .addVariation('sm')
                .setAction(() => this.login())
              )
            )
            .setAction(() => this.modifyPassword())
          )
        )
      )
      .render();
  }

  t(str, params) {
    return this.translator.get(str, params);
  }

  modifyPassword() {
    this.app.getApi().send(
      'user/password-recover',
      { email: this.email.get().value, password: this.password.get().value, token: this.token },
      (function(readyState, status, response) {
        if (response.status) {
          window.location.hash = '';
          this.app.renderLogin();
          this.alert.info(this.t('Your password was updated.'));
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

  login() {
    window.location = '/';

    return false;
  }
}

export default TemplateWidgetFormPasswordRecover;
