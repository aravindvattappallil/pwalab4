import musicdb from "./musicdb.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    where,
    doc,
    getDoc,
    updateDoc,
    deleteDoc } from
"https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

//const musicdb = new Musicdb 
//console.log("music db",musicdb)



const firebaseConfig = {
    apiKey: "AIzaSyDQ3IgX3_I8Kabi9A54XyDbTsKvzqnKxD0",
    authDomain: "mobilewebapp-32813.firebaseapp.com",
    projectId: "mobilewebapp-32813",
    storageBucket: "mobilewebapp-32813.appspot.com",
    messagingSenderId: "1018907128908",
    appId: "1:1018907128908:web:c753191fe276bd58f2b0e9",
    measurementId: "G-KNHRQLEB35"
  };
  

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



// Creates a div for outputting messages to the user.
const form = document.getElementById('musiclistform');
const errormsg = document.createElement('div');
form.insertBefore(errormsg, form.firstChild);

window.onload=getdata()
document.getElementById('btn').addEventListener('click', () => {
    var title = document.getElementById("title").value;
    var artist = document.getElementById("artist").value;
    console.log("clicked")
    // Validates the user input.
  const wrongmsg = [];
  if (!title) {
    wrongmsg.push('The Title field is required.');
  }

  if (!artist) {
    wrongmsg.push('The Artist field is required.');
  }

  if (wrongmsg.length > 0) {
    const description = wrongmsg.join('<br>');
    displayFailureMessage('Invalid data!', description);
    return;
  }
     if(!title||!artist)
    {
         //alert("please enter the input")
  }
     else{
        var listId ="listss"
        document.getElementById("listss")?.remove()
        
       //printvalue(title,artist);
       addDoc(collection(db,"musiclist"),{
        title:title,
        artist:artist,
        like:0
       }).then((game) => {
        displaySuccessMessage('Music added successfully!');
  
        // Clears the user input.
        document.getElementById('title').value = '';
        document.getElementById('artist').value = '';
       
      })
      .catch((error) => {
        displayFailureMessage('Failed to add Music!', error);
      });

       getdata()
       clearListItems(listId)
     }
    
})

  // get data from firebase
  function getdata(){
    
    getDocs(collection(db,"musiclist")).then((snapshot)=>{
        
        snapshot.forEach((childsnapshot)=>{
            let base = childsnapshot.data()
            console.log(childsnapshot.data(),childsnapshot.id);
            printvalue(base.title,base.artist,base.like,childsnapshot.id)
        })
    })
  }
 


function printvalue(title,artist, like, id){
    console.log("sending to dom")
        const listadd=document.createElement("div");
        const btncontainer=document.createElement("div");
        
        btncontainer.className = "btnstyle"
        const likecontainer=document.createElement("div");
        const deletecontainer=document.createElement("div");

        
    
        listadd.classList.add("list_add");
        listadd.id="listss"

        const titleh3=document.createElement("h3");
        
        titleh3.innerText=title;
        
        const artisth3=document.createElement("p");
        
        artisth3.innerText=artist;
        
        document.getElementById("content").appendChild(listadd);
        
        listadd.appendChild(titleh3)
        const likecount =document.createElement("p");
        likecount.innerHTML = `like : ${like}`
        
        listadd.appendChild(artisth3)
        listadd.appendChild(btncontainer)
        btncontainer.appendChild(likecontainer)
        btncontainer.appendChild(deletecontainer)
        likecontainer.appendChild(likecount)
        deletebutton(deletecontainer, id)
        likebutton(likecontainer,like, id)
}

function deletebutton (btncontainer,id){
    const deletebtn = document.createElement('button')
    deletebtn.innerText ="Delete"
    deletebtn.addEventListener("click", ()=>{
        console.log(id)
        deleteDoc(doc(db,"musiclist",id)).then((res)=>{
            console.log("success",res)
            window.location.reload()
        })
       
    })
    
    btncontainer.appendChild(deletebtn)
}

function likebutton (likecontainer,like,id){
    const likebtn = document.createElement('button')
    likebtn.innerText ="+1 Like"
    let countlike = like
    likebtn.addEventListener("click",()=>{
        countlike=countlike+1
        updateDoc(doc(db,"musiclist",id),{
            like: countlike
        }).then(()=>{
            window.location.reload()
        })
    })
    likecontainer.appendChild(likebtn)
    
    
}
function displaySuccessMessage(message) {
    errormsg.innerHTML = `
      <div class='successdata'>
        ${message}
      </div>
    `;
  }
  
 
  function displayFailureMessage(message, description) {
    errormsg.innerHTML = `
      <div class='invaliddata'>
        ${message}
        <div>${description}</div>
      </div>
    `;
  }
  function clearListItems(listId) {
    var listElement = document.getElementById(listId);
    while (listElement.firstChild) {
        listElement.removeChild(listElement.firstChild);
    }
}


// storage available 
// if (navigator.storage && navigator.storage.estimate) {
//     navigator.storage.estimate()
//     .then((result) => {
//     console.log(result);
//     // Calculates the remaining quota
//     const remaining = result.quota - result.usage;
//     console.log('Remaining:', remaining);
//     // Calculates the percentage used
//     const used = (result.usage / result.quota) * 100;
//     console.log(`Used (%):`, used);
//     });
//     }
//
//----------------------Notification
const notificationButton = document.getElementById('noti');
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
        //configurePushSubscription();
        displayNotification()
        break;
    }

  }
  );
}
else {
  notificationNotAllowed();
}

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
    body: 'Thank you for subscribing to our notifications.',
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
    registration.showNotification('Successfully subscribed!', options);
  });

}


// register
if('serviceWorker' in navigator){
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register('./serviceworker.js',{scope:"/Lab2/"})
        
    })
}

