import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, remove, update, onValue, push} from 'firebase/database';

@Injectable()
export class DataBaseAccessService {
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
  private dataBase = getDatabase(this.app)
  constructor() { }

  getAllRecipes():void{
    const recipesRef = ref(this.dataBase,'recipes');
    get(recipesRef).then((snapshot)=>{
      const recipes = snapshot.val();

      for(const recipeId in recipes){
        const recipe = recipes[recipeId];
        console.log(`recipe name ${recipe.title}`);
      }
    })
  }
}


