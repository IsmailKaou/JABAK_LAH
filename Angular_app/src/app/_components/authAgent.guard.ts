import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import {  AgentAuthService} from './authAgent.service';

@Injectable({
  providedIn: 'root',
})
export class AuthAgentGuard implements CanActivate {
  constructor(private authService: AgentAuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.agent.pipe(
      map((agent) => {
        const isAuth = !!agent;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/agentLogin']);
      })
    );
  }
}
