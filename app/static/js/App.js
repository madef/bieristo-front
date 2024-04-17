import Translator from './Translator';
import Url from './Url';
import Api from './Api';
import Alert from './Alert';
import NotificationManager from './NotificationManager';
import Template from './Template';
import TemplateElement from './Template/Element';
import TemplateWidgetFormLogin from './Template/Widget/FormLogin';
import TemplateWidgetFormPasswordRecover from './Template/Widget/FormPasswordRecover';
import TemplateWidgetFormLostPassword from './Template/Widget/FormLostPassword';
import TemplateWidgetAccount from './Template/Widget/Account';
import TemplateWidgetBoardEdit from './Template/Widget/Board/Edit';
import TemplateWidgetBoardHeatUnitPlanner from './Template/Widget/Board/HeatUnit/Planner';
import TemplateWidgetBoardTemperatureChart from './Template/Widget/Board/TemperatureChart';
import TemplateWidgetBoardView from './Template/Widget/Board/View';
import TemplateWidgetNotFound from './Template/Widget/NotFound';
import TemplateWidgetBoardAdd from './Template/Widget/Board/Add';
import TemplateWidgetMenu from './Template/Widget/Menu';
import TemplateWidgetNavbar from './Template/Widget/Navbar';
import TemplatePartRow from './Template/Part/Row';
import TemplatePartContainer from './Template/Part/Container';
import Page from './Page';
import Menu from './Menu';

class App {
  constructor(domain, apiDomain) {
    this.domain = domain;
    this.interval = null;

    this.alert = Alert.getInstance();
    this.url = new Url(domain);

    this.translator = Translator.getInstance();
    this.language = 'fr_FR';
    this.notification = NotificationManager.getInstance();

    try {
      this.translator.setLanguage(this.language, () => {
        this.api = new Api(apiDomain);
        this.template = new Template(domain, apiDomain);

        this.userData = null;

        this.action = 'home';

        this.token = null;

        if (Page.isMobile()) {
          Menu.active = false;
        }

        if (this.isLogged()) {
          this.renderApp();
        } else {
          this.renderLogin();
        }

        if ('serviceWorker' in navigator) {
          try {
            const registration = navigator.serviceWorker.register(
              '/service-worker.js',
              {
                scope: '/',
              }
            );

            if (registration.installing) {
              console.log('Service worker installing');
            } else if (registration.waiting) {
              console.log('Service worker installed');
            } else if (registration.active) {
              console.log('Service worker active');
            }
          } catch (error) {
            console.error(`Registration failed with ${error}`);
          }
        }
      });
    } catch (e) {
      this.alert.error(e);
    }
  }

  static run(domain, apiDomain) {
    App.instance = new App(domain, apiDomain);
    return App.instance;
  }

  static getInstance() {
    return App.instance;
  }

  getToken() {
    return this.token;
  }

  setToken(token) {
    localStorage.setItem('token', token);
    this.token = token;

    return this;
  }

  clearToken() {
    localStorage.removeItem('token');
    this.token = null;

    return this;
  }

  isLogged() {
    this.token = localStorage.getItem('token');

    if (this.token === null) {
      return false;
    }

    try {
      const response = this.getApi().send('user/check-token', { token: this.token });

      if (!response.status) {
        this.clearToken();
      }

      return response.status;
    } catch (error) {
      console.error(error);
      // No network
      return true;
    }

  }

  renderLogin() {
    const list = new TemplateElement();

    window.location.hash
    if (window.location.hash.indexOf('#password-recover-token') === 0) {
      list.appendChild(new TemplateWidgetFormPasswordRecover(this, window.location.hash.substring(24)));
    } else {
      list.appendChild(new TemplateWidgetFormLogin(this));
    }

    this.template.render('body', list);

    return this;
  }

  renderLostPassword() {
    const list = new TemplateElement();

    list.appendChild(new TemplateWidgetFormLostPassword(this));

    this.template.render('body', list);

    return this;
  }

  getUserData() {
    return this.userData;
  }

  loadUserData(callback) {
    this.getApi().send(
      'user/get',
      { token: this.token },
      (readyState, status, response) => {
        if (response.status) {
          this.userData = response.data;
          if (typeof callback === 'function') {
            callback();
          }
        } else {
          this.alert.error(this.t(response.reason));
          this.clearToken();
          localStorage.removeItem('token');
          this.renderLogin();
        }
      },
    );
  }

  renderApp(action, params) {
    if (this.userData === null) {
      this.loadUserData(() => this.renderApp());
      return;
    }

    if (typeof action === 'string') {
      this.action = action;
    } else {
      this.action = 'account';

      if (typeof this.userData.boardList[this.userData.defaultBoard] !== 'undefined') {
        this.action = 'board';
        params = {boardId: this.userData.defaultBoard};
      }
    }

    const list = new TemplateElement();

    const content = (new TemplatePartRow()).setTypes(['cols-1', 'cols-md-2']);
    content.appendChild((new TemplateWidgetMenu(this, this.action, params)));

    if (typeof this.lastTemplate !== 'undefined' && typeof this.lastTemplate.destruct === 'function') {
      this.lastTemplate.destruct();
    }

    let template;
    if (this.action === 'account') {
      template = new TemplateWidgetAccount(this);
    } else if (this.action === 'board') {
      const board = this.userData.boardList[params.boardId];
      template = new TemplateWidgetBoardView(this, params.boardId, board);
    } else if (this.action === 'edit-board') {
      const board = this.userData.boardList[params.boardId];
      template = new TemplateWidgetBoardEdit(this, params.boardId, board);
    } else if (this.action === 'planner') {
      const board = this.userData.boardList[params.boardId];
      template = new TemplateWidgetBoardHeatUnitPlanner(
        this,
        params.boardId,
        params.unitKey,
        board,
      );
    } else if (this.action === 'temperature-chart') {
      const board = this.userData.boardList[params.boardId];
      template = new TemplateWidgetBoardTemperatureChart(
        this,
        params.boardId,
        params.sensor,
        board,
      );
    } else if (this.action === 'add-board') {
      template = new TemplateWidgetBoardAdd(this);
    } else {
      template = new TemplateWidgetNotFound();
    }

    this.lastTemplate = template;

    content.appendChild(template);

    clearInterval(this.interval);
    this.interval = setInterval((function(template) {
      if (typeof template.onUserDataLoad === 'function') {
        this.loadUserData(() => {
          if (typeof template.onUserDataLoad === 'function') {
            template.onUserDataLoad();
          }
        });
      }
    }).bind(this, template), 5000);

    list.appendChild((new TemplateWidgetNavbar()));
    list.appendChild(
      new TemplatePartContainer()
        .setType('fluid')
        .appendChild(content),
    );

    this.template.render('body', list);

    if (typeof template.onUserDataLoad === 'function') {
      template.onUserDataLoad();
    }

    Menu.displayMenu();

    if (typeof template.afterDisplay === 'function') {
      template.afterDisplay();
    }

    return this;
  }

  t(str, params, count) {
    return this.translator.get(str, params, count);
  }

  getApi() {
    return this.api;
  }

}

export default App;
