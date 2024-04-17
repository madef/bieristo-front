import Alert from '../../../Alert';
import TemplatePartCol from '../../Part/Col';
import TemplatePartRow from '../../Part/Row';
import TemplatePartContainer from '../../Part/Container';
import TemplatePartTitle from '../../Part/Title';
import TemplatePartForm from '../../Part/Form';
import TemplatePartInput from '../../Part/Input';
import TemplatePartButton from '../../Part/Button';
import TemplatePartDiv from '../../Part/Div';
import TemplatePartLabel from '../../Part/Label';
import Translator from '../../../Translator';
import TemplateElement from '../../Element';
import TemplatePartSvg from '../../Part/Svg';

class TemplateWidgetBoardEdit {
  constructor(app, boardId, board) {
    this.app = app;
    this.boardId = boardId;
    this.board = board;
    this.translator = Translator.getInstance();
    this.alert = Alert.getInstance();
  }

  render() {
    this.newBoardId = new TemplatePartInput()
      .setIdentifier('newBoardId')
      .setName('newBoardId')
      .addClass('form-control')
      .setPlaceholder(this.t('Token'))
      .setAutofocus()
      .setRequired()
      .setType('text')
      .setValue(this.boardId)
      .setId('newBoardId');

    this.name = new TemplatePartInput()
      .setIdentifier('name')
      .setName('name')
      .addClass('form-control')
      .setPlaceholder(this.t('Name'))
      .setRequired()
      .setType('text')
      .setValue(this.board.name)
      .setId('name');

    this.subform = new TemplatePartRow().addClass('g-3');

    this.form = (new TemplatePartForm())
      .setAttribute('enctype', 'multipart/form-data')
      .addClass('row')
      .addClass('g-3')
      .appendChild(new TemplatePartDiv()
        .addClass('form-floating')
        .addClass('mb-3')
        .addClass('col-md-6')
        .appendChild(this.newBoardId)
        .appendChild((new TemplatePartLabel(this.t('Board id')))
          .setFor('newBoardId')
          .addClass('text-dark')
        )
      )
      .appendChild((new TemplatePartDiv())
        .addClass('form-floating')
        .addClass('mb-3')
        .addClass('col-md-6')
        .appendChild(this.name)
        .appendChild((new TemplatePartLabel(this.t('Name')))
          .setFor('name')
          .addClass('text-dark')
        )
      )
      .appendChild(new TemplatePartContainer()
        .appendChild(this.subform)
      )
      .appendChild(new TemplatePartContainer()
        .appendChild(new TemplatePartRow()
          .addClass('g-3')
          .appendChild(new TemplatePartCol()
            .addClass('d-grid')
            .appendChild(new TemplatePartButton(this.t('Add heat unit'))
              .addVariation('light')
              .addVariation('lg')
              .setType('button')
              .setAction(() => this.addHeatUnit())
            )
          )
          .appendChild(new TemplatePartCol()
            .addClass('d-grid')
            .appendChild((new TemplatePartButton(this.t('Add fermenter unit')))
              .addVariation('light')
              .addVariation('lg')
              .setType('button')
              .addClass('col')
              .setAction(() => this.addFermenterUnit())
            )
          )
        )
      )
      .appendChild((new TemplatePartDiv())
        .addClass('d-grid')
        .addClass('gap-2')
        .addClass('col-12')
        .addClass('mb-3')
        .appendChild((new TemplatePartButton(this.t('Update')))
          .addVariation('primary')
          .addVariation('lg')
          .setType('submit')
        )
      )
      .setAction(() => this.save());

    return (new TemplatePartCol()).setTypes(['lg-10', 'md-9']).setIdentifier('main-content')
      .appendChild((new TemplatePartTitle(1, this.t('Edit the board "%name%"', {name: this.board.name})))
        .addClass('mb-5')
      )
      .appendChild(this.form)
      .render();
  }

  afterDisplay() {
    this.renderFormUnit();
  }


  renderFormUnit() {
      this.subform.get().innerHTML = '';

      let form = new TemplateElement;
      for (let key in this.board.unitList) {
          let unit = this.board.unitList[key];
          switch (unit.type) {
            case 'HeatUnit':
              this.addHeatUnitForm(form, key, unit);
              break;
            case 'FermenterUnit':
              this.addFermenterUnitForm(form, key, unit);
              break;
          }
      }

      this.subform.get().innerHTML = form.render();
      document.querySelectorAll('.js-remove').forEach((elt) => {
        elt.onchange = () => this.remove(elt.getAttribute('data-key'));
      });
  }

  addHeatUnit() {
    const key = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 20);

    this.save(() => {
      this.board.unitList[key] = {
        type: 'HeatUnit'
      };

      this.renderFormUnit();
    });

    return false;
  }

  addFermenterUnit() {
    const key = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 20);

    this.save(() => {
      this.board.unitList[key] = {
        type: 'FermenterUnit'
      };

      this.renderFormUnit();
    });

    return false;
  }

  addHeatUnitForm(form, key, unit) {
    let name = new TemplatePartInput()
      .setIdentifier('unit.'+key+'.name')
      .setId('unit.'+key+'.name')
      .setName('unitList['+key+'][name]')
      .addClass('form-control')
      .setPlaceholder(this.t('Name'))
      .setRequired()
      .setType('text');

    if (typeof unit.name !== 'undefined') {
      name.setValue(unit.name);
    }

    let resistor = new TemplatePartInput()
      .setIdentifier('unit.'+key+'.resistor')
      .setId('unit.'+key+'.resistor')
      .setName('unitList['+key+'][resistor]')
      .addClass('form-control')
      .setPlaceholder(this.t('Resistor GPIO'))
      .setType('number')
      .setMin(0)
      .setMax(50)
      .setStep(1);

    if (typeof unit.resistor !== 'undefined') {
      resistor.setValue(unit.resistor);
    }

    let tempSensor = new TemplatePartInput()
      .setIdentifier('unit.'+key+'.tempSensor')
      .setId('unit.'+key+'.tempSensor')
      .setName('unitList['+key+'][tempSensor]')
      .addClass('form-control')
      .setPlaceholder(this.t('Temperature sensor GPIO'))
      .setType('number')
      .setMin(0)
      .setMax(50)
      .setStep(0.1);

    if (typeof unit.tempSensor !== 'undefined') {
      tempSensor.setValue(unit.tempSensor);
    }

    let t1 = new TemplatePartInput()
      .setIdentifier('unit.'+key+'.t1')
      .setId('unit.'+key+'.t1')
      .setName('unitList['+key+'][t1]')
      .addClass('form-control')
      .setPlaceholder(this.t('Temperature delta for power adaptation'))
      .setType('number')
      .setMin(0)
      .setMax(20)
      .setStep(1);

    if (typeof unit.t1 !== 'undefined') {
      t1.setValue(unit.t1);
    }

    let t2 = new TemplatePartInput()
      .setIdentifier('unit.'+key+'.t2')
      .setId('unit.'+key+'.t2')
      .setName('unitList['+key+'][t2]')
      .addClass('form-control')
      .setPlaceholder(this.t('Temperature delta before cut-off'))
      .setType('number')
      .setMin(0)
      .setMax(5)
      .setStep(0.1);

    if (typeof unit.t2 !== 'undefined') {
      t2.setValue(unit.t2);
    }

    let title = this.t('Heat unit');
    if (typeof unit.name !== 'undefined') {
      title = unit.name;
    }

    form
      .appendChild(new TemplatePartInput()
        .setIdentifier('unit.'+key+'.type')
        .setId('unit.'+key+'.type')
        .setName('unitList['+key+'][type]')
        .setType('hidden')
        .setValue('HeatUnit')
      )
      .appendChild((new TemplatePartTitle(2, title))
        .addClass('mb-2')
        .addClass('mt-2')
        .addClass('col-12')
        .appendChild(new TemplatePartInput()
          .setIdentifier('unit.'+key+'.deleted')
          .setId('unit.'+key+'.deleted')
          .setName('unitList['+key+'][deleted]')
          .setType('checkbox')
          .addClass('btn-check')
          .addClass('js-remove')
          .setAutocomplete('off')
          .setAttribute('data-key', key)
        )
        .appendChild(new TemplatePartLabel()
          .addClass('float-end')
          .addClass('ms-2')
          .addClass('btn')
          .addClass('btn-danger')
          .addClass('btn-sm')
          .setFor('unit.'+key+'.deleted')
          .appendChild(new TemplatePartSvg('M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z')
            .setWidth('30px')
            .setHeight('30px')
            .setColor('white')
          )
        )
      )
      .appendChild((new TemplatePartDiv())
        .addClass('js-unit-'+key)
        .addClass('form-floating')
        .addClass('mb-3')
        .addClass('col-md-6')
        .appendChild(name)
        .appendChild((new TemplatePartLabel(this.t('Name')))
          .setFor('unit.'+key+'.name')
          .addClass('text-dark')
        )
      )
      .appendChild((new TemplatePartDiv())
        .addClass('js-unit-'+key)
        .addClass('form-floating')
        .addClass('mb-3')
        .addClass('col-md-6')
        .appendChild(resistor)
        .appendChild((new TemplatePartLabel(this.t('Resistor GPIO')))
          .setFor('unit.'+key+'.resistor')
          .addClass('text-dark')
        )
      )
      .appendChild((new TemplatePartDiv())
        .addClass('js-unit-'+key)
        .addClass('form-floating')
        .addClass('mb-3')
        .addClass('col-md-6')
        .appendChild(tempSensor)
        .appendChild((new TemplatePartLabel(this.t('Temperature sensor GPIO')))
          .setFor('unit.'+key+'.tempSensor')
          .addClass('text-dark')
        )
      )
      .appendChild((new TemplatePartDiv())
        .addClass('js-unit-'+key)
        .addClass('form-floating')
        .addClass('mb-3')
        .addClass('col-md-6')
        .appendChild(t1)
        .appendChild((new TemplatePartLabel(this.t('Temperature delta for power adaptation')))
          .setFor('unit.'+key+'.t1')
          .addClass('text-dark')
        )
      )
      .appendChild((new TemplatePartDiv())
        .addClass('js-unit-'+key)
        .addClass('form-floating')
        .addClass('mb-3')
        .addClass('col-md-6')
        .appendChild(t2)
        .appendChild((new TemplatePartLabel(this.t('Temperature delta before cut-off')))
          .setFor('unit.'+key+'.t2')
          .addClass('text-dark')
        )
      );
  }

  addFermenterUnitForm(form, key, unit) {
    let name = new TemplatePartInput()
      .setIdentifier('unit.'+key+'.name')
      .setId('unit.'+key+'.name')
      .setName('unitList['+key+'][name]')
      .addClass('form-control')
      .setPlaceholder(this.t('Name'))
      .setRequired()
      .setType('text');

    if (typeof unit.name !== 'undefined') {
      name.setValue(unit.name);
    }

    let cool = new TemplatePartInput()
      .setIdentifier('unit.'+key+'.cool')
      .setId('unit.'+key+'.cool')
      .setName('unitList['+key+'][cool]')
      .addClass('form-control')
      .setPlaceholder(this.t('Cooling GPIO'))
      .setType('number')
      .setMin(0)
      .setMax(50)
      .setStep(1);

    if (typeof unit.cool !== 'undefined') {
      cool.setValue(unit.cool);
    }

    let heat = new TemplatePartInput()
      .setIdentifier('unit.'+key+'.heat')
      .setId('unit.'+key+'.heat')
      .setName('unitList['+key+'][heat]')
      .addClass('form-control')
      .setPlaceholder(this.t('Heating GPIO'))
      .setType('number')
      .setMin(0)
      .setMax(50)
      .setStep(1);

    if (typeof unit.heat !== 'undefined') {
      heat.setValue(unit.heat);
    }

    let tempSensor = new TemplatePartInput()
      .setIdentifier('unit.'+key+'.tempSensor')
      .setId('unit.'+key+'.tempSensor')
      .setName('unitList['+key+'][tempSensor]')
      .addClass('form-control')
      .setPlaceholder(this.t('Temperature sensor GPIO'))
      .setType('number')
      .setMin(0)
      .setMax(50)
      .setStep(0.1);

    if (typeof unit.tempSensor !== 'undefined') {
      tempSensor.setValue(unit.tempSensor);
    }

    let t1 = new TemplatePartInput()
      .setIdentifier('unit.'+key+'.t1')
      .setId('unit.'+key+'.t1')
      .setName('unitList['+key+'][t1]')
      .addClass('form-control')
      .setPlaceholder(this.t('Temperature delta to activate cooling'))
      .setType('number')
      .setMin(0)
      .setMax(20)
      .setStep(1);

    if (typeof unit.t1 !== 'undefined') {
      t1.setValue(unit.t1);
    }

    let t2 = new TemplatePartInput()
      .setIdentifier('unit.'+key+'.t2')
      .setId('unit.'+key+'.t2')
      .setName('unitList['+key+'][t2]')
      .addClass('form-control')
      .setPlaceholder(this.t('Temperature delta to activate heating'))
      .setType('number')
      .setMin(0)
      .setMax(5)
      .setStep(0.1);

    if (typeof unit.t2 !== 'undefined') {
      t2.setValue(unit.t2);
    }

    let title = this.t('Fermenter unit');
    if (typeof unit.name !== 'undefined') {
      title = unit.name;
    }

    form
      .appendChild(new TemplatePartInput()
        .setIdentifier('unit.'+key+'.type')
        .setId('unit.'+key+'.type')
        .setName('unitList['+key+'][type]')
        .setType('hidden')
        .setValue('FermenterUnit')
      )
      .appendChild((new TemplatePartTitle(2, title))
        .addClass('mb-2')
        .addClass('mt-2')
        .addClass('col-12')
        .appendChild(new TemplatePartInput()
          .setIdentifier('unit.'+key+'.deleted')
          .setId('unit.'+key+'.deleted')
          .setName('unitList['+key+'][deleted]')
          .setType('checkbox')
          .addClass('btn-check')
          .addClass('js-remove')
          .setAutocomplete('off')
          .setAttribute('data-key', key)
        )
        .appendChild(new TemplatePartLabel()
          .addClass('float-end')
          .addClass('ms-2')
          .addClass('btn')
          .addClass('btn-danger')
          .addClass('btn-sm')
          .setFor('unit.'+key+'.deleted')
          .appendChild(new TemplatePartSvg('M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z')
            .setWidth('30px')
            .setHeight('30px')
            .setColor('white')
          )
        )
      )
      .appendChild((new TemplatePartDiv())
        .addClass('js-unit-'+key)
        .addClass('form-floating')
        .addClass('mb-3')
        .addClass('col-md-6')
        .appendChild(name)
        .appendChild((new TemplatePartLabel(this.t('Name')))
          .setFor('unit.'+key+'.name')
          .addClass('text-dark')
        )
      )
      .appendChild((new TemplatePartDiv())
        .addClass('js-unit-'+key)
        .addClass('form-floating')
        .addClass('mb-3')
        .addClass('col-md-6')
        .appendChild(cool)
        .appendChild((new TemplatePartLabel(this.t('Cooling GPIO')))
          .setFor('unit.'+key+'.cool')
          .addClass('text-dark')
        )
      )
      .appendChild((new TemplatePartDiv())
        .addClass('js-unit-'+key)
        .addClass('form-floating')
        .addClass('mb-3')
        .addClass('col-md-6')
        .appendChild(heat)
        .appendChild((new TemplatePartLabel(this.t('Heating GPIO')))
          .setFor('unit.'+key+'.heat')
          .addClass('text-dark')
        )
      )
      .appendChild((new TemplatePartDiv())
        .addClass('js-unit-'+key)
        .addClass('form-floating')
        .addClass('mb-3')
        .addClass('col-md-6')
        .appendChild(tempSensor)
        .appendChild((new TemplatePartLabel(this.t('Temperature sensor GPIO')))
          .setFor('unit.'+key+'.tempSensor')
          .addClass('text-dark')
        )
      )
      .appendChild((new TemplatePartDiv())
        .addClass('js-unit-'+key)
        .addClass('form-floating')
        .addClass('mb-3')
        .addClass('col-md-6')
        .appendChild(t1)
        .appendChild((new TemplatePartLabel(this.t('Temperature delta to activate cooling')))
          .setFor('unit.'+key+'.t1')
          .addClass('text-dark')
        )
      )
      .appendChild((new TemplatePartDiv())
        .addClass('js-unit-'+key)
        .addClass('form-floating')
        .addClass('mb-3')
        .addClass('col-md-6')
        .appendChild(t2)
        .appendChild((new TemplatePartLabel(this.t('Temperature delta to activate heating')))
          .setFor('unit.'+key+'.t2')
          .addClass('text-dark')
        )
      );
  }

  remove(identifier) {
    if (document.getElementById('unit.'+identifier+'.deleted').checked) {
      document.querySelector('[for="unit.'+identifier+'.deleted"]').classList.remove('btn-danger');
      document.querySelector('[for="unit.'+identifier+'.deleted"]').classList.add('btn-secondary');
      document.querySelectorAll('.js-unit-'+identifier).forEach((elt) => elt.classList.add('d-none'));
    } else {
      document.querySelector('[for="unit.'+identifier+'.deleted"]').classList.add('btn-danger');
      document.querySelector('[for="unit.'+identifier+'.deleted"]').classList.remove('btn-secondary');
      document.querySelectorAll('.js-unit-'+identifier).forEach((elt) => elt.classList.remove('d-none'));
    }

    return false;
  }

  t(str, params) {
    return this.translator.get(str, params);
  }

  save(callback) {
    var formData = new FormData(this.form.get());
    formData.append('boardId', this.boardId);
    formData.append('token', this.app.getToken());

    this.app.getApi().send(
      'user/board/set',
      formData,
      (function(readyState, status, response) {
        if (response.status) {
          this.app.loadUserData(() => {
            this.reloadData();
            if (typeof callback === 'function') {
              callback();
            } else {
              this.app.renderApp('board', {boardId: this.newBoardId.get().value});
            }
            this.alert.success(this.t('The board configuration has been updated'));
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

  reloadData() {
    const boardList = this.app.getUserData().boardList;

    if (typeof boardList[this.newBoardId.get().value] !== null) {
      this.boardId = this.newBoardId.get().value;
    }
    this.board = this.app.getUserData().boardList[this.boardId];
  }
}
export default TemplateWidgetBoardEdit;
