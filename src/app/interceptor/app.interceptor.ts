import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../utils/endpoints';



const DBURL = environment.apiUrl;
const SIGNUPURL = "https://identitytoolkit.googleapis.com/v1/accounts";

const CATALOGAPI = '/api';


export const appInterceptor: HttpInterceptorFn = (req, next) => {
  
  const token = localStorage.getItem('idToken');
  if(token){
    if(req.url.startsWith(CATALOGAPI)){
      const urlWithToken = req.url.replace(CATALOGAPI,DBURL) + `?auth=${token}`;
      req = req.clone({
        url: urlWithToken,
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }
  }else{
    if(req.url.startsWith(CATALOGAPI)){
      req = req.clone({
        url: req.url.replace(CATALOGAPI,DBURL),
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }
  }
  return next(req)
};
