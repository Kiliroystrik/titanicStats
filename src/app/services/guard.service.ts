import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, UrlTree, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    let isLoggedIn: boolean = this.auth.isAuthenticated();

    console.log(isLoggedIn);
    console.log(this.auth.isAuthenticated());

    let router = this.router;

    if (isLoggedIn) {
      return true;
    } else {
      router.navigate(['/login'])
      return false;
    }

  }


}
