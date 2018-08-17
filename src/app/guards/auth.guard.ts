import { Injectable, NgZone } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';

import {AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    // private authService: AuthService,
    private auth: AngularFireAuth,
    private router: Router,
    private zone: NgZone
    // private notify: NotifyService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.auth.authState.pipe(
        take(1),
        map(authState => !! authState),
        tap(authenticated => {
          if (!authenticated) {
            this.zone.run(() => {
              this.router.navigate(['/login']);
            });
          }
        })
      );
  }
}
