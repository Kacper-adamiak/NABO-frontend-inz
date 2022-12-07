import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {LocalStorageService} from "../../services/local-storage/local-storage.service";

@Component({
  selector: 'app-after-signin',
  templateUrl: './after-signin.component.html',
  styleUrls: ['./after-signin.component.scss'],
})
export class AfterSigninComponent implements OnInit {

  constructor(
    private router: Router,
    public authService: AuthService,
    public localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/auth/signin'])
  }

}
