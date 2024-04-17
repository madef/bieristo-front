import TemplatePartGrid from '../Part/Grid';
import TemplatePartButton from '../Part/Button';
import TemplatePartCol from '../Part/Col';
import Translator from '../../Translator';
import Menu from '../../Menu';

class TemplateWidgetMenu {
  constructor(app, action, attributes) {
    this.action = action;
    this.attributes = attributes;
    this.app = app;
    this.params = {
      isMenuOpen: false,
    };
    this.translator = Translator.getInstance();
  }

  render() {
    const grid = new TemplatePartGrid();

    const accountButton = (new TemplatePartButton(this.t('My account')))
      .addVariation('success')
      .setAction((function() {
        this.app.renderApp('account');
        Menu.toogleOnMobile();
      }).bind(this));

    if (this.action === 'account') {
      accountButton.addClass('active');
    }
    grid.appendChild(accountButton);

    let boards = Object.entries(this.app.getUserData().boardList);
    for (let i in boards) {
      let boardId = boards[i][0];
      let board = boards[i][1];

      const boardButton = (new TemplatePartButton(board.name))
        .addVariation('primary')
        .setAction((function() {
          this.app.renderApp('board', {boardId: boardId});
          Menu.toogleOnMobile();
        }).bind(this));

      if (this.action === 'board' && this.attributes.boardId === boardId) {
        boardButton.addClass('active');
      }
      grid.appendChild(boardButton);
    }

    const addBoardButton = (new TemplatePartButton(this.t('+ Board')))
      .addVariation('light')
      .setAction((function() {
        this.app.renderApp('add-board')
        Menu.toogleOnMobile();
      }).bind(this));

    if (this.action === 'add-board') {
      addBoardButton.addClass('active');
    }
    grid.appendChild(addBoardButton);

    return (new TemplatePartCol())
      .setTypes(['md-3', 'lg-2', 'xs-12'])
      .setIdentifier('menu')
      .appendChild(grid)
      .render();
  }

  t(str, params) {
    return this.translator.get(str, params);
  }
}

export default TemplateWidgetMenu;
