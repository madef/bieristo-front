class NotificationManager {
  static getInstance() {
    if (typeof NotificationManager.instance === 'undefined') {
      NotificationManager.instance = new NotificationManager();
    }

    return NotificationManager.instance;
  }

  constructor(domain) {
    this.allowed == false;
    this.notificationCollection = {};

    if (!('Notification' in window)) {
      return;
    }

    if (Notification.permission === 'granted') {
      this.allowed = true;
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        this.allowed = permission === 'granted';
      });
    }
  }

  set(id, message, vibrate) {
    if (!this.allowed) {
      return;
    }

    if (!this.hasChanged(id, message)) {
      return;
    }

    this.close(id);

    if (typeof vibrate == 'undefined') {
      vibrate = false;
    }

    this.notificationCollection[id] = new Notification(message, {'vibrate': vibrate});
  }

  hasChanged(id, message) {
    if ((typeof this.notificationCollection[id] !== 'undefined') && this.notificationCollection[id] !== false) {
      if (this.notificationCollection[id].title == message) {
        return false;
      }
    }
    return true;
  }

  close(id) {
    if ((typeof this.notificationCollection[id] !== 'undefined') && this.notificationCollection[id] !== false) {
      this.notificationCollection[id].close();
    }
  }
}

export default NotificationManager;
