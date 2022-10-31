import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-after-signin',
  templateUrl: './after-signin.component.html',
  styleUrls: ['./after-signin.component.scss']
})
export class AfterSigninComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('access_token')
    this.router.navigate(['/auth/signin'])
  }

}
