class Alert {
  static getInstance() {
    if (typeof Alert.instance === 'undefined') {
      Alert.instance = new Alert();
    }

    return Alert.instance;
  }

  error(str) {
    this.display('danger', str, 8000);
  }

  success(str) {
    this.display('success', str, 2000);
  }

  info(str) {
    this.display('info', str, 5000);
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

  display(type, str, duration) {
    let container = this.getContainer();
    let div = document.createElement('div');
    let flex = document.createElement('div');
    let body = document.createElement('div');
    let button = document.createElement('button');

    div.classList.add('toast', 'align-items-center', 'text-white', 'border-0', 'show');
    flex.classList.add('d-flex');
    body.classList.add('toast-body');
    button.classList.add('btn-close', 'btn-close-white', 'me-2', 'm-auto');

    if (type === 'info') {
      div.classList.add('bg-info');
    } else if (type === 'success') {
      div.classList.add('bg-success');
    } else if (type === 'danger') {
      div.classList.add('bg-danger');
    }

    div.appendChild(flex);
    flex.appendChild(body);
    flex.appendChild(button);

    body.innerText = str;

    button.type = 'button';
    button.setAttribute('data-bd-dismiss', 'toast');
    button.setAttribute('aria-label', 'Close');

    button.onclick = () => container.removeChild(div);

    setTimeout(() => container.removeChild(div), duration);

    container.appendChild(div);
  }
}

export default Alert;
