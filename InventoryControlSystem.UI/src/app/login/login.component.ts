import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // redirect to Auth0 login page
    setTimeout(() => {
      this.Login();
    }, 1500);
  }

  Login() {
    this.authService.login();
  }
}
