import Alert from '../../../../Alert';
import TemplatePartCol from '../../../Part/Col';
import TemplatePartRow from '../../../Part/Row';
import TemplatePartHr from '../../../Part/Hr';
import TemplatePartContainer from '../../../Part/Container';
import TemplatePartTitle from '../../../Part/Title';
import TemplatePartForm from '../../../Part/Form';
import TemplatePartInput from '../../../Part/Input';
import TemplatePartDiv from '../../../Part/Div';
import TemplatePartButton from '../../../Part/Button';
import Translator from '../../../../Translator';
import TemplatePartSvg from '../../../Part/Svg';
import Confirm from '../../../../Confirm';
import TemplatePartSwitchMode from '../../../Part/SwitchMode';
import TemplatePartSpinnerOverlay from '../../../Part/SpinnerOverlay';
import Listener from '../../../../Listener';

class TemplateWidgetBoardHeatUnitPlanner {
  constructor(app, boardId, unitKey, board) {
    this.app = app;
    this.boardId = boardId;
    this.unitKey = unitKey;
    this.board = board;
    this.unit = board.unitList[unitKey];
    this.translator = Translator.getInstance();
    this.alert = Alert.getInstance();
    this.stepList = [];

    for (let stepNumber = 0; stepNumber < this.unit.planner.stepList.length; stepNumber += 1) {
      const step = this.unit.planner.stepList[stepNumber];
      this.stepList.push(
        {
          action: ['off', 'temperature', 'power'][step.action],
          target: step.target,
          power: step.power,
          duration: Number(step.duration),
          onFinishGoNext: Number(step.onFinishGoNext),
        },
      );
    }
    this.refreshStartEndStep();
  }

  render() {
    this.formContainer = new TemplatePartContainer();

    this.form = (new TemplatePartForm())
      .setAttribute('enctype', 'multipart/form-data')
      .addClass('row')
      .addClass('g-3')
      .appendChild(this.formContainer)
      .setAction(() => this.applyAndRun());

    this.playButton = new TemplatePartButton()
      .addVariation('lg')
      .addVariation('info')
      .addClass('me-2')
      .setAction(() => this.applyAndRun())
      .appendChild(
        new TemplatePartSvg(
          ['M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z'],
        )
          .setWidth('30px')
          .setHeight('30px')
          .setColor('white'),
      );

    this.pauseButton = new TemplatePartButton()
      .addVariation('lg')
      .addVariation('warning')
      .addClass('me-2')
      .setAction(() => this.pause())
      .appendChild(
        new TemplatePartSvg(
          ['M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z'],
        )
          .setWidth('30px')
          .setHeight('30px')
          .setColor('white'),
      );

    this.stopButton = new TemplatePartButton()
      .addVariation('lg')
      .addVariation('danger')
      .addClass('me-2')
      .setAction(() => this.stop())
      .appendChild(
        new TemplatePartSvg(
          ['M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5h-3z'],
        )
          .setWidth('30px')
          .setHeight('30px')
          .setColor('white'),
      );

    switch (this.unit.planner.currentStatus) {
      case 1:
      case 5:
        this.playButton.addClass('disabled');
        break;
      case 2:
        this.pauseButton.addClass('disabled');
        break;
      default:
        this.pauseButton.addClass('disabled');
        this.stopButton.addClass('disabled');
        break;
    }

    this.formContainer
      .appendChild(new TemplatePartRow()
        .addClass('g-3')
        .addClass('mb-3')
        .appendChild(
          new TemplatePartCol()
            .addClass('d-grid')
            .appendChild(this.stopButton),
        )
        .appendChild(
          new TemplatePartCol()
            .addClass('d-grid')
            .appendChild(this.pauseButton),
        )
        .appendChild(
          new TemplatePartCol()
            .addClass('d-grid')
            .appendChild(this.playButton),
        ),
      );

    this.subformContainer = new TemplatePartDiv();

    this.formContainer.appendChild(this.subformContainer);

    this.formContainer
      .appendChild(new TemplatePartRow()
        .addClass('g-3')
        .addClass('mb-3')
        .appendChild( // Button Cancel
          new TemplatePartCol()
            .addClass('d-grid')
            .appendChild(new TemplatePartButton()
              .addVariation('danger')
              .addVariation('lg')
              .setType('button')
              .setAction(() => this.cancel())
              .appendChild(
                new TemplatePartSvg(
                  ['M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z'],
                )
                  .setWidth('30px')
                  .setHeight('30px')
                  .setColor('white'),
              ),
            )
        )
        .appendChild( // Button Remove
          new TemplatePartCol()
            .addClass('d-grid')
            .appendChild(new TemplatePartButton()
              .addVariation('danger')
              .addVariation('lg')
              .setType('button')
              .setAction(() => this.remove())
              .appendChild(
                new TemplatePartSvg(
                  ['M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z'],
                )
                  .setWidth('30px')
                  .setHeight('30px')
                  .setColor('white'),
              ),
            )
        )
        .appendChild( // Button Add
          new TemplatePartCol()
            .addClass('d-grid')
            .appendChild(new TemplatePartButton()
              .addVariation('success')
              .addVariation('lg')
              .setType('button')
              .setAction(() => this.addNewStep())
              .appendChild(
                new TemplatePartSvg(
                  ['M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z'],
                )
                  .setWidth('30px')
                  .setHeight('30px')
                  .setColor('white'),
              ),
            )
        )
        .appendChild( // Button Save
          new TemplatePartCol()
            .addClass('d-grid')
            .appendChild(new TemplatePartButton()
              .addVariation('primary')
              .addVariation('lg')
              .setType('button')
              .setAction(() => this.apply())
              .appendChild(
                new TemplatePartSvg(
                  ['M8.5 1.5A1.5 1.5 0 0 1 10 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6c-.314.418-.5.937-.5 1.5v6h-2a.5.5 0 0 0-.354.854l2.5 2.5a.5.5 0 0 0 .708 0l2.5-2.5A.5.5 0 0 0 10.5 7.5h-2v-6z'],

                )
                  .setWidth('30px')
                  .setHeight('30px')
                  .setColor('white'),
              ),
            )
        )
      );

    return (new TemplatePartCol()).setTypes(['lg-10', 'md-9']).setIdentifier('main-content')
      .appendChild((new TemplatePartTitle(1, this.t('Planner of "%unitName%" (%boardName%)', {boardName: this.board.name, unitName: this.unit.name})))
        .addClass('mb-5')
      )
      .appendChild(this.form)
      .render();
  }

  afterDisplay() {
    this.renderStepForm();
  }

  remove() {
    new Confirm(
      'danger',
      this.t("Are you sure you want to remove the planner?"),
      this.t("Remove"),
      this.t("Cancel"),
      () => {
        this.askStatus = 3;
        this.stepList = [];
        this.apply();
      }
    );
  }

  cancel() {
    this.app.renderApp('board', {boardId: this.boardId});
  }

  pause() {
    this.askStatus = 2;
    this.apply();
  }

  goToStep(stepNumber) {
    if (this.unit.planner.currentStep == stepNumber) {
      return;
    }

    new Confirm(
      'danger',
      this.t("Are you sure you want to start this step?"),
      this.t("Yes"),
      this.t("Cancel"),
      () => {
        this.askGoTo = stepNumber;
        this.apply();
      }
    );
  }

  stop() {
    new Confirm(
      'danger',
      this.t("Are you sure you want to stop the planner?"),
      this.t("Stop"),
      this.t("Cancel"),
      () => {
        this.askStatus = 3;
        this.apply();
      }
    );
  }

  applyAndRun() {
    this.askStatus = 1;
    this.apply();
  }

  apply() {
    this.copyStepValues();

    const formData = new FormData();
    formData.append('boardId', this.boardId);
    formData.append('token', this.app.getToken());

    if (typeof this.askStatus !== 'undefined') {
      formData.append(`unitList[${this.unitKey}][planner][askStatus]`, this.askStatus);
    }

    if (typeof this.askGoTo !== 'undefined') {
      formData.append(`unitList[${this.unitKey}][planner][askGoTo]`, this.askGoTo);
    }

    for (let stepNumber = 0; stepNumber < this.stepList.length; stepNumber += 1) {
      if (this.stepList[stepNumber].duration === 0) {
        this.alert.error(this.t('Please define non null duration for step %stepNumber%.', { stepNumber: this.stepList.length }));
        return;
      }

      formData.append(`unitList[${this.unitKey}][planner][stepList][${stepNumber}][action]`, { off: 0, temperature: 1, power: 2 }[this.stepList[stepNumber].action]);
      formData.append(`unitList[${this.unitKey}][planner][stepList][${stepNumber}][duration]`, this.stepList[stepNumber].duration);
      formData.append(`unitList[${this.unitKey}][planner][stepList][${stepNumber}][onFinishGoNext]`, this.stepList[stepNumber].onFinishGoNext);

      if (this.stepList[stepNumber].target.length) {
        formData.append(`unitList[${this.unitKey}][planner][stepList][${stepNumber}][target]`, this.stepList[stepNumber].target);
      }

      if (this.stepList[stepNumber].power.length) {
        formData.append(`unitList[${this.unitKey}][planner][stepList][${stepNumber}][power]`, this.stepList[stepNumber].power);
      }
    }

    if (this.stepList.length === 0) {
      formData.append(`unitList[${this.unitKey}][planner][stepList]`, '');
    }

    const overlay = new TemplatePartSpinnerOverlay;
    document.body.appendChild(overlay.renderAsDom());
    overlay.get().style = 'z-index: 1200;opacity: 0.75;';

    this.app.getApi().send(
      'user/board/set',
      formData,
      (function(readyState, status, response) {
        if (response.status) {
          this.loadUserData();
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

  loadUserData() {
    setTimeout(() => {
      this.app.loadUserData(() => {
        if (this.app.getUserData().boardList[this.boardId].unitList[this.unitKey].planner.askGoTo != -1
          || this.app.getUserData().boardList[this.boardId].unitList[this.unitKey].planner.askStatus != 0
        ) {
          this.loadUserData();
        } else {
          this.app.renderApp('board', {boardId: this.boardId});
          this.alert.success(this.t('Planner has been updated.'));
        }
      });
    }, 2000);
  }

  addNewStep() {
    this.copyStepValues();
    this.refreshStartEndStep();
    let startAt = 0;
    if (typeof this.stepList.at(-1) !== 'undefined') {
      startAt = this.stepList.at(-1).endAt;
      if (this.stepList.at(-1).duration === 0) {
        this.alert.error(this.t('Please define non null duration for step %stepNumber%.', { stepNumber: this.stepList.length }));
        return;
      }
    }

    this.stepList.push(
      {
        action: 'off',
        target: '',
        power: '',
        duration: 0,
        startAt,
        endAt: startAt,
      },
    );

    this.renderStepForm();
  }

  removeStep(stepNumber) {
    new Confirm(
      'danger',
      this.t("Are you sure you want to remove this step?"),
      this.t("Remove"),
      this.t("Cancel"),
      () => {
        this.stepList.splice(stepNumber, 1);
        this.copyStepValues();
        this.refreshStartEndStep();
        this.renderStepForm();
      }
    );
  }

  copyStepValues() {
    for (let step of this.stepList) {
      step.duration = Number(step.durationInput.get().value);
      step.onFinishGoNext = Number(step.onFinishGoNextInput.getMode() === 'on');
      step.power = step.powerInput.get().value;
      step.target = step.targetInput.get().value;
      step.action = step.switchMode.getMode();
    }
  }

  renderStepForm() {
    this.subformContainer.get().innerHTML = '';
    let stepNumber = 0;
    for (let step of this.stepList) {
      this.renderStep(stepNumber);
      stepNumber += 1;
    }
  }

  renderStep(stepNumber) {
    const step = this.stepList[stepNumber];

    const row = new TemplatePartRow()
      .addClass('mb-3')
      .setTypes(['cols-1', 'cols-lg-2'])
      .addClass('g-3');

    const duration = new TemplatePartInput()
      .addClass('form-control')
      .addClass('form-control-lg')
      .setRequired()
      .setType('number')
      .setMin(0)
      .setStep(1)
      .setValue(step.duration);
    step.durationInput = duration;

      console.log('fifi', step);
    const onFinishGoNext = new TemplatePartSwitchMode(
      this.unitKey,
      step.onFinishGoNext ? 'on' : 'off',
      () => {},
      {},
      'switch',
      {
        on: 'M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z',
        off: 'M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z'
      }
    );

    step.onFinishGoNextInput = onFinishGoNext;

    const target = new TemplatePartInput()
      .addClass('form-control')
      .addClass('form-control-lg')
      .setRequired()
      .setType('number')
      .setMin(0)
      .setMax(100)
      .setStep(0.1)
      .setValue(step.target);
    step.targetInput = target;

    const power = new TemplatePartInput()
      .addClass('form-control')
      .addClass('form-control-lg')
      .setRequired()
      .setType('number')
      .setMin(0)
      .setMax(100)
      .setStep(1)
      .setValue(step.power);
    step.powerInput = power;

    const switchMode = new TemplatePartSwitchMode(
      this.unitKey,
      step.action,
      () => {},
      {temperature: target, power: power},
      'heat'
    );
    step.switchMode = switchMode;

    const remove = new TemplatePartButton()
      .addVariation('lg')
      .addVariation('danger')
      .addClass('me-2')
      .appendChild(
        new TemplatePartSvg(
          ['M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z'],
        )
          .setWidth('30px')
          .setHeight('30px')
          .setColor('white'),
      )
      .setAction(() => this.removeStep(stepNumber));

    let stepStatus = 'running';

    if (this.unit.planner.currentStatus !== 1) {
      stepStatus = 'paused';
    }

    if (this.unit.planner.currentStep < stepNumber) {
      stepStatus = 'waiting';
    } else if (this.unit.planner.currentStep > stepNumber) {
      stepStatus = 'passed';
    }

    const statusColors = {
      passed: 'secondary',
      running: 'info',
      waiting: 'primary',
      paused: 'warning',
    };

    const label = new TemplatePartButton(this.t('Step %stepNumber%', { stepNumber: stepNumber + 1 }))
      .addVariation('lg')
      .addVariation(statusColors[stepStatus])
      .addClass('me-2')
      .addClass('position-relative')
      .setAction(() => this.goToStep(stepNumber));

    if (stepStatus === 'waiting') {
      label.appendChild(
        new TemplatePartSvg(
          ['M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z'],
        )
          .setWidth('15px')
          .setHeight('15px')
          .setColor('white')
          .setClasses('position-absolute top-100 start-100 translate-middle'),
      );
    } else {
      label.addClass('pe-none');
    }

    row
      .appendChild(new TemplatePartCol() // Switch
        .appendChild(label)
        .appendChild(remove)
        .appendChild(switchMode)
        .appendChild(onFinishGoNext),
      )
      .appendChild(new TemplatePartCol() // Duration controller
        .appendChild((new TemplatePartDiv())
          .addClass('input-group')
          .addClass('mb-2')
          .appendChild((new TemplatePartButton())
            .addVariation('lg')
            .addVariation('secondary')
            .appendChild(
              new TemplatePartSvg(
                ['M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zm2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527z'],
              )
                .setWidth('30px')
                .setHeight('30px')
                .setColor('white'),
            ),
          )
          .appendChild((new TemplatePartButton('-'))
            .addVariation('lg')
            .addVariation('danger')
            .setAction(() => { this.substract(duration, 0); }),
          )
          .appendChild(duration)
          .appendChild((new TemplatePartButton('+'))
            .addVariation('lg')
            .addVariation('primary')
            .setAction(() => { this.add(duration, 0); }),
          )
        )
      )
      .appendChild(new TemplatePartCol() // Temperature controller
        .appendChild((new TemplatePartDiv())
          .addClass('input-group')
          .addClass('mb-2')
          .appendChild((new TemplatePartButton())
            .addVariation('lg')
            .addVariation('secondary')
            .appendChild(
              new TemplatePartSvg(
                [
                  'M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z"',
                  'M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z',
                ],
              )
                .setWidth('30px')
                .setHeight('30px')
                .setColor('white'),
            ),
          )
          .appendChild((new TemplatePartButton('-'))
            .addVariation('lg')
            .addVariation('danger')
            .setAction(() => { if (switchMode.getMode() === 'temperature') { this.substract(target, 75); } }),
          )
          .appendChild(target)
          .appendChild((new TemplatePartButton('+'))
            .addVariation('lg')
            .addVariation('primary')
            .setAction(() => { if (switchMode.getMode() === 'temperature') { this.add(target, 75); } }),
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
              .setColor('white'),
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

    if (stepStatus === 'passed' && step.duration > 0) {
      row.addClass('position-relative');
      row.appendChild(new TemplatePartDiv()
        .addClass('position-absolute')
        .addClass('bg-dark')
        .addClass('w-100')
        .addClass('h-100')
        .addClass('overlay'),
      );
    }

    this.subformContainer.get().appendChild(row.renderAsDom());
    this.subformContainer.get().appendChild(new TemplatePartHr().renderAsDom());
    Listener.run();

    // Fix bug with style. For browser to read the style
    const overlayList = document.getElementsByClassName('overlay');
    for (let i = 0; i < overlayList.length; i += 1) {
      overlayList[i].style = 'z-index: 100;opacity: 0.75;';
    }
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
  }

  refreshStartEndStep() {
    let startAt = 0;
    for (let stepNumber = 0; stepNumber < this.stepList.length; stepNumber += 1) {
      this.stepList[stepNumber].startAt = startAt;
      this.stepList[stepNumber].endAt = startAt + this.stepList[stepNumber].duration;
      startAt += this.stepList[stepNumber].duration;
    }
  }

  t(str, params) {
    return this.translator.get(str, params);
  }
}
export default TemplateWidgetBoardHeatUnitPlanner;

