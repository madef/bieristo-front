import Alert from '../../../Alert';
import TemplatePartRow from '../../Part/Row';
import TemplatePartCol from '../../Part/Col';
import TemplatePartTitle from '../../Part/Title';
import TemplatePartDiv from '../../Part/Div';
import TemplatePartInput from '../../Part/Input';
import TemplatePartButton from '../../Part/Button';
import TemplatePartTextarea from '../../Part/Textarea';
import TemplatePartBadge from '../../Part/Badge';
import TemplatePartRawText from '../../Part/RawText';
import Translator from '../../../Translator';
import Confirm from '../../../Confirm';
import TemplatePartSvg from '../../Part/Svg';
import TemplatePartSwitchMode from '../../Part/SwitchMode';

class TemplateWidgetBoardView {
  constructor(app, boardId, board) {
    this.app = app;
    this.boardId = boardId;
    this.board = board;
    this.translator = Translator.getInstance();
    this.alert = Alert.getInstance();
    this.timeout = null;
    this.inputMap = {};
    this.inputList = [];
  }

  render() {
    const string = `{
  "domain": ${JSON.stringify(this.app.getApi().domain)}/,
  "token": ${JSON.stringify(this.app.getToken())},
  "boardId": ${JSON.stringify(this.boardId)},
  "verifySSL": true
}`;

    this.configurationInput = (new TemplatePartTextarea())
      .appendChild(new TemplatePartRawText(string))
      .addClass('d-none');

    const content = (new TemplatePartCol()).setTypes(['lg-10', 'md-9']).setIdentifier('main-content')
      .appendChild((new TemplatePartButton()) // Button delete board
        .addVariation('sm')
        .addVariation('danger')
        .addClass('float-end')
        .addClass('ms-2')
        .setAction(() => this.remove())
        .appendChild(new TemplatePartSvg('M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z')
          .setWidth('30px')
          .setHeight('30px')
          .setColor('white'),
        )
      )
      .appendChild((new TemplatePartButton()) // Button copy config
        .addVariation('sm')
        .addVariation('secondary')
        .addClass('float-end')
        .addClass('ms-2')
        .setAction(() => this.copyConfiguration())
        .appendChild(new TemplatePartSvg([
          'M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z',
          'M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z'
          ])
          .setWidth('30px')
          .setHeight('30px')
          .setColor('white')
        )
      )
      .appendChild((new TemplatePartButton()) // Button edit board configuration
        .addVariation('sm')
        .addVariation('primary')
        .addClass('float-md-end')
        .addClass('mb-2')
        .setAction(() => this.app.renderApp('edit-board', {boardId: this.boardId}))
        .appendChild(new TemplatePartSvg('m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z')
          .setWidth('30px')
          .setHeight('30px')
          .setColor('white')
        )
      )
      .appendChild((new TemplatePartTitle(1, this.board.name)) // Board name
        .addClass('mb-5')
      );

      // Add form for each unit
      let unitList = Object.entries(this.app.getUserData().boardList[this.boardId].unitList);
      for (let i in unitList) {
        let key = unitList[i][0];
        let unit = unitList[i][1];
        for (const form of this.getUnitForm(key, unit)) {
          content.appendChild(form);
        }
      }

    content.appendChild(this.configurationInput)

    return content.render()
  }

  getUnitForm(key, unit) {
    switch (unit.type) {
      case 'HeatUnit':
        return this.getHeatUnitForm(key, unit);
      case 'FermenterUnit':
        return this.getFermenterUnitForm(key, unit);
    }
  }

  getHeatUnitForm(key, unit) {
    this.inputMap[key] = {};

    const target = new TemplatePartInput()
      .setIdentifier(`unit.${key}.target`)
      .setName(`unitList[${key}][target]`)
      .setAttribute('data-key', key)
      .setAttribute('data-attribute', 'target')
      .addClass('form-control')
      .addClass('form-control-lg')
      .setRequired()
      .setType('number')
      .setMin(0)
      .setMax(100)
      .setStep(0.1)
      .setAction('onchange', () => this.updateInput(key));

    this.inputList.push(target);
    this.inputMap[key].target = target;

    if (typeof unit.target !== 'undefined') {
      target.setValue(unit.target);
    }

    const temperature = new TemplatePartInput()
      .setIdentifier(`unit.${key}.temperature`)
      .setName(`unitList[${key}][temperature]`)
      .setAttribute('data-key', key)
      .setAttribute('data-attribute', 'temperature')
      .addClass('form-control')
      .addClass('form-control-lg')
      .setDisabled()
      .setType('number');

    this.inputMap[key].temperature = temperature;

    if (typeof unit.temperature !== 'undefined') {
      temperature.setValue(Math.round(unit.temperature * 100) / 100);
    }

    const power = new TemplatePartInput()
      .setIdentifier(`unit.${key}.power`)
      .setName(`unitList[${key}][power]`)
      .setAttribute('data-key', key)
      .setAttribute('data-attribute', 'power')
      .addClass('form-control')
      .addClass('form-control-lg')
      .setRequired()
      .setType('number')
      .setMin(0)
      .setMax(100)
      .setStep(1)
      .setAction('onchange', () => this.updateInput(key));

    this.inputList.push(power);
    this.inputMap[key].power = power;

    if (typeof unit.power !== 'undefined') {
      power.setValue(unit.power);
    }

    const switchMode = new TemplatePartSwitchMode(key, unit.mode, () => this.updateInput(key), {temperature: target, power: power}, 'heat');
    this.inputList.push(switchMode.getInput());
    this.inputMap[key].mode = switchMode.getInput();
    this.inputMap[key].switchMode = switchMode;

    const state = new TemplatePartButton()
      .addVariation('sm')
      .addVariation('danger')
      .addClass('me-2')
      .addClass('d-none');

    this.inputMap[key].state = state;

    const plannerTime = new TemplatePartBadge()
      .addClass('position-absolute')
      .addClass('top-100')
      .addClass('start-0')
      .addClass('translate-middle')
      .addClass('badge')
      .addClass('rounded-pill')
      .addClass('d-none');
    this.inputMap[key].plannerTime = plannerTime;

    const plannerStep = new TemplatePartBadge()
      .addClass('position-absolute')
      .addClass('top-0')
      .addClass('start-0')
      .addClass('translate-middle')
      .addClass('badge')
      .addClass('rounded-pill')
      .addClass('bg-success')
      .addClass('d-none');
    this.inputMap[key].plannerStep = plannerStep;

    const plannerStatusPlay = new TemplatePartSvg(
      ['M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z'],
    )
      .setWidth('15px')
      .setHeight('15px')
      .setColor('white')
      .setClasses('position-absolute top-100 start-100 translate-middle d-none');
    this.inputMap[key].plannerStatusPlay = plannerStatusPlay;

    const plannerStatusWait = new TemplatePartSvg(
      ['M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z'],
    )
      .setWidth('15px')
      .setHeight('15px')
      .setColor('white')
      .setClasses('position-absolute top-100 start-100 translate-middle d-none');
    this.inputMap[key].plannerStatusWait = plannerStatusWait;

    const plannerStatusPause = new TemplatePartSvg(
      ['M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z'],
    )
      .setWidth('15px')
      .setHeight('15px')
      .setColor('white')
      .setClasses('position-absolute top-100 start-100 translate-middle d-none');
    this.inputMap[key].plannerStatusPause = plannerStatusPause;

    const planner = new TemplatePartButton()
      .addVariation('lg')
      .addVariation('primary')
      .addClass('me-2')
      .addClass('ms-3')
      .addClass('position-relative')
      .setAction(() => this.openPlanner(key))
      .appendChild(
        (new TemplatePartSvg(
          ['M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zm2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527z'],
        )
          .setWidth('30px')
          .setHeight('30px')
          .setColor('white')
        ),
      )
      .appendChild(plannerTime)
      .appendChild(plannerStep)
      .appendChild(plannerStatusPause)
      .appendChild(plannerStatusWait)
      .appendChild(plannerStatusPlay);

    const temperatureChart = new TemplatePartButton()
      .addVariation('lg')
      .addVariation('primary')
      .addClass('me-2')
      .addClass('position-relative')
      .setAction(() => this.openTemperatureChart(key))
      .appendChild(
        (new TemplatePartSvg(
          ['M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z'],
        )
          .setWidth('30px')
          .setHeight('30px')
          .setColor('white')
        ),
      );

    return [
      new TemplatePartRow()
        .setTypes(['cols-1', 'cols-sm-2'])
        .addClass('mb-4')
        .appendChild((new TemplatePartCol())
          .appendChild(new TemplatePartButton(unit.name) // Unit name
            .addClass('mb-2')
            .addVariation('lg')
            .addVariation('primary')
          )
        )
        .appendChild((new TemplatePartCol())
          .addClass('text-end')
          .appendChild(state) // Status
          .appendChild(planner) // Button planner
          .appendChild(temperatureChart) // Button temperature chart
          .appendChild(switchMode) // Mode controller
        ),
      new TemplatePartRow()
        .setTypes(['cols-1', 'cols-lg-3', 'cols-xl-3'])
        .addClass('mb-4')
        .appendChild((new TemplatePartCol()) // Temperature widget
          .appendChild((new TemplatePartDiv())
            .addClass('input-group')
            .addClass('mb-2')
            .appendChild((new TemplatePartButton())
              .addVariation('lg')
              .addVariation('secondary')
              .appendChild((new TemplatePartSvg([
                  'M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z"',
                  'M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z'
                ]))
                .setWidth('30px')
                .setHeight('30px')
                .setColor('white')
              )
            )
            .appendChild(temperature)
          )
        )
        .appendChild((new TemplatePartCol()) // Temperature controller
          .appendChild((new TemplatePartDiv())
            .addClass('input-group')
            .addClass('mb-2')
            .appendChild((new TemplatePartButton())
              .addVariation('lg')
              .addVariation('secondary')
              .appendChild((new TemplatePartSvg([
                  'M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z"',
                  'M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z'
                ]))
                .setWidth('30px')
                .setHeight('30px')
                .setColor('white')
              )
            )
            .appendChild((new TemplatePartButton('-'))
              .addVariation('lg')
              .addVariation('danger')
              .setAction(() => {if (switchMode.getMode() === 'temperature') { this.substract(target, 75) }})
            )
            .appendChild(target)
            .appendChild((new TemplatePartButton('+'))
              .addVariation('lg')
              .addVariation('primary')
              .setAction(() => {if (switchMode.getMode() === 'temperature') { this.add(target, 75) }})
            )
          )
        )
        .appendChild((new TemplatePartCol()) // Power controller
          .appendChild((new TemplatePartDiv())
            .addClass('input-group')
            .addClass('mb-2')
            .appendChild((new TemplatePartButton())
              .addVariation('lg')
              .addVariation('secondary')
              .appendChild((new TemplatePartSvg('M6 0a.5.5 0 0 1 .5.5V3h3V.5a.5.5 0 0 1 1 0V3h1a.5.5 0 0 1 .5.5v3A3.5 3.5 0 0 1 8.5 10c-.002.434-.01.845-.04 1.22-.041.514-.126 1.003-.317 1.424a2.083 2.083 0 0 1-.97 1.028C6.725 13.9 6.169 14 5.5 14c-.998 0-1.61.33-1.974.718A1.922 1.922 0 0 0 3 16H2c0-.616.232-1.367.797-1.968C3.374 13.42 4.261 13 5.5 13c.581 0 .962-.088 1.218-.219.241-.123.4-.3.514-.55.121-.266.193-.621.23-1.09.027-.34.035-.718.037-1.141A3.5 3.5 0 0 1 4 6.5v-3a.5.5 0 0 1 .5-.5h1V.5A.5.5 0 0 1 6 0z'))
                .setWidth('30px')
                .setHeight('30px')
                .setColor('white')
              )
            )
            .appendChild((new TemplatePartButton('-'))
              .addVariation('lg')
              .addVariation('danger')
              .setAction(() => {if (switchMode.getMode() !== 'off') { this.substract(power, 100) }})
            )
            .appendChild(power)
            .appendChild((new TemplatePartButton('+'))
              .addVariation('lg')
              .addVariation('primary')
              .setAction(() => {if (switchMode.getMode() !== 'off') { this.add(power, 100) }})
            )
          )
        )
    ]
  }

  getFermenterUnitForm(key, unit) {
    this.inputMap[key] = {};

    const targetInput = new TemplatePartInput()
      .setIdentifier(`unit.${key}.target`)
      .setName(`unitList[${key}][target]`)
      .setAttribute('data-key', key)
      .setAttribute('data-attribute', 'target')
      .addClass('form-control')
      .addClass('form-control-lg')
      .setRequired()
      .setType('number')
      .setMin(0)
      .setMax(100)
      .setStep(0.1)
      .setAction('onchange', () => this.send());

    this.inputList.push(targetInput);
    this.inputMap[key].target = targetInput;

    if (typeof unit.target !== 'undefined') {
      targetInput.setValue(unit.target);
    }

    const temperature = new TemplatePartInput()
      .setIdentifier(`unit.${key}.temperature`)
      .setName(`unitList[${key}][temperature]`)
      .setAttribute('data-key', key)
      .setAttribute('data-attribute', 'temperature')
      .addClass('form-control')
      .addClass('form-control-lg')
      .setDisabled()
      .setType('number');

    this.inputMap[key].temperature = temperature;

    if (typeof unit.temperature !== 'undefined') {
      temperature.setValue(Math.round(unit.temperature * 100) / 100);
    }

    const coolStateIcon = new TemplatePartSvg([
      'M5 12.5a1.5 1.5 0 1 1-2-1.415V9.5a.5.5 0 0 1 1 0v1.585A1.5 1.5 0 0 1 5 12.5z',
      'M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1zm5 1a.5.5 0 0 1 .5.5v1.293l.646-.647a.5.5 0 0 1 .708.708L9 5.207v1.927l1.669-.963.495-1.85a.5.5 0 1 1 .966.26l-.237.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.884.237a.5.5 0 1 1-.26.966l-1.848-.495L9.5 8l1.669.963 1.849-.495a.5.5 0 1 1 .258.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.237.883a.5.5 0 1 1-.966.258L10.67 9.83 9 8.866v1.927l1.354 1.353a.5.5 0 0 1-.708.708L9 12.207V13.5a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5z',
    ])
      .setWidth('30px')
      .setHeight('30px')
      .setColor('white')
      .setClasses(['d-none']);

    const heatStateIcon = new TemplatePartSvg([
      'M5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585A1.5 1.5 0 0 1 5 12.5z',
      'M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1zm5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zm4.243 1.757a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0zM8 5.5a.5.5 0 0 1 .5-.5 3 3 0 1 1 0 6 .5.5 0 0 1 0-1 2 2 0 0 0 0-4 .5.5 0 0 1-.5-.5zM12.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5zm-1.172 2.828a.5.5 0 0 1 .708 0l.707.708a.5.5 0 0 1-.707.707l-.708-.707a.5.5 0 0 1 0-.708zM8.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5z',
    ])
      .setWidth('30px')
      .setHeight('30px')
      .setColor('white')
      .setClasses(['d-none']);

    const state = new TemplatePartButton()
      .addVariation('lg')
      .addVariation('transparent')
      .addClass('me-2')
      .appendChild(coolStateIcon)
      .appendChild(heatStateIcon);

    this.inputMap[key].state = state;
    this.inputMap[key].heatStateIcon = heatStateIcon;
    this.inputMap[key].coolStateIcon = coolStateIcon;

    const switchMode = new TemplatePartSwitchMode(key, unit.mode, () => this.send(), {temperature: targetInput}, 'fermenter');
    this.inputList.push(switchMode.getInput());
    this.inputMap[key].mode = switchMode.getInput();

    return [
      new TemplatePartRow()
        .setTypes(['cols-2', 'cols-lg-2', 'cols-xl-2'])
        .addClass('mb-4')
        .appendChild((new TemplatePartCol())
          .appendChild(new TemplatePartButton(unit.name)
            .addClass('mb-2')
            .addVariation('lg')
            .addVariation('primary')
          )
        )
        .appendChild((new TemplatePartCol())
          .addClass('text-end')
          .appendChild(state) // Status
          .appendChild(switchMode)
        ),
      new TemplatePartRow()
        .setTypes(['cols-1', 'cols-lg-3', 'cols-xl-3'])
        .addClass('mb-4')
        .appendChild((new TemplatePartCol())
          .appendChild((new TemplatePartDiv())
            .addClass('input-group')
            .addClass('mb-2')
            .appendChild((new TemplatePartButton())
              .addVariation('lg')
              .addVariation('secondary')
              .appendChild((new TemplatePartSvg([
                  'M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z"',
                  'M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z'
                ]))
                .setWidth('30px')
                .setHeight('30px')
                .setColor('white')
              )
            )
            .appendChild(temperature)
          )
        )
        .appendChild((new TemplatePartCol())
          .appendChild((new TemplatePartDiv())
            .addClass('input-group')
            .addClass('mb-2')
            .appendChild((new TemplatePartButton())
              .addVariation('lg')
              .addVariation('secondary')
              .appendChild((new TemplatePartSvg([
                  'M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z"',
                  'M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z'
                ]))
                .setWidth('30px')
                .setHeight('30px')
                .setColor('white')
              )
            )
            .appendChild((new TemplatePartButton('-'))
              .addVariation('lg')
              .addVariation('danger')
              .setAction(() => {if (switchMode.getMode() === 'temperature') { this.substract(targetInput, 5) }})
            )
            .appendChild(targetInput)
            .appendChild((new TemplatePartButton('+'))
              .addVariation('lg')
              .addVariation('primary')
              .setAction(() => {if (switchMode.getMode() === 'temperature') { this.add(targetInput, 5) }})
            )
          )
        )
    ];
  }

  remove() {
    new Confirm(
      'danger',
      this.t("Are you sure you want to remove \"%name%\"", {name: this.board.name}),
      this.t("Remove"),
      this.t("Cancel"),
      (function() {
        this.app.getApi().send(
          'user/board/remove',
          {boardId: this.boardId, token: this.app.getToken()},
          (function(readyState, status, response) {
            if (response.status) {
              this.app.loadUserData(() => {
                this.app.renderApp();
                this.alert.success(this.t('The board has been removed'));
              });
            } else {
              this.alert.error(this.t(response.reason));
              if (response.target) {
                this[response.target].get().focus();
              }
            }
          }).bind(this)
        );
      }).bind(this)
    );
  }

  copyConfiguration() {
    this.configurationInput.get().removeAttribute('class');
    this.configurationInput.get().select();
    document.execCommand('copy');
    this.configurationInput.get().setAttribute('class', 'd-none');
    this.alert.success(this.t('The configuration has been copied in clipboard'));
  }

  substract(input, defaultValue) {
    let value = parseInt(input.get().value);
    if (isNaN(value)) {
      value = defaultValue;
    }

    value--;

    if (value < 0) {
      value = 0;
    }

    input.get().value = value;
    input.get().onchange();
  }

  add(input, defaultValue) {
    let value = parseInt(input.get().value);
    if (isNaN(value)) {
      value = defaultValue;
    }

    value++;

    if (value > 100) {
      value = 100;
    }

    input.get().value = value;
    input.get().onchange();
  }

  openPlanner(unitKey) {
    this.app.renderApp('planner', {boardId: this.boardId, unitKey: unitKey})
  }

  openTemperatureChart(unitKey) {
    this.app.renderApp('temperature-chart', {boardId: this.boardId, sensor: this.board.unitList[unitKey].tempSensor})
  }

  updateInput(unitKey) {
    if (this.app.getUserData().boardList[this.boardId].unitList[unitKey]['planner']['currentStatus'] != 0) {
      this.openPlanner(unitKey);
    } else {
      this.send();
    }
  }

  send() {
    for (let i in this.inputList) {
      const input = this.inputList[i].get();
      input.setAttribute('data-locked', '');
    }

    if (typeof this.timeout === 'number') {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout((function() {
      const formData = new FormData();
      formData.append('boardId', this.boardId);
      formData.append('token', this.app.getToken());

      for (let i in this.inputList) {
          const input = this.inputList[i].get();
          input.setAttribute('data-locked', '');
          formData.append(input.getAttribute('name'), input.value ? input.value : -1);
          this.app.getUserData().boardList[this.boardId].unitList[input.getAttribute('data-key')][input.getAttribute('data-attribute')] = input.value;
      }

      this.app.getApi().send(
        'user/board/set',
        formData,
        (function(readyState, status, response) {
          setTimeout(() => {
            document.querySelectorAll('[data-locked]').forEach(element => element.removeAttribute('data-locked'));
          }, 500);

          if (response.status) {
            this.alert.success(this.t('The board configuration has been updated'));
          } else {
            this.alert.error(this.t(response.reason));
            if (response.target) {
              this[response.target].get().focus();
            }
          }
        }).bind(this)
      );
    }).bind(this), 1000);
  }

  onUserDataLoad() {
    const board = this.app.getUserData().boardList[this.boardId];
    let unitList = Object.entries(board.unitList);

    for (let i in unitList) {
      let key = unitList[i][0];
      let unit = unitList[i][1];

      switch (unit.type) {
        case 'HeatUnit':
          if (typeof unit.temperature !== 'undefined') {
            this.inputMap[key].temperature.get().value = Math.round(unit.temperature * 100) / 100;
          } else {
            this.inputMap[key].temperature.get().value = '';
          }

          if (typeof unit.state !== 'undefined') {
            const state = this.inputMap[key].state.get();
            if (unit.state > 0) {
              state.innerText = `${unit.state} %`;
              state.classList.remove('d-none');
            } else {
              state.classList.add('d-none');
            }
          }

          switch (unit.planner.currentStatus) {
            case 1: // Running
            case 2: // Pause
            case 5: // Wait target
              let step = unit.planner.stepList[unit.planner.currentStep];

              this.inputMap[key].plannerTime.get().classList.remove('d-none');
              this.inputMap[key].plannerTime.get().innerText = parseInt(step.duration - unit.planner.currentTime) + '"';
              this.inputMap[key].plannerStep.get().classList.remove('d-none');
              this.inputMap[key].plannerStep.get().innerText = (parseInt(unit.planner.currentStep) + 1) + '/' + unit.planner.stepList.length;

              switch (unit.planner.currentStatus) {
                case 1: // Running
                  this.inputMap[key].plannerStatusPlay.get().classList.remove('d-none');
                  this.inputMap[key].plannerStatusPause.get().classList.add('d-none');
                  this.inputMap[key].plannerStatusWait.get().classList.add('d-none');
                  this.inputMap[key].plannerTime.get().classList.add('bg-danger');
                  this.inputMap[key].plannerTime.get().classList.remove('bg-secondary');
                  break;
                case 5: // Wait target
                  this.inputMap[key].plannerStatusPlay.get().classList.add('d-none');
                  this.inputMap[key].plannerStatusPause.get().classList.add('d-none');
                  this.inputMap[key].plannerStatusWait.get().classList.remove('d-none');
                  this.inputMap[key].plannerTime.get().classList.remove('bg-danger');
                  this.inputMap[key].plannerTime.get().classList.add('bg-secondary');
                  break;
                case 2: // Pause
                  this.inputMap[key].plannerStatusPlay.get().classList.add('d-none');
                  this.inputMap[key].plannerStatusPause.get().classList.remove('d-none');
                  this.inputMap[key].plannerStatusWait.get().classList.add('d-none');
                  this.inputMap[key].plannerTime.get().classList.remove('bg-danger');
                  this.inputMap[key].plannerTime.get().classList.add('bg-secondary');
                  break;
              }

              break;
            default: // Not running
              this.inputMap[key].plannerTime.get().classList.add('d-none');
              this.inputMap[key].plannerStatusPlay.get().classList.add('d-none');
              this.inputMap[key].plannerStatusPause.get().classList.add('d-none');
              this.inputMap[key].plannerStep.get().classList.add('d-none');
              break;
          }

          if (typeof unit.target !== 'undefined') {
            if (!this.inputMap[key].target.get().hasAttribute('data-locked')) {
              this.inputMap[key].target.get().value = unit.target;
            }
          } else {
            this.inputMap[key].target.value = '';
          }

          if (typeof unit.mode !== 'undefined') {
            this.inputMap[key].switchMode.setMode(unit.mode);
            this.inputMap[key].switchMode.reload();
          }

          if (typeof unit.power !== 'undefined') {
            if (!this.inputMap[key].power.get().hasAttribute('data-locked')) {
              this.inputMap[key].power.get().value = unit.power;
            }
          } else {
            this.inputMap[key].power.get().value = '';
          }
          break;
        case 'FermenterUnit':
          if (typeof unit.temperature !== 'undefined') {
            this.inputMap[key].temperature.get().value = Math.round(unit.temperature * 100) / 100;
          } else {
            this.inputMap[key].temperature.get().value = '';
          }

          if (typeof unit.state !== 'undefined') {
            const state = this.inputMap[key].state.get();
            const coolStateIcon = this.inputMap[key].coolStateIcon.get();
            const heatStateIcon = this.inputMap[key].heatStateIcon.get();

            switch (unit.state) {
              case 1:
                state.classList.remove('d-none');
                state.classList.remove('btn-info');
                state.classList.add('btn-danger');
                heatStateIcon.classList.remove('d-none');
                coolStateIcon.classList.add('d-none');
                break;
              case -1:
                state.classList.remove('d-none');
                state.classList.add('btn-info');
                state.classList.remove('btn-danger');
                heatStateIcon.classList.add('d-none');
                coolStateIcon.classList.remove('d-none');
                break;
              default:
                state.classList.add('d-none');
                heatStateIcon.classList.add('d-none');
                coolStateIcon.classList.add('d-none');
                break;
            }
          }

          if (typeof unit.target !== 'undefined') {
            if (!this.inputMap[key].target.get().hasAttribute('data-locked')) {
              this.inputMap[key].target.get().value = unit.target;
            }
          } else {
            this.inputMap[key].target.get().value = '';
          }

          break;
      }
    }
  }

  t(str, params) {
    return this.translator.get(str, params);
  }

  destruct() {
  }
}
export default TemplateWidgetBoardView;

