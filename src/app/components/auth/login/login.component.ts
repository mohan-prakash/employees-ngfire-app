import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  constructor(
    public authService: AuthService,
    private readonly notifier: NotifierService,
    private router: Router,
    private zone: NgZone) {
    }

  ngOnInit() {
  }

  signInWithGoogle() {
    this.authService.socialLoginWithGoogle()
        .subscribe((result) => {
          this.zone.run(() => {
            this.notifier.notify('success', 'Login successful!');
            this.router.navigate(['/home']);
          });
        }, error => {
          console.log(`Login error:  ${error}`);
          this.notifier.notify('error', `Login failed!! ${error}`);
          this.router.navigate(['/login']);
        });
  }

  signInWithEmail() {
    this.authService.signInWithEmail(this.user.email, this.user.password)
      .subscribe((result) => {
        this.notifier.notify('success', 'Login successful!');
        this.router.navigate(['/home']);
      }, error => {
        console.log(`Login error:  ${error}`);
        this.notifier.notify('error', `Login failed!! ${error}`);
        this.router.navigate(['/login']);
      });
  }
}
