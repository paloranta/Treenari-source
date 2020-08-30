/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

exports.onInitialClientRender = () => {
  require("typeface-nunito");
};

//export const registerServiceWorker = () => true

/*export const onServiceWorkerUpdateFound = () => {
  const showNotification = () => {
    Notification.requestPermission(result => {
        if (result === 'granted') {
            navigator.serviceWorker.ready.then(registration => {
                registration.showNotification('Update', {
                    body: 'New content is available!',
                    vibrate: [200, 100, 200, 100, 200, 100, 400],
                    tag: 'request',
                    actions: [ // you can customize these actions as you like
                        {
                          
                        },                       
                    ]
                })
            })
        }
    })
  }

  showNotification()
}*/