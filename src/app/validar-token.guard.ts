import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from './service/user.service';

@Injectable({
  providedIn: 'root',
})
export class ValidarTokenGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this.userService.validateToken().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }

  canLoad(): Observable<boolean> | boolean {
    return this.userService.validateToken().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
