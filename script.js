


// Creates a div for outputting messages to the user.
const form = document.getElementById('musiclistform');
const errormsg = document.createElement('div');
form.insertBefore(errormsg, form.firstChild);


document.getElementById('btn').addEventListener('click', () => {
    var title = document.getElementById("title").value;
    var body = document.getElementById("body").value;
    console.log("clicked")
    // Validates the user input.
     if (!title) {
      errormsg.style.display="block"
    errormsg.innerHTML = `
    <div class='invaliddata'>
      <div><p>please enter title</p></div>
    </div>
  `
  }
  else{
    console.log(title,body);
    document.getElementById('title').value = '';
    document.getElementById('body').value = '';
    errormsg.style.display="none"
    if ('Notification' in window && 'serviceWorker' in navigator) {
      notificationButton.addEventListener('click', () => {
        console.log(Notification.permission);
        switch (Notification.permission) {
          case 'denied':
            notificationNotAllowed();
            break;
    
          case 'default':
            requestUserPermission();
            break;
    
          case 'granted':
            form.style.display="block"
            displayNotification()
            break;
        }
    
      }
      );
    }
    else {
      notificationNotAllowed();
    }

  }
   
})
//----------------------Notification
//const notificationButton = document.getElementById('noti');


function notificationNotAllowed() {
  console.log('Notifications not allowed!');
  notificationButton.disabled = true;
}
function requestUserPermission() {
  Notification.requestPermission()
    .then((permission) => {
      if (permission === 'granted') {
        displayNotification();
      }
      else {
        notificationNotAllowed();
      }
    });
}


function displayNotification() {
  const options = {
    body: body,
    actions: [
      {
        action: 'confirm',
        title: 'Okay',
      },
      {
        action: 'cancel',
        title: 'Cancel',
      }
    ]
  };

  // new Notification('Successfully subscribed!', options);
  navigator.serviceWorker.ready.then(registration => {
    registration.showNotification(title, options);
  });

}


// register
if('serviceWorker' in navigator){
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register('./serviceworker.js',{scope:"/pwalab4/"})
        
    })
}

