import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../utils/endpoints';


const DBURL = environment.apiUrl;
const SIGNUPURL = "https://identitytoolkit.googleapis.com/v1/accounts";

const CATALOGAPI = '/api';


export const appInterceptor: HttpInterceptorFn = (req, next) => {
  
  if(req.url.startsWith(CATALOGAPI)){
    req = req.clone({
      url: req.url.replace(CATALOGAPI,DBURL)
    })
  }

  return next(req);
};
