import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-after-signin',
  templateUrl: './after-signin.component.html',
  styleUrls: ['./after-signin.component.scss'],
})
export class AfterSigninComponent implements OnInit {

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/auth/signin'])
  }

}
