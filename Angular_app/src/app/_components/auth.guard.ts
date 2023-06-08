import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('hello im in the guard');

    return this.authService.client.pipe(
      map((client) => {
        // console.log('Token is valid ? :' + client.tokenValid);
        console.log(client);

        const isAuth = !!client;
        console.log('is Auth ' + isAuth);

        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/clientLogin']);
      })
    );
  }
}
