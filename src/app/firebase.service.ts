import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth,createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword } from 'firebase/auth';





@Injectable()
export class FirebaseService {
  private config = {
    apiKey: "AIzaSyAhOJFnSrVAI6h4zjYOZGklqmVuRSO-Y50",
    authDomain: "e-commerce-project-b5818.firebaseapp.com",
    databaseURL: "https://e-commerce-project-b5818-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "e-commerce-project-b5818",
    storageBucket: "e-commerce-project-b5818.firebasestorage.app",
    messagingSenderId: "58177858800",
    appId: "1:58177858800:web:10916640a4cdedb84f2635"
  }
  private app = initializeApp(this.config);
  
  private auth = getAuth(this.app);
  isLogged:boolean = false;
  constructor() { 
   
  }

  createUser(email:string, password:string){
    return createUserWithEmailAndPassword(this.auth, email,password);
  }

  signInUser(email:string, password:string){
    return signInWithEmailAndPassword(this.auth,email,password);
  }

  signOutUser(){
    return signOut(this.auth);
  }

}
