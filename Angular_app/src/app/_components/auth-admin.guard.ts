import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthAdminService } from './auth-admin.service';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminGuard implements CanActivate {
  constructor(private authService: AuthAdminService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('hello im in the guard');

    return this.authService.admin.pipe(
      map((admin) => {
        // console.log('Token is valid ? :' + admin.tokenValid);
        console.log(admin);

        const isAuth = !!admin;
        console.log('is Auth ' + isAuth);

        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/adminLogin']);
      })
    );
  }
}
