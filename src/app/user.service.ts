import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './endpoints';



interface createdUser{
kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string

}

interface signedUser{
    kind: string,
    localId: string,
    email: string,
    displayName: string,
    idToken: string,
    registered: boolean,
    refreshToken: string,
    expiresIn: string
}


@Injectable()
export class UserService {

  
  public isLogged:boolean = true;
  private apiKey:string = ""
  constructor(private http:HttpClient) { 
   
  }

  createUserInfoInDatabase(localId:string){
    const userName = "Top guze";
    const bio = "I'm looking to enjoy my stay";
    const profilePicture = "coolsrc";
    const headers = {
      'Content-Type': 'application/json'
  };
    this.http.put(environment.apiUrl+"users/"+userName+".json",{
      username: userName,
      _id: localId,
      bio:bio,
      profileImgSrc:profilePicture
    },{
      headers:headers
    }).subscribe();
  }

  createUser():void{
    //TODO IMPLEMENT VALIDATIONS
    const requestBody = {email: 'lubo_mv@abv.bg',
      password: 'strongpassword',
      returnSecureToken: true};

      const headers = {
        'Content-Type': 'application/json'
    };

    this.http.post<createdUser>(environment.signUpUrl+this.apiKey,requestBody,{
      headers: headers
    }).subscribe((data:createdUser)=>{
      console.log(data,"=========",data.localId);
      this.isLogged = true;
      localStorage.setItem('firebaseIdToken',data.idToken);
      localStorage.setItem('firegbaseRefreshToken',data.refreshToken);
      localStorage.setItem('firebaseLocalToken',data.localId);
      this.createUserInfoInDatabase(data.localId);
    })

    

  }

  

  signInUser(email:string, password:string){
    // TODO IMPLEMENT VALIDATIONS
    const requestBody = {
      email:email,
      password:password,
      returnSecureToken: true
    }
    const headers = {
      'Content-Type': 'application/json'
  };

  this.http.post<signedUser>(environment.signInUrl+this.apiKey,requestBody,{
    headers: headers
  }).subscribe((data:signedUser)=>{
    this.isLogged = true;
    localStorage.setItem('firebaseIdToken',data.idToken);
    localStorage.setItem('firegbaseRefreshToken',data.refreshToken);
    localStorage.setItem('firebaseLocalToken',data.localId);
  })
    
  }

  signOutUser():void{
    //TODO IMPLEMENT SOFT-LOCK DEFENSE MECHANISM
    localStorage.removeItem('firebaseIdToken');
    localStorage.removeItem('firebaseRefreshToken');
    this.isLogged = false;
  }

}
