# Firebase Setup 
**Deployment Status**
<a href="https://adarshchakraborty.netlify.com"><img src="https://api.netlify.com/api/v1/badges/551c2480-12ef-4c2e-9b97-ffe41693b2b6/deploy-status" align="right"></a>
***
Just created this repo because I tend to forget the steps to add firebase to my projects.

## Steps
1. Go to Firebase home page & Get Started.
2. Login && Create a Project. 
3. Wait, till it Provision the resources.

### Register your app
1. Give your app, a nick name.
2. Add the project,
3. Copy the `initializeApp` import statement & `firebaseConfig` for further use.
4. Enable the Sign-In method that you want to use in Authentication.

### Firebase Init
1. Create a firebase config file js file inside src folder.
2. Fill up the config file, from the details from firebase.

```
import { initializeApp } from "firebase/app";
// import auth 
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export to use in project.
export const auth = getAuth(app);
```
### Using Firebase Auth 

**Registering an User Account.**

```
import { createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from './firebaseConfig';

// A User defined function
const registerUser() = async () => {
    // Creates an user account & login.
    // Returns promise.
   try{
        const user = await createUserWithEmailAndPassword(auth,"email","password");

   }catch(e) {
       console.log(e.message);
   }
}
```

createUserWithEmailAndPassword requies two parameters,
1. auth (references the app on firebase).
2. e-mai & password to create the account.

***

**That's all for registering user!**

`auth.currentUser` holds the currently logged in user.
    To check the mail, `auth.currentUser.email `

But, on refresh, It will fail as auth needs some time to get the logged-in user, so what we have to do is to 

*import `onAuthStateChanged` from `firebase/auth'.*

```
onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser); // My React User state;
})
```

**Logout**

*import `{ signOut }` from 'firebase/auth';*

```
// User defined Logout function
const signOutUser = async () => {
    await signOut(auth);

    // onAuthStateChanged will be called and currentUser will be nulled.
}
```

**Login**

Logging in user is very similar to createUserWithEmailAndPassword, the difference is that we want to sign-in with `signInWithEmailAndPassword`

*import `signInWithEmailAndPassword` from 'firebase/auth';*

```
// User defined login function
const login = async () => {
    try{
        const user = await signInWithEmailAndPassword(auth, "e-mail", "password");
        
    }catch(e){
        console.log(e.message);
    }
}
```

***
# Code to add Firebase Objects to Array

```javascript
  const loadedMovies = [];
  const data = {}; // 1 big object fetched from Firebase
  
  for(const key in data){
    loadedMovies.push({
      id: key,
      title: data[key].title, // field name
      author: data[key].author,
      price: data[key].price
    });
  }
  
  setMovies(loadedMovies);
```
