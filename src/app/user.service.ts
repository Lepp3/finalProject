import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './utils/endpoints';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError, throwError} from 'rxjs';
import { SignedUser,UserInfo } from './user-profile/models/userModel';









interface RefreshTokenResponse{
  "expires_in": string,
  "token_type": string,
  "refresh_token": string,
  "id_token": string,
  "user_id": string,
  "project_id": string
}


@Injectable({
  providedIn: 'root',
})
export class UserService {

  
  private isLogged = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject< SignedUser| null>(null);

  private apiKey:string = "AIzaSyAhOJFnSrVAI6h4zjYOZGklqmVuRSO-Y50"

  // private refreshToken: RefreshTokenData | null = null;

  constructor(private http:HttpClient) { 
   
  }

  get isLogged$(): Observable<boolean>{
    return this.isLogged.asObservable();
  }

  get user$(): Observable<SignedUser | null>{
    return this.userSubject.asObservable()
}


private setUserState(user:SignedUser):void{
  this.isLogged.next(true);
  this.userSubject.next({...user,
    displayName: user.displayName || '',
    registered: user.registered || true
  });
  this.storeToken(user.idToken,user.refreshToken,user.expiresIn,user.localId);
  
}

private storeToken(idToken:string,refreshToken:string,expiresIn:string,localId?:string):void{
  const expirationTime = Date.now() + Number(expiresIn) * 1000;
  localStorage.setItem('idToken',idToken);
  localStorage.setItem('refreshToken',refreshToken);
  localStorage.setItem('tokenExpiration',String(expirationTime));
  if(localId){
    localStorage.setItem('userId',localId);
  }
}

private getToken(): string | null {
  const expirationTime = Number(localStorage.getItem('tokenExpiration') || 0);
  if(Date.now() > expirationTime){
    return null
  }
  return localStorage.getItem('idToken');
}

public initializeUserState(): void {
  const idToken = this.getToken();
  const refreshToken = localStorage.getItem('refreshToken');

  if (idToken && refreshToken) {
    // Optionally refresh token if close to expiration
    this.setUserState({
      kind: '',
      localId: '',
      email: '',
      idToken: idToken,
      refreshToken: refreshToken,
      expiresIn: ''
    });
  } else {
    // Ensure user is considered logged out if tokens are missing
    this.isLogged.next(false);
    this.userSubject.next(null);
  }
}



createUser(email:string,password:string,username:string,bio:string):void{
  const requestBody = {email: email,
    password: password,
    returnSecureToken: true};

    const headers = {
      'Content-Type': 'application/json'
  };

  this.http.post<SignedUser>(environment.signUpUrl+this.apiKey,requestBody,{
    headers: headers
  }).subscribe((data:SignedUser)=>{
    this.setUserState(data);
    this.createUserInfoInDatabase(data.localId,username,bio);
  }),catchError((error)=>{
        console.error('User creation failed',error);
        return throwError(()=>new Error('User creation failed'));
      })
}

  createUserInfoInDatabase(localId:string,username:string,bio:string){
    const userName = username;
    const userBio = bio;
    const profilePicture = "coolsrc";
    const headers = {
      'Content-Type': 'application/json'
  };
    this.http.put(environment.apiUrl+"users/"+localId+".json",{
      username: userName,
      _id: localId,
      bio:userBio,
      profileImgSrc:profilePicture
    },{
      headers:headers
    }).subscribe();
  }

  

  

  signInUser(email:string,password:string):void{
    const requestBody = {
      email:email,
      password:password,
      returnSecureToken: true
    }
    const headers = {
      'Content-Type': 'application/json'
  };

  this.http.post<SignedUser>(environment.signInUrl+this.apiKey,requestBody,{
    headers: headers
  }).subscribe((data:SignedUser)=>{
    
    this.setUserState(data);
    
    }),catchError((error)=>{
      console.error('User sign in failed',error);
      return throwError(()=>new Error('sign in failed'));
    })
    
  
  }


  signOutUser():void{
    this.isLogged.next(false);
    this.userSubject.next(null);
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiration');
    console.log('signout works');
  }

  refreshAuthToken():Observable<void>{
    const refreshToken = localStorage.getItem('refreshToken');
    if(!refreshToken){
      return throwError(()=>new Error('No refresh token available'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const requestBody = {
      'grant_type': 'refresh_token',
      'refresh_token': `${refreshToken}`
    }

    return this.http.post<RefreshTokenResponse>(environment.refreshTokenUrl+this.apiKey,requestBody,{headers:headers}).pipe(
      map((response)=>
        {
          this.storeToken(response.id_token,response.refresh_token,response.expires_in);
    }),
    catchError((error)=>{
      console.error('Token refresh failed',error);
      this.signOutUser();
      return throwError(()=> new Error('Token refresh failed'));
    })
  )
  }

  isRefreshTokenExpired():boolean{
    let expirationTime = Number(localStorage.getItem('tokenExpiration') || 0);
    //handle 1 minute expiration
    return Date.now() > expirationTime+60;
  }

  getUserInfo(localId:string): Observable<UserInfo>{
    return this.http.get<UserInfo>(environment.apiUrl+'users/'+localId+'.json')
  }

  getUserId(): string | null{
    return localStorage.getItem('userId');
  }

}
