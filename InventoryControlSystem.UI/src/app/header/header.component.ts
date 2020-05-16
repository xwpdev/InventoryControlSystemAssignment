import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  UserProfile;    // Auth0 User Data

  constructor(private authService: AuthService) {
    this.authService.getProfile((error, profile) => {
      this.UserProfile = profile;
    });
  }

  ngOnInit(): void { }

  Logout() {
    this.authService.logout();
  }
}
