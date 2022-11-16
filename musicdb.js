


 class Musicdb{
    constructor(){
        console.log("music db intialized")
    }
    open(){
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey: "AIzaSyDQ3IgX3_I8Kabi9A54XyDbTsKvzqnKxD0",
            authDomain: "mobilewebapp-32813.firebaseapp.com",
            projectId: "mobilewebapp-32813",
            storageBucket: "mobilewebapp-32813.appspot.com",
            messagingSenderId: "1018907128908",
            appId: "1:1018907128908:web:c753191fe276bd58f2b0e9",
            measurementId: "G-KNHRQLEB35"
          };

          const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
    }
}
export default new Musicdb();