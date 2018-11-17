
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProvider } from '../user/user';


/*
  Generated class for the TokenInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TokenInterceptorProvider implements HttpInterceptor {

  constructor(private _injector: Injector) { }
   
 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
 {


   let authService = this._injector.get(UserProvider);
   const token = authService.getToken();
   

   if(!!token)
   {

   
      const cloned = req.clone(
        {
          headers: req.headers.set(
                      "Authorization", "Bearer " + token)
        });
        return next.handle(cloned).do(
          succ => console.log(succ),
          err => console.log(err)
        );
   }
   else
   {
    return next.handle(req);
   }
 }

 

}
