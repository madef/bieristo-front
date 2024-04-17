import TemplateElement from '../Element';
import TemplatePartButton from './Button';
import TemplatePartSvg from './Svg';
import TemplatePartInput from './Input';

class TemplatePartSwitchMode extends TemplateElement {
  constructor(unitKey, mode, changeCallback, inputs, type, icons) {
    super();

    this.inputs = inputs;
      console.log('riri', inputs, type, mode);
    this.type = type;
    this.changeCallback = changeCallback;

    if (typeof icons === 'undefined') {
        icons = {};
    }

    if (typeof icons.off === 'undefined') {
      icons.off = [
        'M7.5 1v7h1V1h-1z',
        'M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z',
      ];
    }

    if (typeof icons.on === 'undefined') {
      icons.on = [
        'M7.5 1v7h1V1h-1z',
        'M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z',
      ];
    }

    if (typeof icons.temperature === 'undefined') {
      icons.temperature = [
        'M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z"',
        'M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z',
      ];
    }

    if (typeof icons.power === 'undefined') {
      icons.power = 'M6 0a.5.5 0 0 1 .5.5V3h3V.5a.5.5 0 0 1 1 0V3h1a.5.5 0 0 1 .5.5v3A3.5 3.5 0 0 1 8.5 10c-.002.434-.01.845-.04 1.22-.041.514-.126 1.003-.317 1.424a2.083 2.083 0 0 1-.97 1.028C6.725 13.9 6.169 14 5.5 14c-.998 0-1.61.33-1.974.718A1.922 1.922 0 0 0 3 16H2c0-.616.232-1.367.797-1.968C3.374 13.42 4.261 13 5.5 13c.581 0 .962-.088 1.218-.219.241-.123.4-.3.514-.55.121-.266.193-.621.23-1.09.027-.34.035-.718.037-1.141A3.5 3.5 0 0 1 4 6.5v-3a.5.5 0 0 1 .5-.5h1V.5A.5.5 0 0 1 6 0z';
    }

    if (typeof icons.cool === 'undefined') {
      icons.cool = [
        'M5 12.5a1.5 1.5 0 1 1-2-1.415V9.5a.5.5 0 0 1 1 0v1.585A1.5 1.5 0 0 1 5 12.5z',
        'M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1zm5 1a.5.5 0 0 1 .5.5v1.293l.646-.647a.5.5 0 0 1 .708.708L9 5.207v1.927l1.669-.963.495-1.85a.5.5 0 1 1 .966.26l-.237.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.884.237a.5.5 0 1 1-.26.966l-1.848-.495L9.5 8l1.669.963 1.849-.495a.5.5 0 1 1 .258.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.237.883a.5.5 0 1 1-.966.258L10.67 9.83 9 8.866v1.927l1.354 1.353a.5.5 0 0 1-.708.708L9 12.207V13.5a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5z',
      ];
    }

    if (typeof icons.heat === 'undefined') {
      icons.heat = [
        'M5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585A1.5 1.5 0 0 1 5 12.5z',
        'M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1zm5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zm4.243 1.757a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0zM8 5.5a.5.5 0 0 1 .5-.5 3 3 0 1 1 0 6 .5.5 0 0 1 0-1 2 2 0 0 0 0-4 .5.5 0 0 1-.5-.5zM12.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5zm-1.172 2.828a.5.5 0 0 1 .708 0l.707.708a.5.5 0 0 1-.707.707l-.708-.707a.5.5 0 0 1 0-.708zM8.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5z',
      ];
    }

    this.iconOff = new TemplatePartSvg(icons.off)
      .setWidth('30px')
      .setHeight('30px')
      .setColor('white');

    this.iconOn = new TemplatePartSvg(icons.on)
      .setWidth('30px')
      .setHeight('30px')
      .setColor('white');

    this.iconTemperature = new TemplatePartSvg(icons.temperature)
      .setWidth('30px')
      .setHeight('30px')
      .setColor('white');

    this.iconPower = new TemplatePartSvg(icons.power)
      .setWidth('30px')
      .setHeight('30px')
      .setColor('white');

    this.iconCool = new TemplatePartSvg(icons.cool)
      .setWidth('30px')
      .setHeight('30px')
      .setColor('white');

    this.iconHeat = new TemplatePartSvg(icons.heat)
      .setWidth('30px')
      .setHeight('30px')
      .setColor('white');

    this.button = new TemplatePartButton()
      .addVariation('lg')
      .addVariation('danger')
      .appendChild(this.iconOff)

    switch (this.type) {
      case 'heat':
        this.button.appendChild(this.iconPower);
        this.button.appendChild(this.iconTemperature);
        break;
      case 'fermenter':
        this.button.appendChild(this.iconCool);
        this.button.appendChild(this.iconHeat);
        this.button.appendChild(this.iconTemperature);
        break;
      default:
        this.button.appendChild(this.iconOn);
    }

    this.input = new TemplatePartInput()
      .setIdentifier(`unit.${unitKey}.mode`)
      .setName(`unitList[${unitKey}][mode]`)
      .setAttribute('data-key', unitKey)
      .setAttribute('data-attribute', 'mode')
      .setType('hidden');

    this.button.setAction(() => this.switchMode());

    this.appendChild(this.input);
    this.appendChild(this.button);

    this.setMode(mode);
  }

  switchMode() {
    switch (this.type) {
      case 'heat':
        if (this.mode === 'off') {
          this.setMode('temperature');
          this.inputs.temperature.get().disabled = false;
          this.inputs.power.get().disabled = false;
          this.inputs.temperature.get().value = 65;
          this.inputs.power.get().value = 100;
        } else if (this.mode === 'temperature') {
          this.setMode('power');
          this.inputs.temperature.get().value = '';
          this.inputs.power.get().disabled = false;
          this.inputs.power.get().value = 100;
          this.inputs.temperature.get().disabled = true;
        } else if (this.mode === 'power') {
          this.setMode('off');
          this.inputs.temperature.get().value = '';
          this.inputs.temperature.get().disabled = true;
          this.inputs.power.get().value = '';
          this.inputs.power.get().disabled = true;
        }
        break;
      case 'fermenter':
        if (this.mode === 'off') {
          this.setMode('temperature');
          this.inputs.temperature.get().value = 18;
        } else if (this.mode === 'temperature') {
          this.setMode('cool');
          this.inputs.temperature.get().value = '';
        } else if (this.mode === 'cool') {
          this.setMode('heat');
          this.inputs.temperature.get().value = '';
        } else if (this.mode === 'heat') {
          this.setMode('off');
          this.inputs.temperature.get().value = '';
        }
        break;
      default:
        if (this.mode === 'off') {
          this.setMode('on');
        } else {
          this.setMode('off');
        }
    }

    this.reload();
    this.changeCallback();
  }

  reload() {
    this.button.reload();
    this.input.reload();
  }

  setMode(mode) {
    this.mode = mode;
    this.input.setValue(mode);

    switch (mode) {
      case 'off':
        this.iconOff.setClasses(['']);
        this.iconTemperature.setClasses(['d-none']);
        switch (this.type) {
          case 'heat':
            this.inputs.temperature.setDisabled();
            this.iconPower.setClasses(['d-none']);
            this.inputs.power.setDisabled();
            break;
          case 'fermenter':
            this.inputs.temperature.setDisabled();
            this.iconCool.setClasses(['d-none']);
            this.iconHeat.setClasses(['d-none']);
            break;
          default:
            this.iconOn.setClasses(['d-none']);
        }

        this.button.setClasses(['btn'])
          .addClass('me-2')
          .addVariation('lg')
          .addVariation('secondary');
        break;
      case 'on':
        this.iconOn.setClasses(['']);
        this.iconOff.setClasses(['d-none']);
        this.iconTemperature.setClasses(['d-none']);

        this.button.setClasses(['btn'])
          .addClass('me-2')
          .addVariation('lg')
          .addVariation('success');
        break;
      case 'temperature':
        this.iconOff.setClasses(['d-none']);
        this.iconTemperature.setClasses(['']);
        switch (this.type) {
          case 'heat':
            this.iconPower.setClasses(['d-none']);
            break;
          case 'fermenter':
            this.iconCool.setClasses(['d-none']);
            this.iconHeat.setClasses(['d-none']);
            break;
        }
        this.button.setClasses(['btn'])
          .addClass('me-2')
          .addVariation('lg')
          .addVariation('success');
        break;
      case 'power':
        this.iconOff.setClasses(['d-none']);
        this.iconTemperature.setClasses(['d-none']);
        this.iconPower.setClasses(['']);
        this.inputs.temperature.setDisabled();
        this.button.setClasses(['btn'])
          .addClass('me-2')
          .addVariation('lg')
          .addVariation('info');
        break;
      case 'cool':
        this.iconOff.setClasses(['d-none']);
        this.iconTemperature.setClasses(['d-none']);
        this.iconCool.setClasses(['']);
        this.iconHeat.setClasses(['d-none']);
        this.button.setClasses(['btn'])
          .addClass('me-2')
          .addVariation('lg')
          .addVariation('info');
        break;
      case 'heat':
        this.iconOff.setClasses(['d-none']);
        this.iconTemperature.setClasses(['d-none']);
        this.iconCool.setClasses(['d-none']);
        this.iconHeat.setClasses(['']);
        this.button.setClasses(['btn'])
          .addClass('me-2')
          .addVariation('lg')
          .addVariation('danger');
        break;
    }
  }

  getMode() {
    return this.mode;
  }

  getInput() {
    return this.input;
  }
}

export default TemplatePartSwitchMode;
