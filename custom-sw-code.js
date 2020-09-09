// This code is adapted from Nico Martin https://github.com/nico-martin/todo-pwa/blob/master/preact/src/app/List/PushReminder.jsx 

self.addEventListener("notificationclick", event => {
  const notification = event.notification;
  const url = "https://paloranta.github.io/Treenari/treeni/"; 

  const eventWaitUntilFullfilled = self.clients.matchAll().then(clients => {
    let windowToFocus = false;
    clients.forEach(windowClient => {
      if (windowClient.url === url) {
        windowClient.focus(); 
        windowToFocus = windowClient;
      }
    });

    if (!windowToFocus) {
      self.clients
        .openWindow(url)
        .then(windowClient => (windowClient ? windowClient.focus() : null));
    }
    notification.close();
    return sendNotificationDoneMessage(notification);
  });

  event.waitUntil(eventWaitUntilFullfilled);
});

self.addEventListener("notificationclose", event =>
  event.waitUntil(sendNotificationDoneMessage(event.notification, "closed"))
);