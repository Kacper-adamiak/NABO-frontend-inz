import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {ThemeService} from "../../services/theme.service";

@Component({
  selector: 'app-after-signin',
  templateUrl: './after-signin.component.html',
  styleUrls: ['./after-signin.component.scss'],
})
export class AfterSigninComponent implements OnInit {

  constructor(
    private router: Router,
    public authService: AuthService,
    public themeService: ThemeService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/auth/signin'])
  }

}
