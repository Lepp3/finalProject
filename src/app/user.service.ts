import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './endpoints';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError, throwError} from 'rxjs';



interface CreatedUser{
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string

}

interface SignedUser{
    kind: string,
    localId: string,
    email: string,
    displayName: string,
    idToken: string,
    registered: boolean,
    refreshToken: string,
    expiresIn: string
}

interface RefreshTokenData{
  token:string,
  expiresIn: string,
}

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

  
  private isLogged = new BehaviorSubject<boolean>(true);
  private userSubject = new BehaviorSubject<{kind: string;
    localId: string;
    email: string;
    displayName: string;
    idToken: string;
    registered: boolean;
    refreshToken: string;
    expiresIn: string} | null>(null);

    get isLogged$(): Observable<boolean>{
      return this.isLogged.asObservable();
    }

    get user$(): Observable<{kind: string;
      localId: string;
      email: string;
      displayName: string;
      idToken: string;
      registered: boolean;
      refreshToken: string;
      expiresIn: string} | null>{
        return this.userSubject.asObservable()
    }



  private apiKey:string = ""

  private refreshToken: RefreshTokenData | null = null;

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

  createUser(email:string,password:string):void{
    //TODO IMPLEMENT CATCH ERROR
    const requestBody = {email: email,
      password: password,
      returnSecureToken: true};

      const headers = {
        'Content-Type': 'application/json'
    };

    this.http.post<CreatedUser>(environment.signUpUrl+this.apiKey,requestBody,{
      headers: headers
    }).subscribe((data:CreatedUser)=>{
      this.isLogged.next(true);
      this.refreshToken!.token = data.refreshToken;
      this.refreshToken!.expiresIn = data.expiresIn;
      localStorage.setItem('firebaseIdToken',data.idToken);
      // localStorage.setItem('firegbaseRefreshToken',data.refreshToken);
      localStorage.setItem('firebaseLocalToken',data.localId);
      this.createUserInfoInDatabase(data.localId);
    })
  }

  

  signInUser(email:string,password:string):void{
    // TODO IMPLEMENT CATCH ERROR
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
    this.isLogged.next(true);
    localStorage.setItem('firebaseIdToken',data.idToken);
    this.refreshToken!.token = data.refreshToken;
    this.refreshToken!.expiresIn = data.expiresIn;
    // localStorage.setItem('firegbaseRefreshToken',data.refreshToken);
    localStorage.setItem('firebaseLocalToken',data.localId);
  }) 
  }

  testSign():void{
    this.isLogged.next(true);
  }

  signOutUser():void{
    // localStorage.removeItem('firebaseIdToken');
    // localStorage.removeItem('firebaseRefreshToken');
    this.isLogged.next(false);
  }

  isRefreshTokenExpired():boolean{
    if(!this.refreshToken){
      return true
    }

    const now = Date.now();

    const expirationTime = now + (Number(this.refreshToken.expiresIn)*1000)
    return expirationTime < now
  }

  refreshAuthToken():Observable<RefreshTokenResponse>{
    if(!this.refreshToken){
      return throwError(()=>new Error('no refresh token available'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const requestBody = {
      'grant_type': 'refresh_token',
      'refresh_token': `${this.refreshToken}`
    }

    return this.http.post<RefreshTokenResponse>(environment.refreshTokenUrl+this.apiKey,requestBody,{headers:headers}).pipe(
      map((response:RefreshTokenResponse)=>
        {
      this.refreshToken!.token = response['refresh_token'];
      this.refreshToken!.expiresIn = response['expires_in'];
      return response
    }),
    catchError((error)=>{
      console.error('error',error);
      return throwError(()=> new Error('Token refresh failed'));
    })
  )
  }

}
