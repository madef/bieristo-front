import Translator from './Translator';

class Confirm {
  constructor(type, message, yesMessage, noMessage, yesCallback, noCallback) {
    let container = this.getContainer();
    let div = document.createElement('div');
    let body = document.createElement('div');
    let buttonContainer = document.createElement('div');
    let yesButton = document.createElement('button');
    let noButton = document.createElement('button');

    this.translator = Translator.getInstance();

    if (typeof yesCallback === 'function') {
      yesButton.onclick = () => { yesCallback(); container.removeChild(div) };
    } else {
      yesButton.onclick = () => container.removeChild(div);
    }

    if (typeof noCallback === 'function') {
      noButton.onclick = () => { noCallback(); container.removeChild(div) };
    } else {
      noButton.onclick = () => container.removeChild(div);
    }

    div.classList.add('toast', 'align-items-center', 'text-white', 'border-0', 'show');
    body.classList.add('toast-body');
    buttonContainer.classList.add('mt-2', 'pt-2', 'border-top');
    yesButton.classList.add('btn', 'btn-light', 'btn-sm', 'me-1');
    noButton.classList.add('btn', 'btn-secondary', 'btn-sm');

    if (type === 'info') {
      div.classList.add('bg-info');
    } else if (type === 'success') {
      div.classList.add('bg-success');
    } else if (type === 'danger') {
      div.classList.add('bg-danger');
    }

    div.appendChild(body);

    body.innerText = message;
    body.appendChild(buttonContainer);
    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);

    yesButton.type = 'button';
    noButton.type = 'button';
    yesButton.innerText = yesMessage;
    noButton.innerText = noMessage;

    container.appendChild(div);
  }

  getContainer() {
    if (!document.querySelector('#alert')) {
      let div = document.createElement('div');
      div.id = 'alert'
      div.classList.add('toast-container', 'position-fixed', 'top-0', 'end-0', 'p-3');
      div.style.zIndex= '1200';
      document.body.appendChild(div);
    }

    return document.querySelector('#alert');
  }
}

export default Confirm;
