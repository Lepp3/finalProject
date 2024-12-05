import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { environment } from './utils/endpoints';
import { BehaviorSubject, Observable, Subscription, switchMap, tap } from 'rxjs';
import { map, catchError, throwError } from 'rxjs';
import { SignedUser, UserInfo } from './user-profile/models/userModel';



interface RefreshTokenResponse {
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
export class UserService implements OnDestroy {
  //user subject
  private userSubject = new BehaviorSubject<SignedUser | null>(null);
  public user$ = this.userSubject.asObservable();
  user: SignedUser | null = null;
  userSubscription: Subscription | null = null;

  //user info subject
  private userInfoSubject = new BehaviorSubject<UserInfo | null>(null);
  private userInfo$ = this.userInfoSubject.asObservable();
  userInfo: UserInfo | null = null;
  userInfoSubscription: Subscription | null = null;
  //api key
  private apiKey: string = "AIzaSyAhOJFnSrVAI6h4zjYOZGklqmVuRSO-Y50"

  constructor(private http: HttpClient,) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
      this.userInfoSubscription = this.userInfo$.subscribe((userinfo) => {
        this.userInfo = userinfo;
      })
    })
  }

  //get logged state
  get isLogged(): boolean {
    return !!this.user;
  }

  //store tokens from authentication service
  private storeToken(idToken: string, refreshToken: string, expiresIn: string, localId?: string): void {
    const expirationTime = Date.now() + Number(expiresIn) * 1000;
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('tokenExpiration', String(expirationTime));
    if (localId) {
      localStorage.setItem('userId', localId);
    }
  }
  //set the user state
  private setUserState(user: SignedUser): void {
    this.userSubject.next({
      ...user,
      displayName: user.displayName || '',
      registered: user.registered || true
    });
    this.storeToken(user.idToken, user.refreshToken, user.expiresIn, user.localId);
  }


  //store user info from data base
  private storeUserInfo(userName: string, userBio: string, profileImg: string, userEmail: string) {
    localStorage.setItem('username', userName);
    localStorage.setItem('bio', userBio);
    localStorage.setItem('profileImg', profileImg);
    localStorage.setItem('email', userEmail);
  }

  //set user info state
  private setUserInfoState(userInfo: UserInfo): void {
    this.userInfoSubject.next(userInfo);
    this.storeUserInfo(userInfo.username, userInfo.bio, userInfo.profileImgSrc, userInfo.email);
  }

  // get token from local storage if its not expired
  private getToken(): string | null {
    const expirationTime = Number(localStorage.getItem('tokenExpiration') || 0);
    if (Date.now() > expirationTime) {
      return null
    }
    return localStorage.getItem('idToken');
  }

  //initialize the user and user info states
  public initializeUserState(): void {
    const idToken = this.getToken();
    const localId = this.getUserId();
    const refreshToken = localStorage.getItem('refreshToken');
    const expirationTime = localStorage.getItem('tokenExpiration');
    const username = localStorage.getItem('username');
    const userImage = localStorage.getItem('profileImg');
    const userBio = localStorage.getItem('bio');


    if (idToken && refreshToken && localId && expirationTime) {
      // Optionally refresh token if close to expiration
      this.setUserState({
        kind: '',
        localId: localId,
        email: '',
        idToken: idToken,
        refreshToken: refreshToken,
        expiresIn: expirationTime
      });

    } else {
      // Ensure user is considered logged out if tokens are missing
      this.userSubject.next(null);
    }

    if (username && userImage && userBio) {
      this.setUserInfoState({
        _id: '',
        username: username,
        profileImgSrc: userImage,
        bio: userBio,
        email: ''

      })
    }
  }


  //create account in authentication base
  createUser(email: string, password: string, username: string, bio: string): void {
    const requestBody = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    const headers = {
      'Content-Type': 'application/json'
    };

    this.http.post<SignedUser>(environment.signUpUrl + this.apiKey, requestBody, {
      headers: headers
    }).subscribe((data: SignedUser) => {
      this.setUserState(data);
      this.createUserInfoInDatabase(data.localId, username, bio, email);
    }), catchError((error) => {
      console.error('User creation failed', error);
      return throwError(() => new Error('User creation failed'));
    })
  }
  //create account info in data base
  createUserInfoInDatabase(localId: string, username: string, bio: string, email: string) {
    const userName = username;
    const userBio = bio;
    const profilePicture = "coolsrc";
    const headers = {
      'Content-Type': 'application/json'
    };
    this.http.put(environment.apiUrl + "users/" + localId + ".json", {
      username: userName,
      _id: localId,
      bio: userBio,
      profileImgSrc: profilePicture,
      email: email
    }, {
      headers: headers
    }).subscribe();
  }





  signInUser(email: string, password: string) {
    const requestBody = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    const headers = {
      'Content-Type': 'application/json'
    };

    return this.http.post<SignedUser>(environment.signInUrl + this.apiKey, requestBody, {
      headers: headers
    }).pipe(
      tap((data: SignedUser) => {
        this.setUserState(data)
      }),switchMap(data=>this.getUserInfo(data.localId).pipe(
        tap(userInfo=>{
          this.setUserInfoState(userInfo)
        })
      ))
      , catchError((error) => {
        console.error(error);
        return throwError(() => new Error('sign in failed'));
      })
    )

  }


  //sign out
  signOutUser(): void {
    this.userSubject.next(null);
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('bio');
    localStorage.removeItem('username');
    localStorage.removeItem('profileImg');
    localStorage.removeItem('email');
  }
  //refresh authentication token
  refreshAuthToken(): Observable<void> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const requestBody = {
      'grant_type': 'refresh_token',
      'refresh_token': `${refreshToken}`
    }

    return this.http.post<RefreshTokenResponse>(environment.refreshTokenUrl + this.apiKey, requestBody, { headers: headers }).pipe(
      map((response) => {
        this.storeToken(response.id_token, response.refresh_token, response.expires_in);
      }),
      catchError((error) => {
        console.error('Token refresh failed', error);
        this.signOutUser();
        return throwError(() => new Error('Token refresh failed'));
      })
    )
  }

  //check if token is expiring or expired
  isRefreshTokenExpired(): boolean {
    let expirationTime = Number(localStorage.getItem('tokenExpiration') || 0);
    //handle 1 minute expiration
    return Date.now() > expirationTime + 60;
  }

  //fetch user info from data base
  getUserInfo(localId: string) {
    return this.http.get<UserInfo>(environment.apiUrl + 'users/' + localId + '.json')
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.userInfoSubscription?.unsubscribe();
  }

}
