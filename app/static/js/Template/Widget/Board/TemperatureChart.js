import Alert from '../../../Alert';
import TemplatePartCol from '../../Part/Col';
import TemplatePartRow from '../../Part/Row';
import TemplatePartContainer from '../../Part/Container';
import TemplatePartTitle from '../../Part/Title';
import TemplatePartForm from '../../Part/Form';
import TemplatePartInput from '../../Part/Input';
import TemplatePartCanvas from '../../Part/Canvas';
import TemplatePartDiv from '../../Part/Div';
import TemplatePartButton from '../../Part/Button';
import Translator from '../../../Translator';
import TemplatePartSvg from '../../Part/Svg';
import TemplatePartSpinnerOverlay from '../../Part/SpinnerOverlay';
import ChartRenderer from '../../../ChartRenderer';

class TemplateWidgetBoardTemperatureChart {
  constructor(app, boardId, sensor) {
    this.app = app;
    this.boardId = boardId;
    this.sensor = sensor;
    this.translator = Translator.getInstance();
    this.alert = Alert.getInstance();
    this.modeAutoUpdate = true;

    this.interval = setInterval(() => this.update(), 60000);
  }

  render() {
    const fromDate = new Date();
    fromDate.setHours(fromDate.getHours() - 1);
      console.log(this.formatDate(fromDate));

    this.from = new TemplatePartInput()
      .addClass('form-control')
      .addClass('form-control-lg')
      .addClass('mb-2')
      .setRequired()
      .setValue(this.formatDate(fromDate))
      .setAction('onchange', () => this.renderChart())
      .setType('datetime-local')
      .setStep(60);

    this.to = new TemplatePartInput()
      .addClass('form-control')
      .addClass('form-control-lg')
      .setRequired()
      .setValue(this.formatDate(new Date()))
      .setAction('onchange', () => this.renderChart())
      .setType('datetime-local')
      .setDisabled()
      .setStep(60);

    this.modeIcon = new TemplatePartButton()
      .addVariation('lg')
      .addVariation('primary')
      .appendChild(new TemplatePartSvg(
          [
            'M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z',
            'M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z',
          ]
        )
        .setWidth('30px')
        .setHeight('30px')
        .setColor('white')
      )
      .setAction(() => this.changeMode());

    this.chart = new TemplatePartCanvas();
      

    return new TemplatePartCol()
      .setTypes(['lg-10', 'md-9'])
      .setIdentifier('main-content')
      .appendChild(new TemplatePartRow()
        .appendChild(new TemplatePartCol()
          .setTypes(['2'])
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
        .appendChild(new TemplatePartCol()
          .appendChild(new TemplatePartTitle(1, this.t('Temperature Chart'))
            .addClass('mb-5')
          ),
        ),
      )
      .appendChild(new TemplatePartRow()
        .appendChild(new TemplatePartCol()
          .appendChild(this.from),
        )
        .appendChild(new TemplatePartCol()
          .appendChild(new TemplatePartDiv()
            .addClass('input-group')
            .addClass('mb-2')
            .appendChild(this.modeIcon)
            .appendChild(this.to)
          ),
        ),
      )
      .appendChild(new TemplatePartRow()
        .appendChild(new TemplatePartCol()
          .addClass('mt-5')
          .appendChild(this.chart)
        )
      )
      .render();
  }

  changeMode() {
    this.modeAutoUpdate = !this.modeAutoUpdate;
    
    if (this.modeAutoUpdate) {
      this.to.get().setAttribute('disabled', '');
      this.modeIcon.get().classList.add('btn-primary');
      this.modeIcon.get().classList.remove('btn-secondary');
      this.interval = setInterval(() => this.update(), 60000);
      this.update();
    } else {
      this.to.get().removeAttribute('disabled');
      this.modeIcon.get().classList.remove('btn-primary');
      this.modeIcon.get().classList.add('btn-secondary');
      clearInterval(this.interval);
    }
  }

  update() {
    this.to.get().value = this.formatDate(new Date());
    this.renderChart();
  }

  afterDisplay() {
    this.chartRenderer = new ChartRenderer(this.chart.get());
    this.renderChart();
  }

  renderChart() {
    let from = new Date(this.from.get().value);
    let to = new Date(this.to.get().value);

    const formData = new FormData();
    formData.append('token', this.app.getToken());
    formData.append('boardId', this.boardId);
    formData.append('sensor', this.sensor);
    formData.append('from', from.toUTCString());
    formData.append('to', to.toUTCString());
    this.app.getApi().send(
      'user/board/temperature',
      formData,
      (readyState, status, response) => {
        if (response.status) {
          console.log(response.pointList);
          this.chartRenderer.setPoints(response.pointList);
          //new ChartRenderer(response.pointList, this.chart.get());
        } else {
          this.alert.error(this.t(response.reason));
        }
      },
    );
  };

  formatDate(date) {
    return `${date.getFullYear()}-${this.digit(date.getMonth() + 1)}-${this.digit(date.getDate())}T${this.digit(date.getHours())}:${this.digit(date.getMinutes())}`
  }

  digit(number) {
    if (number < 10) {
      return `0${number}`;
    }

    return number;
  }

  cancel() {
    this.app.renderApp('board', {boardId: this.boardId});
  }

  t(str, params) {
    return this.translator.get(str, params);
  }

  destruct() {
    clearInterval(this.interval);
  }
}
export default TemplateWidgetBoardTemperatureChart;

