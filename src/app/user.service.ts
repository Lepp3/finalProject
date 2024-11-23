import { Injectable } from '@angular/core';





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
  
  isLogged:boolean = false;
  constructor() { 
   
  }

  createUser(email:string, password:string, rePass:string){
    //TODO IMPLEMENT USER CREATION WITH REST API AFTER VALIDATIONS
  }

  signInUser(email:string, password:string){
    //TODO IMPLEMENT USER SIGN IN WITH REST API AFTER VALIDATIONS
  }

  signOutUser(){
    //TODO IMPLEMENT USER SIGNOUT
  }

}
