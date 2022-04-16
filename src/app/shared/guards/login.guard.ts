import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let activate = sessionStorage.getItem('user_role') == '1' && 
                   sessionStorage.getItem('user_id') != null;
              

    if (!activate) {
      this.router.navigate(['/public/home']);
    }
    return activate;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let activate = sessionStorage.getItem('user_role') == '1' && 
                   sessionStorage.getItem('user_id') != null;
 
    if (!activate) {
      this.router.navigate(['/public/home']);
    }

    return activate;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let activate = sessionStorage.getItem('user_role') == '1'  &&
                   sessionStorage.getItem('user_id') != null;
 
    if (!activate) {
      this.router.navigate(['/public/home']);
    }
    
    return activate;
  }
}
