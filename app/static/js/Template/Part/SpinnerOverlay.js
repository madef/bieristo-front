import TemplateElement from '../Element';

class TemplatePartSpinnerOverlay extends TemplateElement {
  render() {
    return `<div`
      + ` class="position-fixed top-0 start-0 w-100 h-100 bg-dark"`
      + ` data-identifier="${this.getIdentifier()}"`
      + '>'
      + `<div class="spinner-border position-absolute top-50 start-50">`
      + `<span class="visually-hidden">Loading...</span>`
      + `</div>`
      + `</div>`;
  }
}

export default TemplatePartSpinnerOverlay;

